import type { NamingConvention } from '../types';
/**
 * CamelCaseNamingConvention
 *
 * @example thisIsCamelCase
 */
export declare class CamelCaseNamingConvention implements NamingConvention {
  separatorCharacter: string;
  splittingExpression: RegExp;
  transformPropertyName(sourceNameParts: string[]): string;
}