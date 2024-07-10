import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';
import { ServiceError } from './service.error';

export class IsEmptyError extends ServiceError {
  constructor(message: string, extMessage: string) {
    super(ErrorCode.IsEmpty, HttpStatus.NOT_FOUND, message, extMessage);
  }

  private static fromClass<T extends new (...args: any[]) => any>(clazz: T, message = 'is empty', extMessage = 'не содержит') {
    return new IsEmptyError(`Selection of ${clazz.name} ${extMessage}.`, `Выборка ${message} ${clazz.name}-ов.`);
  }

  public static withRange<T extends new (...args: any[]) => any>(clazz: T, field: string, from: string, to: string) {
    return new IsEmptyError(
      `No one ${clazz.name} in range from ${from} to ${to} of ${field} field is found.`,
      `Ни одного ${clazz.name} в диапазоне от ${from} до ${to} поля ${field} не найдено.`,
    );
  }
}
