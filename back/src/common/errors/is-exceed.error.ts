import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.enum';
import { ServiceError } from './service.error';

export class IsExceedError extends ServiceError {
  constructor(message: string, extMessage: string) {
    super(ErrorCode.IsEmpty, HttpStatus.NOT_FOUND, message, extMessage);
  }

  private static fromClass<T extends new (...args: any[]) => any>(
    clazz: T,
    limit: number,
    message = 'is exceed',
    extMessage = 'превышает',
  ) {
    return new IsExceedError(
      `${clazz.name} selection ${extMessage} ${limit} records.`,
      `Выборка ${clazz.name}-ов ${message} ${limit} записей.`,
    );
  }

  public static withRange<T extends new (...args: any[]) => any>(clazz: T, limit: number, field: string, from: string, to: string) {
    return new IsExceedError(
      `${clazz.name} selection in range from ${from} to ${to} of ${field} field is exceed ${limit} records.`,
      `Выборка ${clazz.name}-ов в диапазоне от ${from} до ${to} поля ${field} превышает ${limit} записей.`,
    );
  }
}
