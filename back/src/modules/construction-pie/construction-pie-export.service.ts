import { Inject, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { EntityUrlParamCommand } from 'libs/contracts';
import { KFI } from '../../common/utils/di';
import { buildExcelFileName, sanitizeSheetName } from '../../common/helpers/excel-name.helper';
import {
  BORDER_ARGB,
  CONSUMPTION_FORMAT,
  HEADER_FILL_ARGB,
  MONEY_FORMAT,
  PERCENT_FORMAT,
  TYPE_FILL_ARGB,
} from '../estimate/consts/excel-styles.const';
import { ConstructionPieRepository } from './construction-pie.repository';

@Injectable()
export class ConstructionPieExportService {
  constructor(
    @Inject(KFI.CONSTRUCTION_PIE_REPOSITORY)
    private readonly repository: ConstructionPieRepository,
  ) {}

  /**
   * Полный список пирогов справочника одним листом: заголовок пирога + строки слоёв ниже.
   */
  async exportAllToBuffer(handbookUuid: EntityUrlParamCommand.RequestUuidParam): Promise<{ buffer: Buffer; fileName: string }> {
    const pies = await this.repository.getAllInHandbook(handbookUuid);

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Admin House';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet(sanitizeSheetName('Пироги', 'Пироги'));

    sheet.columns = [
      { header: '№', key: 'num', width: 6 },
      { header: 'Тип', key: 'type', width: 12 },
      { header: 'Название', key: 'name', width: 44 },
      { header: 'Ед.', key: 'unit', width: 10 },
      { header: 'Толщина, мм', key: 'thickness', width: 14 },
      { header: 'Расход/м²', key: 'consumption', width: 14 },
      { header: 'Цена, ₽', key: 'unitCost', width: 14 },
      { header: 'Себестоимость за 1 ед., ₽', key: 'unitTotal', width: 22 },
      { header: 'Наценка, %', key: 'markup', width: 12 },
      { header: 'Клиенту за 1 ед., ₽', key: 'clientTotal', width: 20 },
      { header: 'Комментарий', key: 'comment', width: 30 },
    ];

    const titleRow = sheet.insertRow(1, ['Пироги справочника — сводный экспорт']);
    sheet.mergeCells(1, 1, 1, sheet.columns.length);
    titleRow.font = { bold: true, size: 14 };
    titleRow.alignment = { horizontal: 'center' };

    const headerRow = sheet.getRow(2);
    headerRow.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HEADER_FILL_ARGB } };
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };

    let rowCursor = 3;

    pies.forEach((pie, idx) => {
      const blockStart = rowCursor;
      const pieRow = sheet.addRow({
        num: `${idx + 1}`,
        type: 'Пирог',
        name: pie.name,
        unit: pie.unitMeasurement,
        thickness: pie.totalThickness,
        consumption: '',
        unitCost: '',
        unitTotal: pie.unitCost,
        markup: pie.defaultMarkupPercent,
        clientTotal: pie.unitClientPrice,
        comment: pie.description ?? '',
      });
      pieRow.font = { bold: true };
      pieRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: TYPE_FILL_ARGB.PIE } };
      pieRow.getCell('thickness').numFmt = CONSUMPTION_FORMAT;
      pieRow.getCell('unitTotal').numFmt = MONEY_FORMAT;
      pieRow.getCell('markup').numFmt = PERCENT_FORMAT;
      pieRow.getCell('clientTotal').numFmt = MONEY_FORMAT;
      rowCursor++;

      const layers = pie.layers ?? [];
      layers.forEach((layer, layerIdx) => {
        const layerRow = sheet.addRow({
          num: `${idx + 1}.${layerIdx + 1}`,
          type: 'Слой',
          name: `   ↳ ${layer.name}`,
          unit: layer.unitMeasurement,
          thickness: layer.thickness,
          consumption: layer.consumptionPerM2,
          unitCost: layer.unitCost,
          unitTotal: layer.consumptionPerM2 * layer.unitCost,
          markup: '',
          clientTotal: '',
          comment: layer.comment ?? '',
        });
        layerRow.outlineLevel = 1;
        layerRow.getCell('thickness').numFmt = CONSUMPTION_FORMAT;
        layerRow.getCell('consumption').numFmt = CONSUMPTION_FORMAT;
        layerRow.getCell('unitCost').numFmt = MONEY_FORMAT;
        layerRow.getCell('unitTotal').numFmt = MONEY_FORMAT;
        layerRow.font = { italic: true };
        rowCursor++;
      });

      if (idx < pies.length - 1) {
        sheet.addRow({});
        rowCursor++;
      }

      for (let r = blockStart; r < rowCursor; r++) {
        sheet.getRow(r).eachCell(cell => {
          cell.border = {
            top: { style: 'thin', color: { argb: BORDER_ARGB } },
            bottom: { style: 'thin', color: { argb: BORDER_ARGB } },
            left: { style: 'thin', color: { argb: BORDER_ARGB } },
            right: { style: 'thin', color: { argb: BORDER_ARGB } },
          };
        });
      }
    });

    if (pies.length === 0) {
      sheet.addRow(['В справочнике пока нет ни одного пирога.']);
    }

    const buffer = (await workbook.xlsx.writeBuffer()) as Buffer;
    const fileName = buildExcelFileName('construction-pies', 'handbook');
    return { buffer, fileName };
  }
}
