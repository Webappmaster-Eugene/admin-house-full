import { EEstimateItemType } from '.prisma/client';

/**
 * Локализованные названия типов строк сметы для Excel-выгрузки.
 */
export const ITEM_TYPE_RU: Record<EEstimateItemType, string> = {
  MATERIAL: 'Материалы',
  MECHANISM: 'Механизмы',
  WORK: 'Работы',
  OVERHEAD: 'Накладные',
  UNIT: 'Единичка',
  PIE: 'Пирог',
};

/**
 * Цвета фона для типов строк (ARGB hex для exceljs).
 * Подобраны для визуальной группировки в Excel в стиле Material Design.
 */
export const TYPE_FILL_ARGB: Record<EEstimateItemType, string> = {
  MATERIAL: 'FFE8F5E9', // light green
  MECHANISM: 'FFE3F2FD', // light blue
  WORK: 'FFFFF3E0', // light orange
  OVERHEAD: 'FFF3E5F5', // light purple
  UNIT: 'FFFFECB3', // light amber
  PIE: 'FFFFCDD2', // light red
};

/**
 * Цвет шапки таблицы и итоговой строки (тёмно-серый).
 */
export const HEADER_FILL_ARGB = 'FF263238';

/**
 * Цвета для заголовков разделов разной глубины.
 */
export const SECTION_FILL_ARGB: Record<number, string> = {
  0: 'FFB2DFDB', // teal level 0
  1: 'FFE0F2F1', // teal lighter level 1
};

/**
 * Цвет шрифта для слоёв пирога в подстроках.
 */
export const PIE_LAYER_FONT_ARGB = 'FF880E4F';

/**
 * Цвет шрифта для компонентов единички в подстроках.
 */
export const COMPONENT_FONT_ARGB = 'FF455A64';

/**
 * Цвет границ ячеек.
 */
export const BORDER_ARGB = 'FFCFD8DC';

/**
 * Денежный формат для xlsx.
 */
export const MONEY_FORMAT = '#,##0.00';

/**
 * Формат для расхода с 4 знаками (для пирогов).
 */
export const CONSUMPTION_FORMAT = '#,##0.0000';

/**
 * Формат для процентов.
 */
export const PERCENT_FORMAT = '0.##"%"';
