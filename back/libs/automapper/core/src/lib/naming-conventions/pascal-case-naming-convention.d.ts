import type { NamingConvention } from '../types';
/**
 * PascalCaseNamingConvention
 *
 * @example ThisIsPascalCase
 */
export declare class PascalCaseNamingConvention implements NamingConvention {
  separatorCharacter: string;
  splittingExpression: RegExp;
  transformPropertyName(sourceNameParts: string[]): string;
}