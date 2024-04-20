export abstract class Exception {
  abstract type: string;

  constructor(
    public readonly code: number,
    public readonly message: string,
    public readonly inner?: any,
  ) {}

  toString(): string {
    return JSON.stringify(this.inner);
    // Здесь логика сериализации, работа со стек-трейсами, вложенными ошибками и проч...
  }
}
