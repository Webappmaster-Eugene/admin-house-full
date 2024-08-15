const needTableKeys = ['width'];

export function deepEqualAndInTableKeys(x: unknown, y: unknown): boolean {
  // console.log(x, y);
  // Проверяем, что оба значения не равны null и являются объектами
  if (x === null || y === null || typeof x !== 'object' || typeof y !== 'object') {
    return x === y;
  }

  type InnerObjectColumn = Record<string, { width: number | undefined }>;

  // Приводим x и y к типу Record<string, unknown>, чтобы использовать ключи
  const objX = x as Record<string, InnerObjectColumn>;
  const objY = y as Record<string, InnerObjectColumn>;

  const keysX = Object.keys(objX);

  const initialArr: string[] = [];
  const finalArr = keysX.reduce((acc, key) => {
    const width1 = objX[key]?.width;
    const width2 = objY[key]?.width;
    if (
      !needTableKeys.includes(key) &&
      objX[key] &&
      objY[key] &&
      width1 &&
      width2 &&
      width1 !== width2
    ) {
      acc.push(key);
    }
    return acc;
  }, initialArr);
  // console.log(finalArr);
  return finalArr.length !== 0;
}
