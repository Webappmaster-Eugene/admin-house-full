export function deepEqualAndIn(x: unknown, y: unknown): boolean {
  if (x === undefined || y === undefined) {
    return true;
  }
  // Проверяем, что оба значения не равны null и являются объектами
  if (x === null || y === null || typeof x !== 'object' || typeof y !== 'object') {
    return x === y;
  }

  // Приводим x и y к типу Record<string, unknown>, чтобы использовать ключи
  const objX = x as Record<string, unknown>;
  const objY = y as Record<string, unknown>;

  // Сравниваем количество ключей
  const keysX = Object.keys(objX);

  // Сравниваем значения по ключам
  return keysX.every((key) => deepEqualAndIn(objX[key], objY[key]));
}
