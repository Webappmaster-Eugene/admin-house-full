import type { Dictionary, MapCallback, MappingConfiguration } from '../types';
export declare function afterMap<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  cb: MapCallback<TSource, TDestination>,
): MappingConfiguration<TSource, TDestination>;