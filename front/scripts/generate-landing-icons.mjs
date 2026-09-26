// Генерирует src/widgets/landing/landing-icons.ts — SVG-данные иконок Solar, используемых на лендинге.
// Иконки встраиваются в HTML при серверном рендере, без запросов к api.iconify.design в браузере.
// Запуск после добавления иконки на лендинг: node scripts/generate-landing-icons.mjs
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

import * as prettier from 'prettier';

const frontRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const landingDir = join(frontRoot, 'src/widgets/landing');
const outFile = join(landingDir, 'landing-icons.ts');
const PREFIX = 'solar';

function collectSources(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) return collectSources(full);
    return /\.tsx?$/.test(entry.name) && full !== outFile ? [readFileSync(full, 'utf8')] : [];
  });
}

const names = [
  ...new Set(
    collectSources(landingDir).flatMap((source) =>
      [...source.matchAll(new RegExp(`['"]${PREFIX}:([a-z0-9-]+)['"]`, 'g'))].map(
        (match) => match[1]
      )
    )
  ),
].sort();

if (names.length === 0) throw new Error('На лендинге не найдено ни одной иконки solar:*');

const response = await fetch(`https://api.iconify.design/${PREFIX}.json?icons=${names.join(',')}`);
if (!response.ok) throw new Error(`Iconify API ответил ${response.status}`);
const data = await response.json();

const missing = names.filter((name) => !data.icons?.[name]);
if (missing.length) throw new Error(`Иконки не найдены в Iconify: ${missing.join(', ')}`);

const lines = names.map((name) => {
  const icon = data.icons[name];
  const width = icon.width ?? data.width ?? 24;
  const height = icon.height ?? data.height ?? 24;
  return `  '${PREFIX}:${name}': { body: ${JSON.stringify(icon.body)}, width: ${width}, height: ${height} },`;
});

const source = `// Сгенерировано scripts/generate-landing-icons.mjs — не редактировать вручную.
// Иконки Solar от 480 Design (через Iconify), лицензия CC BY 4.0: https://creativecommons.org/licenses/by/4.0/

export interface LandingIconData {
  body: string;
  width: number;
  height: number;
}

export const LANDING_ICONS = {
${lines.join('\n')}
} as const satisfies Record<string, LandingIconData>;

export type LandingIconName = keyof typeof LANDING_ICONS;
`;

// Форматируем по конфигу проекта, чтобы файл совпадал с тем, что оставит pre-commit hook с prettier.
const prettierConfig = await prettier.resolveConfig(outFile);
writeFileSync(outFile, await prettier.format(source, { ...prettierConfig, filepath: outFile }));

console.log(`Записано иконок: ${names.length} → ${outFile}`);
