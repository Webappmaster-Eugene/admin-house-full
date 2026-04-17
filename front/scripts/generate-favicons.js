/**
 * Скрипт генерации фавиконок и PNG-иконок из SVG-логотипа.
 *
 * Использование:
 *   cd first/front
 *   npm install --save-dev @resvg/resvg-js png-to-ico
 *   node scripts/generate-favicons.js
 */

const { Resvg } = require('@resvg/resvg-js');
const { default: pngToIco } = require('png-to-ico');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SVG_PATH = path.join(ROOT, 'public/logo/logo_single.svg');
const FONT_PATH = path.join(ROOT, 'src/app/_fonts/Roboto-Bold.ttf');

const OUTPUTS = [
  { file: 'public/favicon/favicon-16x16.png', size: 16 },
  { file: 'public/favicon/favicon-32x32.png', size: 32 },
  { file: 'public/favicon/favicon.png', size: 48 },
  { file: 'public/favicon/apple-touch-icon.png', size: 180 },
  { file: 'public/favicon/android-chrome-512x512.png', size: 512 },
  { file: 'public/logo/logo_single.png', size: 240 },
];

async function main() {
  const svg = fs.readFileSync(SVG_PATH, 'utf-8');

  console.log('Генерация PNG из SVG...\n');

  for (const output of OUTPUTS) {
    const resvg = new Resvg(svg, {
      fitTo: { mode: 'width', value: output.size },
      font: {
        fontFiles: [FONT_PATH],
        loadSystemFonts: true,
      },
    });

    const rendered = resvg.render();
    const png = rendered.asPng();
    const outPath = path.join(ROOT, output.file);

    fs.writeFileSync(outPath, png);
    console.log(`  ✓ ${output.file} (${output.size}×${output.size})`);
  }

  console.log('\nГенерация ICO...\n');

  const icoBuffer = await pngToIco([
    path.join(ROOT, 'public/favicon/favicon-16x16.png'),
    path.join(ROOT, 'public/favicon/favicon-32x32.png'),
    path.join(ROOT, 'public/favicon/favicon.png'),
  ]);

  const icoTargets = [
    path.join(ROOT, 'public/favicon/favicon.ico'),
    path.join(ROOT, 'public/favicon.ico'),
  ];

  for (const target of icoTargets) {
    fs.writeFileSync(target, icoBuffer);
    console.log(`  ✓ ${path.relative(ROOT, target)}`);
  }

  console.log('\nГотово!');
}

main().catch((err) => {
  console.error('Ошибка:', err);
  process.exit(1);
});
