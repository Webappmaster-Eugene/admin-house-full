import { Inject, Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { EntityUrlParamCommand } from 'libs/contracts';
import { KFI } from '../../common/utils/di';
import { buildExcelFileName, sanitizeSheetName } from '../../common/helpers/excel-name.helper';
import {
  BORDER_ARGB,
  CONSUMPTION_FORMAT,
  HEADER_FILL_ARGB,
  ITEM_TYPE_RU,
  MONEY_FORMAT,
  PERCENT_FORMAT,
  TYPE_FILL_ARGB,
} from '../estimate/consts/excel-styles.const';
import { UnitTemplateRepository } from './unit-template.repository';

@Injectable()
export class UnitTemplateExportService {
  constructor(
    @Inject(KFI.UNIT_TEMPLATE_REPOSITORY)
    private readonly repository: UnitTemplateRepository,
  ) {}

  /**
   * Полный список единичек справочника одним листом: шапка с агрегатами + строки компонентов.
   */
  async exportAllToBuffer(
    handbookUuid: EntityUrlParamCommand.RequestUuidParam,
  ): Promise<{ buffer: Buffer; fileName: string }> {
    const templates = await this.repository.getAllInHandbook(handbookUuid);

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Admin House';
    workbook.created = new Date();

    const sheet = workbook.addWorksheet(sanitizeSheetName('Единички', 'Единички'));

    sheet.columns = [
      { header: '№', key: 'num', width: 6 },
      { header: 'Тип', key: 'type', width: 14 },
      { header: 'Название', key: 'name', width: 42 },
      { header: 'Ед.', key: 'unit', width: 10 },
      { header: 'Расход на 1 ед.', key: 'consumption', width: 16 },
      { header: 'Цена, ₽', key: 'unitCost', width: 14 },
      { header: 'Себестоимость за 1 ед., ₽', key: 'unitTotal', width: 22 },
      { header: 'Наценка, %', key: 'markup', width: 12 },
      { header: 'Клиенту за 1 ед., ₽', key: 'clientTotal', width: 20 },
      { header: 'Комментарий', key: 'comment', width: 30 },
    ];

    const titleRow = sheet.insertRow(1, ['Единички справочника — сводный экспорт']);
    sheet.mergeCells(1, 1, 1, sheet.columns.length);
    titleRow.font = { bold: true, size: 14 };
    titleRow.alignment = { horizontal: 'center' };

    const headerRow = sheet.getRow(2);
    headerRow.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
    headerRow.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: HEADER_FILL_ARGB } };
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };

    let rowCursor = 3;

    templates.forEach((template, idx) => {
      const headerRowNumber = rowCursor;
      const unitTemplateRow = sheet.addRow({
        num: `${idx + 1}`,
        type: 'Единичка',
        name: template.name,
        unit: template.unitMeasurement,
        consumption: '',
        unitCost: '',
        unitTotal: template.unitCost,
        markup: template.defaultMarkupPercent,
        clientTotal: template.unitClientPrice,
        comment: template.description ?? '',
      });
      unitTemplateRow.font = { bold: true };
      unitTemplateRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: TYPE_FILL_ARGB.UNIT },
      };
      unitTemplateRow.getCell('unitTotal').numFmt = MONEY_FORMAT;
      unitTemplateRow.getCell('markup').numFmt = PERCENT_FORMAT;
      unitTemplateRow.getCell('clientTotal').numFmt = MONEY_FORMAT;
      rowCursor++;

      const components = template.components ?? [];
      components.forEach((component, compIdx) => {
        const componentRow = sheet.addRow({
          num: `${idx + 1}.${compIdx + 1}`,
          type: ITEM_TYPE_RU[component.itemType],
          name: `   ↳ ${component.name}`,
          unit: component.unitMeasurement,
          consumption: component.quantityPerUnit,
          unitCost: component.unitCost,
          unitTotal: component.quantityPerUnit * component.unitCost,
          markup: '',
          clientTotal: '',
          comment: component.comment ?? '',
        });
        componentRow.outlineLevel = 1;
        componentRow.getCell('consumption').numFmt = CONSUMPTION_FORMAT;
        componentRow.getCell('unitCost').numFmt = MONEY_FORMAT;
        componentRow.getCell('unitTotal').numFmt = MONEY_FORMAT;
        componentRow.getCell('type').fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: TYPE_FILL_ARGB[component.itemType] },
        };
        componentRow.font = { italic: true };
        rowCursor++;
      });

      // Разделитель между единичками — для визуальной группировки.
      if (idx < templates.length - 1) {
        sheet.addRow({});
        rowCursor++;
      }

      // Границы у всего блока текущей единички.
      for (let r = headerRowNumber; r < rowCursor; r++) {
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

    if (templates.length === 0) {
      sheet.addRow(['В справочнике пока нет ни одной единички.']);
    }

    const buffer = (await workbook.xlsx.writeBuffer()) as Buffer;
    const fileName = buildExcelFileName('unit-templates', 'handbook');
    return { buffer, fileName };
  }
}
