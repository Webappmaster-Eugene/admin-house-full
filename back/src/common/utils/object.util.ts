export class ObjectUtil {
  static setFieldsMutable<T>(object: Record<string, any>, keys: string[], value: T): void {
    const stack = [object];
    while (stack.length > 0) {
      const currentObject = stack.pop();
      if (typeof currentObject === 'object' && currentObject !== null) {
        for (const key in currentObject) {
          if (currentObject.hasOwnProperty(key)) {
            const property = currentObject[key];
            if (typeof property === 'object' && property !== null) {
              if (Array.isArray(property)) {
                for (const item of property) {
                  if (typeof item === 'object' && item !== null) {
                    stack.push(item);
                  }
                }
              } else {
                stack.push(property);
              }
            } else if (keys.includes(key)) {
              currentObject[key] = value;
            }
          }
        }
      }
    }
  }

  static deleteKeys<T extends object>(source: T, keys: string[]) {
    const object = structuredClone(source);
    keys.forEach(key => delete object[key]);
    return object;
  }
}
