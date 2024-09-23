import { FieldOfCategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

import { useLocales as getLocales } from 'src/locales';

type InputValue = string | number | null | undefined;

function getLocaleCode() {
  const {
    currentLang: {
      numberFormat: { code, currency },
    },
  } = getLocales();

  return {
    code: code ?? 'en-US',
    currency: currency ?? 'USD',
  };
}

// ----------------------------------------------------------------------

export function fNumber(inputValue: InputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return '';

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat(code, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fCurrency(inputValue: InputValue) {
  const { code, currency } = getLocaleCode();

  if (!inputValue) return '';

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat(code, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fPercent(inputValue: InputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return '';

  const number = Number(inputValue) / 100;

  const fm = new Intl.NumberFormat(code, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(number);

  return fm;
}

// ----------------------------------------------------------------------

export function fShortenNumber(inputValue: InputValue) {
  const { code } = getLocaleCode();

  if (!inputValue) return '';

  const number = Number(inputValue);

  const fm = new Intl.NumberFormat(code, {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(number);

  return fm.replace(/[A-Z]/g, (match) => match.toLowerCase());
}

// ----------------------------------------------------------------------

export function fData(inputValue: InputValue) {
  if (!inputValue) return '';

  if (inputValue === 0) return '0 Bytes';

  const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb'];

  const decimal = 2;

  const baseValue = 1024;

  const number = Number(inputValue);

  const index = Math.floor(Math.log(number) / Math.log(baseValue));

  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`;

  return fm;
}

export function fCountMaterial(inputValue: InputValue) {
  if (!inputValue) return 'нет материалов';

  if (inputValue === 0) return 'нет материалов';

  const stringValue = inputValue.toString();
  if (stringValue[stringValue.length - 1] === '1') return `${inputValue} материал`;
  if (
    stringValue[stringValue.length - 1] === '2' ||
    stringValue[stringValue.length - 1] === '3' ||
    stringValue[stringValue.length - 1] === '4'
  )
    return `${inputValue} материала`;

  const fm = `${inputValue} материалов`;

  return fm;
}

export function fCountFieldsMaterial(inputValue: InputValue) {
  if (!inputValue) return 'нет полей';

  const stringValue = inputValue.toString();
  if (stringValue[stringValue.length - 1] === '1') return `${inputValue} поле`;
  if (
    stringValue[stringValue.length - 1] === '2' ||
    stringValue[stringValue.length - 1] === '3' ||
    stringValue[stringValue.length - 1] === '4'
  )
    return `${inputValue} поля`;

  const fm = `${inputValue} полей`;

  return fm;
}

export function fTemplateNameFieldsConstructor(
  fields?: FieldOfCategoryMaterialGetAllCommand.ResponseEntity | null
) {
  if (!fields) return 'не передано';
  if (fields?.length === 0) return 'не сформировано';

  const str = fields.reduce((acc, curValue) => {
    const { name } = curValue;
    if (!acc) {
      return `${name}`;
    }
    return `${acc}, ${name}`;
  }, '');
  const fm = `${str}`;

  return fm;
}

export function fRequiredFieldsConstructor(
  fields?: FieldOfCategoryMaterialGetAllCommand.ResponseEntity | null
) {
  if (!fields) return 'к категории не привязаны поля';
  if (fields?.length === 0) return 'к категории не привязаны поля';

  const str = fields.reduce((acc, curValue) => {
    const { name } = curValue;
    if (curValue.isRequired) {
      if (!acc) {
        return `${name}`;
      }
      return `${acc}, ${name}`;
    }

    return acc;
  }, '');
  const fm = str ? `${str}` : `отсутствуют`;

  return fm;
}

export function fNotRequiredFieldsConstructor(
  fields?: FieldOfCategoryMaterialGetAllCommand.ResponseEntity | null
) {
  if (!fields) return 'к категории не привязаны поля';
  if (fields?.length === 0) return 'к категории не привязаны поля';

  const str = fields.reduce((acc, curValue) => {
    const { name } = curValue;
    if (!curValue.isRequired) {
      if (!acc) {
        return `${name}`;
      }
      return `${acc}, ${name}`;
    }

    return acc;
  }, '');
  const fm = str ? `${str}` : `отсутствуют`;

  return fm;
}
