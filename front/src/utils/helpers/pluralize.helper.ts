/**
 * Число со словом в нужной форме: pluralize(3, ['смета', 'сметы', 'смет']) → «3 сметы».
 * forms — для 1, для 2–4 и для 5+ (включая 11–14).
 */
export function pluralize(count: number, forms: [string, string, string]): string {
  const abs = Math.abs(count) % 100;
  const last = abs % 10;
  let form = forms[2];
  if (abs < 11 || abs > 14) {
    if (last === 1) form = forms[0];
    else if (last >= 2 && last <= 4) form = forms[1];
  }
  return `${count} ${form}`;
}
