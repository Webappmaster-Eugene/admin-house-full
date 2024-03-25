import { createLogger, format, transports } from 'winston';
import * as path from 'path';

const options = {
  console: {
    level: 'silly',
  },
};

const transportDefaults = {
  handleExceptions: true,
  exitOnError: false,
};

// const logPath = path.normalize(`${__dirname}/logger/`);
const logPath = path.normalize(`./logger/`);

// for development environment
const devLogger = {
  format: format.combine(
    format.label({ message: true, label: 'logging' }),
    format.colorize({ all: true }),
    format.timestamp({ format: 'DD-MM-YYYY, HH:mm:ss' }),
    format.align(),
    format.json(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, stack, message }) => {
      return `${timestamp} - [${level}] - ${message} - ${stack ? stack : ''}`;
    }),
    format.ms(),
  ),
  transports: [
    new transports.File({
      filename: `${logPath}combined.log`,
      ...transportDefaults,
    }),
    new transports.File({
      filename: `${logPath}error.log`,
      level: 'error',
      ...transportDefaults,
    }),
    new transports.File({
      filename: `${logPath}warn.log`,
      level: 'warn',
      ...transportDefaults,
    }),
    new transports.File({
      filename: `${logPath}info.log`,
      level: 'info',
      ...transportDefaults,
    }),
    new transports.File({
      filename: `${logPath}debug.log`,
      level: 'debug',
      ...transportDefaults,
    }),
    new transports.Console(options.console),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: `${logPath}exceptions.log`,
      ...transportDefaults,
    }),
  ],
};

// for production environment
const prodLogger = {
  format: format.combine(
    format.cli(),
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
    format.printf(({ timestamp, level, stack, message }) => {
      return `${timestamp} - [${level}] - ${message} - ${stack ? stack : ''}`;
    }),
  ),
  transports: [
    new transports.File({
      filename: `${logPath}combined.log`,
      ...transportDefaults,
    }),
    new transports.File({
      filename: `${logPath}error.log`,
      level: 'error',
      ...transportDefaults,
    }),
    new transports.File({
      filename: `${logPath}warn.log`,
      level: 'warn',
      ...transportDefaults,
    }),
    new transports.File({
      filename: `${logPath}info.log`,
      level: 'info',
      ...transportDefaults,
    }),
    new transports.File({
      filename: `${logPath}debug.log`,
      level: 'debug',
      ...transportDefaults,
    }),
    new transports.Console(options.console),
  ],
  exceptionHandlers: [
    new transports.File({
      filename: `${logPath}exceptions.log`,
      ...transportDefaults,
    }),
  ],
};

// export log instance based on the current environment
const instanceLogger =
  process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export const instance = createLogger(instanceLogger);
