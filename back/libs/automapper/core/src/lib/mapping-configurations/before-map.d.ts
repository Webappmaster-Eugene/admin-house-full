import type { Dictionary, MapCallback, MappingConfiguration } from '../types';
export declare function beforeMap<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  cb: MapCallback<TSource, TDestination>,
): MappingConfiguration<TSource, TDestination>;