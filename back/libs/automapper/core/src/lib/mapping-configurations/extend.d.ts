import type { Dictionary, Mapping, MappingConfiguration, ModelIdentifier } from '../types';
export declare function extend<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TExtendSource extends Dictionary<TExtendSource>,
  TExtendDestination extends Dictionary<TExtendDestination>,
>(mapping: Mapping<TExtendSource, TExtendDestination>): MappingConfiguration<TSource, TDestination>;
export declare function extend<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TExtendSource extends Dictionary<TExtendSource>,
  TExtendDestination extends Dictionary<TExtendDestination>,
>(source: ModelIdentifier<TExtendSource>, destination: ModelIdentifier<TExtendDestination>): MappingConfiguration<TSource, TDestination>;