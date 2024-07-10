import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';
import { ServiceError } from './service.error';

export class NotFoundError extends ServiceError {
  constructor(message: string, extMessage: string) {
    super(ErrorCode.NotFound, HttpStatus.NOT_FOUND, message, extMessage);
  }

  private static fromClass<T extends new (...args: any[]) => any>(clazz: T, message = 'is not found.', extMessage = 'не найден.') {
    return new NotFoundError(`${clazz.name} ${message}`, `${clazz.name} ${extMessage}`);
  }

  public static withId<T extends new (...args: any[]) => any>(clazz: T, id: number | string) {
    return NotFoundError.fromClass(clazz, `with id ${id} is not found.`, `c id ${id} не найден.`);
  }

  public static withName<T extends new (...args: any[]) => any>(clazz: T, name: string) {
    return NotFoundError.fromClass(clazz, `with name ${name} is not found.`, `c именем ${name} не найден.`);
  }

  public static withType<T extends new (...args: any[]) => any, V>(clazz: T, type: V) {
    return NotFoundError.fromClass(clazz, `with type ${type} is not found.`, `c типом ${type} не найден.`);
  }

  public static withPhone<T extends new (...args: any[]) => any>(clazz: T, phone: string) {
    return NotFoundError.fromClass(clazz, `with phone ${phone} is not found.`, `c телефоном ${phone} не найден.`);
  }

  public static withRange<T extends new (...args: any[]) => any>(clazz: T, field: string, from: string, to: string) {
    return new NotFoundError(
      `No one ${clazz.name} in range of ${field} from ${from} to ${to} is found.`,
      `Ни одного ${clazz.name} в диапазоне ${field} с ${from} по ${to} не найдено.`,
    );
  }
}
