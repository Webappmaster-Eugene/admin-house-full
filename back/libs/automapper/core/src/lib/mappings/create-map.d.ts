import type { Dictionary, Mapper, Mapping, MappingConfiguration, ModelIdentifier } from '../types';
export declare function createMap<TSource extends Dictionary<TSource>>(
  mapper: Mapper,
  source: ModelIdentifier<TSource>,
  ...mappingConfigFns: (MappingConfiguration<TSource, TSource> | undefined)[]
): Mapping<TSource, TSource>;
export declare function createMap<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  mapper: Mapper,
  source: ModelIdentifier<TSource>,
  destination: ModelIdentifier<TDestination>,
  ...mappingConfigFns: (MappingConfiguration<TSource, TDestination> | undefined)[]
): Mapping<TSource, TDestination>;