import type { NamingConvention } from '../types';
/**
 * SnakeCaseNamingConvention
 *
 * @example this_is_snake_case
 */
export declare class SnakeCaseNamingConvention implements NamingConvention {
  separatorCharacter: string;
  splittingExpression: RegExp;
  transformPropertyName(sourcePropNameParts: string[]): string;
}