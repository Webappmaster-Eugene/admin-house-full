import type { NamingConvention } from '../types';
export declare function getPath(
  path: string[],
  [sourceNamingConvention, destinationNamingConvention]: Readonly<[NamingConvention, NamingConvention]>,
): string[];
export declare function getFlatteningPaths(
  src: Record<string, unknown>,
  srcPath: string[],
  namingConventions: [NamingConvention, NamingConvention],
): string[];