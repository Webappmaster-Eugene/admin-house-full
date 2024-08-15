export function deepEqual(x: unknown, y: unknown): boolean {
  // Проверяем, что оба значения не равны null и являются объектами
  if (x === null || y === null || typeof x !== 'object' || typeof y !== 'object') {
    return x === y;
  }

  // Приводим x и y к типу Record<string, unknown>, чтобы использовать ключи
  const objX = x as Record<string, unknown>;
  const objY = y as Record<string, unknown>;

  // Сравниваем количество ключей
  const keysX = Object.keys(objX);
  const keysY = Object.keys(objY);

  if (keysX.length !== keysY.length) {
    return false;
  }

  // Сравниваем значения по ключам
  return keysX.every((key) => deepEqual(objX[key], objY[key]));
}
