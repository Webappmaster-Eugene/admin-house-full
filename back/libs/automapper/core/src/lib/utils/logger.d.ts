export declare class AutoMapperLogger {
  private static readonly AUTOMAPPER_PREFIX;
  private static configured;
  static configure(customLogger?: Partial<Pick<typeof AutoMapperLogger, 'log' | 'info' | 'error' | 'warn'>>): void;
  static log(message: string): void;
  static warn(warning: string): void;
  static error(error: string): void;
  static info(info: string): void;
}