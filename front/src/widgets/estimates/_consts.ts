import { EEstimateItemType } from 'src/shared/contracts/estimate';

export const ITEM_TYPE_OPTIONS: { value: EEstimateItemType; label: string }[] = [
  { value: 'MATERIAL', label: 'Материалы' },
  { value: 'MECHANISM', label: 'Механизмы' },
  { value: 'WORK', label: 'Работы' },
  { value: 'OVERHEAD', label: 'Накладные' },
  { value: 'UNIT', label: 'Единичка' },
  { value: 'PIE', label: 'Пирог' },
];

/** Только типы, которые менеджер может выбрать вручную (без UNIT/PIE — те через табы). */
export const MANUAL_ITEM_TYPE_OPTIONS = ITEM_TYPE_OPTIONS.filter(
  (opt) => opt.value !== 'UNIT' && opt.value !== 'PIE'
);

export const formatMoney = (value: number) =>
  new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(value);
