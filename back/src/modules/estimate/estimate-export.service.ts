import { Inject, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { EntityUrlParamCommand } from 'libs/contracts';
import { KFI } from '../../common/utils/di';
import { buildExcelFileName, sanitizeSheetName } from '../../common/helpers/excel-name.helper';
import { EstimateRepository } from './estimate.repository';
import {
  EstimateItemComponentEntity,
  EstimateItemEntity,
  EstimateItemPieLayerEntity,
  EstimateSectionTreeNode,
} from './entities/estimate.entity';
import {
  BORDER_ARGB,
  COMPONENT_FONT_ARGB,
  CONSUMPTION_FORMAT,
  HEADER_FILL_ARGB,
  ITEM_TYPE_RU,
  MONEY_FORMAT,
  PERCENT_FORMAT,
  PIE_LAYER_FONT_ARGB,
  SECTION_FILL_ARGB,
  TYPE_FILL_ARGB,
} from './consts/excel-styles.const';

@Injectable()
export class EstimateExportService {
  constructor(
    @Inject(KFI.ESTIMATE_REPOSITORY)
    private readonly repository: EstimateRepository,
  ) {}

  async exportToBuffer(estimateId: EntityUrlParamCommand.RequestUuidParam): Promise<{ buffer: Buffer; fileName: string }> {
    const estimate = await this.repository.getById(estimateId);

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Admin House';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet(sanitizeSheetName(estimate.name || 'Смета', 'Смета'));

    sheet.columns = [
      { header: '№', key: 'num', width: 10 },
      { header: 'Тип', key: 'type', width: 14 },
      { header: 'Ресурс / Работа', key: 'name', width: 50 },
      { header: 'Кол-во', key: 'quantity', width: 10 },
      { header: 'Ед.', key: 'unit', width: 10 },
      { header: 'Цена (руб.)', key: 'unitCost', width: 14 },
      { header: 'Стоимость (руб.)', key: 'totalCost', width: 16 },
      { header: 'Наценка (%)', key: 'markup', width: 12 },
      { header: 'Цена для заказчика (руб.)', key: 'unitClientPrice', width: 20 },
      { header: 'Стоимость для заказчика (руб.)', key: 'totalClientPrice', width: 24 },
      { header: 'Комментарий', key: 'comment', width: 30 },
    ];

    sheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HEADER_FILL_ARGB } };
    sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };

    const titleRow = sheet.insertRow(1, [`Смета: ${estimate.name}`]);
    sheet.mergeCells(1, 1, 1, 11);
    titleRow.font = { bold: true, size: 14 };
    titleRow.alignment = { horizontal: 'center' };

    const sections = estimate.sections ?? [];
    const rowCounter = { current: 3 };

    sections.forEach((section, idx) => {
      this.writeSectionAndChildren(sheet, section, `${idx + 1}`, 0, rowCounter);
    });

    const totalRowNumber = rowCounter.current;
    const totalRow = sheet.addRow({
      num: '',
      type: '',
      name: 'ИТОГО по смете',
      quantity: '',
      unit: '',
      unitCost: '',
      totalCost: estimate.totalCost,
      markup: '',
      unitClientPrice: '',
      totalClientPrice: estimate.totalClientPrice,
      comment: '',
    });
    totalRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HEADER_FILL_ARGB } };
    totalRow.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
    totalRow.getCell('totalCost').numFmt = MONEY_FORMAT;
    totalRow.getCell('totalClientPrice').numFmt = MONEY_FORMAT;
    rowCounter.current++;

    for (let i = 3; i < totalRowNumber; i++) {
      const row = sheet.getRow(i);
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin', color: { argb: BORDER_ARGB } },
          bottom: { style: 'thin', color: { argb: BORDER_ARGB } },
          left: { style: 'thin', color: { argb: BORDER_ARGB } },
          right: { style: 'thin', color: { argb: BORDER_ARGB } },
        };
      });
    }

    const buffer = (await workbook.xlsx.writeBuffer()) as Buffer;
    const fileName = buildExcelFileName('estimate', estimate.name || 'estimate');
    return { buffer, fileName };
  }

  private writeSectionAndChildren(
    sheet: ExcelJS.Worksheet,
    section: EstimateSectionTreeNode,
    numPrefix: string,
    depth: number,
    rowCounter: { current: number },
  ): void {
    const sectionRow = sheet.addRow({
      num: numPrefix,
      type: '',
      name: section.name,
      quantity: '',
      unit: '',
      unitCost: '',
      totalCost: section.sectionTotalCost,
      markup: '',
      unitClientPrice: '',
      totalClientPrice: section.sectionTotalClientPrice,
      comment: '',
    });
    sectionRow.font = { bold: true, size: depth === 0 ? 12 : 11 };
    sectionRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: SECTION_FILL_ARGB[depth] ?? SECTION_FILL_ARGB[1] },
    };
    sectionRow.getCell('totalCost').numFmt = MONEY_FORMAT;
    sectionRow.getCell('totalClientPrice').numFmt = MONEY_FORMAT;
    sectionRow.outlineLevel = depth;
    rowCounter.current++;

    (section.items ?? []).forEach((item, itemIdx) => {
      this.writeItemRow(sheet, item, `${numPrefix}.${itemIdx + 1}`, depth + 1, rowCounter);
    });

    (section.childSections ?? []).forEach((child, childIdx) => {
      this.writeSectionAndChildren(sheet, child, `${numPrefix}.${childIdx + 1}`, depth + 1, rowCounter);
    });
  }

  private writeItemRow(
    sheet: ExcelJS.Worksheet,
    item: EstimateItemEntity,
    num: string,
    depth: number,
    rowCounter: { current: number },
  ): void {
    const row = sheet.addRow({
      num,
      type: ITEM_TYPE_RU[item.itemType],
      name: item.name,
      quantity: item.quantity,
      unit: item.unitMeasurement,
      unitCost: item.unitCost,
      totalCost: item.totalCost,
      markup: item.markupPercent,
      unitClientPrice: item.unitClientPrice,
      totalClientPrice: item.totalClientPrice,
      comment: item.comment ?? '',
    });
    row.outlineLevel = depth;
    row.getCell('quantity').numFmt = MONEY_FORMAT;
    row.getCell('unitCost').numFmt = MONEY_FORMAT;
    row.getCell('totalCost').numFmt = MONEY_FORMAT;
    row.getCell('markup').numFmt = PERCENT_FORMAT;
    row.getCell('unitClientPrice').numFmt = MONEY_FORMAT;
    row.getCell('totalClientPrice').numFmt = MONEY_FORMAT;
    row.getCell('type').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: TYPE_FILL_ARGB[item.itemType] },
    };
    if (item.itemType === 'UNIT' || item.itemType === 'PIE') {
      row.font = { italic: true, bold: true };
    }
    rowCounter.current++;

    // Компоненты единички — подстроки с outlineLevel + 1 (свёрнуты по умолчанию).
    (item.components ?? []).forEach((component, componentIdx) => {
      this.writeComponentRow(sheet, component, `${num}.${componentIdx + 1}`, depth + 1, rowCounter);
    });

    // Слои пирога — аналогично, со spec-колонками (толщина в названии).
    (item.pieLayers ?? []).forEach((layer, layerIdx) => {
      this.writePieLayerRow(sheet, layer, `${num}.${layerIdx + 1}`, depth + 1, rowCounter);
    });
  }

  private writePieLayerRow(
    sheet: ExcelJS.Worksheet,
    layer: EstimateItemPieLayerEntity,
    num: string,
    depth: number,
    rowCounter: { current: number },
  ): void {
    const thicknessLabel = layer.thickness > 0 ? ` [${layer.thickness} мм]` : '';
    const row = sheet.addRow({
      num,
      type: 'Слой',
      name: `   ↳ ${layer.name}${thicknessLabel}`,
      quantity: layer.consumptionPerM2,
      unit: layer.unitMeasurement,
      unitCost: layer.unitCost,
      totalCost: layer.totalCost,
      markup: '',
      unitClientPrice: '',
      totalClientPrice: '',
      comment: layer.comment ?? '',
    });
    row.outlineLevel = depth;
    row.getCell('quantity').numFmt = CONSUMPTION_FORMAT;
    row.getCell('unitCost').numFmt = MONEY_FORMAT;
    row.getCell('totalCost').numFmt = MONEY_FORMAT;
    row.getCell('type').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: TYPE_FILL_ARGB.PIE },
    };
    row.font = { color: { argb: PIE_LAYER_FONT_ARGB }, italic: true };
    row.hidden = true;
    rowCounter.current++;
  }

  private writeComponentRow(
    sheet: ExcelJS.Worksheet,
    component: EstimateItemComponentEntity,
    num: string,
    depth: number,
    rowCounter: { current: number },
  ): void {
    const row = sheet.addRow({
      num,
      type: ITEM_TYPE_RU[component.itemType],
      name: `   ↳ ${component.name}`,
      quantity: component.quantityPerUnit,
      unit: component.unitMeasurement,
      unitCost: component.unitCost,
      totalCost: component.totalCost,
      markup: '',
      unitClientPrice: '',
      totalClientPrice: '',
      comment: component.comment ?? '',
    });
    row.outlineLevel = depth;
    row.getCell('quantity').numFmt = CONSUMPTION_FORMAT;
    row.getCell('unitCost').numFmt = MONEY_FORMAT;
    row.getCell('totalCost').numFmt = MONEY_FORMAT;
    row.getCell('type').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: TYPE_FILL_ARGB[component.itemType] },
    };
    row.font = { color: { argb: COMPONENT_FONT_ARGB }, italic: true };
    row.hidden = true;
    rowCounter.current++;
  }

}
