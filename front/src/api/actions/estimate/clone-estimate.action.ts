/* eslint-disable no-restricted-syntax, no-await-in-loop --
   Клонирование требует строгого последовательного выполнения POST-запросов:
   - порядок создания секций определяет orderIndex;
   - после каждой секции нужен её uuid для создания строк/подсекций;
   - backend recalculateTotals синхронен, параллельные мутации могут потерять данные.
   Поэтому Promise.all и map+await здесь не подходят. */

'use server';

import axiosInstance from 'src/api/axios-instance';
import { axiosEndpoints } from 'src/entities/auth/lib';
import { ErrorFromBackend } from 'src/utils/types/error-from-backend.type';
import {
  EstimateCreateCommand,
  EstimateGetCommand,
  EstimateItemCreateCommand,
  EstimateSectionCreateCommand,
  EstimateSectionTree,
} from 'src/shared/contracts/estimate';

/**
 * Дублирует смету (Estimate + все секции + все строки) в том же проекте.
 * Backend пересоздаст snapshot единичек/пирогов из текущих справочников.
 *
 * Возвращает uuid новой сметы или ErrorFromBackend.
 */
export async function cloneEstimate(
  workspaceId: string,
  projectId: string,
  estimateId: string
): Promise<{ uuid: string } | ErrorFromBackend> {
  try {
    // 1. Получить полную исходную смету.
    // ВНИМАНИЕ: axiosInstance имеет response-interceptor `(res) => res.data`, поэтому
    // `await axiosInstance.get(url)` уже возвращает BackendResponse вида
    // { statusCode, message, data, errors } — обращаться нужно к `.data`, а не к `.data.data`.
    const url = axiosEndpoints.estimate.get
      .replace(':workspaceId', workspaceId)
      .replace(':projectId', projectId)
      .replace(':estimateId', estimateId);
    const getRes = (await axiosInstance.get(url)) as unknown as {
      statusCode?: number;
      data?: EstimateGetCommand.ResponseEntity;
    };
    const original = getRes?.data;
    if (!original) return { error: 'Не удалось получить исходную смету' };

    // 2. Создать новую смету-обёртку.
    const createUrl = axiosEndpoints.estimate.create
      .replace(':workspaceId', workspaceId)
      .replace(':projectId', projectId);
    const createReq: EstimateCreateCommand.Request = {
      name: `${original.name} (копия)`,
      description: original.description ?? undefined,
      defaultMarkupPercent: original.defaultMarkupPercent,
    };
    const createRes = (await axiosInstance.post(createUrl, createReq)) as unknown as {
      data?: { uuid?: string };
    };
    const newEstimateId = createRes?.data?.uuid;
    if (!newEstimateId) return { error: 'Не удалось создать копию сметы' };

    // 3. Скопировать секции + строки рекурсивно (только 2 уровня глубины).
    for (const section of original.sections) {
      const newSectionId = await cloneSection(
        workspaceId,
        projectId,
        newEstimateId,
        section,
        null
      );
      for (const child of section.childSections) {
        await cloneSection(workspaceId, projectId, newEstimateId, child, newSectionId);
      }
    }

    return { uuid: newEstimateId };
  } catch (error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }
}

async function cloneSection(
  workspaceId: string,
  projectId: string,
  newEstimateId: string,
  section: EstimateSectionTree,
  parentSectionUuid: string | null
): Promise<string> {
  const sectionUrl = axiosEndpoints.estimate.section_create
    .replace(':workspaceId', workspaceId)
    .replace(':projectId', projectId)
    .replace(':estimateId', newEstimateId);
  const sectionReq: EstimateSectionCreateCommand.Request = {
    name: section.name,
    orderIndex: section.orderIndex,
    parentSectionUuid,
  };
  const sectionRes = (await axiosInstance.post(sectionUrl, sectionReq)) as unknown as {
    data?: { uuid?: string };
  };
  const newSectionId = sectionRes?.data?.uuid;
  if (!newSectionId) throw new Error(`Не удалось создать раздел "${section.name}" в копии сметы`);

  for (const item of section.items) {
    const itemUrl = axiosEndpoints.estimate.item_create
      .replace(':workspaceId', workspaceId)
      .replace(':projectId', projectId)
      .replace(':estimateId', newEstimateId)
      .replace(':sectionId', newSectionId);
    const itemReq: EstimateItemCreateCommand.Request = {
      orderIndex: item.orderIndex,
      itemType: item.itemType,
      materialUuid: item.materialUuid,
      unitTemplateUuid: item.unitTemplateUuid,
      constructionPieUuid: item.constructionPieUuid,
      name: item.name,
      unitMeasurement: item.unitMeasurement,
      quantity: item.quantity,
      unitCost: item.unitCost,
      markupPercent: item.markupPercent,
      comment: item.comment,
    };
    await axiosInstance.post(itemUrl, itemReq);
  }
  return newSectionId;
}
