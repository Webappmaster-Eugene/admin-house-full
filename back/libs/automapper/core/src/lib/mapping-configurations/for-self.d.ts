import type { Dictionary, Mapping, MappingConfiguration, ModelIdentifier, Selector } from '../types';
export declare function forSelf<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TSelfSource extends Dictionary<TSelfSource>,
>(
  sourceOrMapping: ModelIdentifier<TSelfSource> | Mapping<TSelfSource, TDestination>,
  selector: Selector<TSource, TSelfSource>,
): MappingConfiguration<TSource, TDestination>;