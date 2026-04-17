import { Inject, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { EEstimateItemType } from '.prisma/client';
import { EntityUrlParamCommand } from 'libs/contracts';
import { KFI } from '../../common/utils/di';
import { EstimateRepository } from './estimate.repository';
import { EstimateEntity, EstimateItemEntity, EstimateSectionTreeNode } from './entities/estimate.entity';

const ITEM_TYPE_RU: Record<EEstimateItemType, string> = {
  MATERIAL: 'Материалы',
  MECHANISM: 'Механизмы',
  WORK: 'Работы',
  OVERHEAD: 'Накладные',
};

const TYPE_FILL_ARGB: Record<EEstimateItemType, string> = {
  MATERIAL: 'FFE8F5E9',
  MECHANISM: 'FFE3F2FD',
  WORK: 'FFFFF3E0',
  OVERHEAD: 'FFF3E5F5',
};

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

    const sheet = workbook.addWorksheet(this.sanitizeSheetName(estimate.name || 'Смета'));

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

    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF263238' } };
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
    totalRow.font = { bold: true, size: 12 };
    totalRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF263238' } };
    totalRow.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } };
    totalRow.getCell('totalCost').numFmt = '#,##0.00';
    totalRow.getCell('totalClientPrice').numFmt = '#,##0.00';
    rowCounter.current++;

    for (let i = 3; i < totalRowNumber; i++) {
      const row = sheet.getRow(i);
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFCFD8DC' } },
          bottom: { style: 'thin', color: { argb: 'FFCFD8DC' } },
          left: { style: 'thin', color: { argb: 'FFCFD8DC' } },
          right: { style: 'thin', color: { argb: 'FFCFD8DC' } },
        };
      });
    }

    const buffer = (await workbook.xlsx.writeBuffer()) as Buffer;
    const safeName = this.slug(estimate.name || 'estimate');
    const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
    const fileName = `estimate-${safeName}-${ts}.xlsx`;
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
      fgColor: { argb: depth === 0 ? 'FFB2DFDB' : 'FFE0F2F1' },
    };
    sectionRow.getCell('totalCost').numFmt = '#,##0.00';
    sectionRow.getCell('totalClientPrice').numFmt = '#,##0.00';
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
    row.getCell('quantity').numFmt = '#,##0.00';
    row.getCell('unitCost').numFmt = '#,##0.00';
    row.getCell('totalCost').numFmt = '#,##0.00';
    row.getCell('markup').numFmt = '0.##"%"';
    row.getCell('unitClientPrice').numFmt = '#,##0.00';
    row.getCell('totalClientPrice').numFmt = '#,##0.00';
    row.getCell('type').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: TYPE_FILL_ARGB[item.itemType] },
    };
    rowCounter.current++;
  }

  private sanitizeSheetName(name: string): string {
    return name.replace(/[\\\/\?\*\[\]:]/g, '').slice(0, 31) || 'Смета';
  }

  private slug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9а-яё\-]+/giu, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 60);
  }
}
