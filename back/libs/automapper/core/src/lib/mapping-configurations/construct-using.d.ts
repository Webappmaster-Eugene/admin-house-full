import type { DestinationConstructor, Dictionary, MappingConfiguration } from '../types';
export declare const constructUsing: <TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  destinationConstructor: DestinationConstructor<TSource, TDestination>,
) => MappingConfiguration<TSource, TDestination>;