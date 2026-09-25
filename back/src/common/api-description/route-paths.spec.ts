import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

// Регрессия: маршрут 'organization/:organizationId//get-all-in-organization' был недостижим —
// фронт вызывает путь с одинарным слэшем и получал 404. Проверяем все контроллеры статически.
const MODULES_DIR = join(__dirname, '..', '..', 'modules');
const ROUTE_DECORATOR = /@(Get|Post|Put|Patch|Delete|Controller)\(\s*'([^']*)'/g;

function collectControllers(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return collectControllers(path);
    return entry.name.endsWith('.controller.ts') ? [path] : [];
  });
}

describe('Пути маршрутов контроллеров', () => {
  const controllers = collectControllers(MODULES_DIR);

  it('should find controllers to check', () => {
    expect(controllers.length).toBeGreaterThan(10);
  });

  it('should not contain empty segments (double slash) in route paths', () => {
    // Arrange
    const invalid: string[] = [];

    // Act
    for (const file of controllers) {
      for (const match of readFileSync(file, 'utf8').matchAll(ROUTE_DECORATOR)) {
        if (match[2].includes('//')) invalid.push(`${file.replace(MODULES_DIR, 'modules')}: @${match[1]}('${match[2]}')`);
      }
    }

    // Assert
    expect(invalid).toEqual([]);
  });
});
