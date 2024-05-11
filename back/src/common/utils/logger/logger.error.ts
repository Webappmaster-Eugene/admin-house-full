import { ILogger } from '../../types/main/logger.interface';

export function loggerError(instanceLogger: ILogger, error: unknown) {
  instanceLogger.error(error);
}
