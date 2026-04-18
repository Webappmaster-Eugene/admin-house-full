/**
 * Helpers для именования Excel-артефактов.
 *
 * Единое место транслитерации нужно, чтобы имена файлов/листов для смет, единичек и пирогов
 * генерировались согласованно (и дубли slug-правил не расходились во времени).
 */

const RU_TO_EN: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'sch',
  ъ: '',
  ы: 'y',
  ь: '',
  э: 'e',
  ю: 'yu',
  я: 'ya',
};

/**
 * Транслитерация + очистка строки до ASCII-slug, пригодного для Content-Disposition filename.
 *
 * HTTP-header filename в plain-виде не допускает не-ASCII, поэтому имя файла генерируем
 * только из латинских символов, цифр и дефиса.
 */
export function toAsciiSlug(raw: string, fallback = 'file', maxLength = 60): string {
  const transliterated = raw
    .toLowerCase()
    .split('')
    .map(ch => (RU_TO_EN[ch] !== undefined ? RU_TO_EN[ch] : ch))
    .join('');
  const slug = transliterated
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, maxLength);
  return slug || fallback;
}

/**
 * Очистка имени листа Excel (ExcelJS ограничивает до 31 символа и запрещает служебные символы).
 */
export function sanitizeSheetName(raw: string, fallback = 'Лист'): string {
  return raw.replace(/[\\\/\?\*\[\]:]/g, '').slice(0, 31) || fallback;
}

/**
 * Собирает имя файла вида `<prefix>-<slug>-YYYY-MM-DD-HH-mm-ss.xlsx`.
 * Timestamp — UTC, без ms (точности до секунд достаточно, коллизий не создаёт).
 */
export function buildExcelFileName(prefix: string, rawName: string): string {
  const slug = toAsciiSlug(rawName, prefix);
  const ts = new Date().toISOString().slice(0, 19).replace(/[:T]/g, '-');
  return `${prefix}-${slug}-${ts}.xlsx`;
}
