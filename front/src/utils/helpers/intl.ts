export function toRubles(value: number) {
  const formattedRubValue = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency: 'RUB',
    currencyDisplay: 'symbol',
    // useGrouping: false,
    minimumFractionDigits: 0,
  });
  return formattedRubValue.format(value);
}

export function toSantimeters(value: number) {
  const formattedSmValue = new Intl.NumberFormat('ru', {
    style: 'decimal',
    // useGrouping: false,
  });
  return formattedSmValue.format(value);
}
