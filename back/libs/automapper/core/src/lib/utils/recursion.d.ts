import type { ArrayKeyedMap, MetadataIdentifier } from '../types';
export declare function getRecursiveValue(
  recursiveMap: Map<MetadataIdentifier, ArrayKeyedMap>,
  parent: MetadataIdentifier,
  member: string[],
): number | undefined;
export declare function setRecursiveValue(
  recursiveMap: Map<MetadataIdentifier, ArrayKeyedMap>,
  parent: MetadataIdentifier,
  member: string[],
  value: number,
): void;