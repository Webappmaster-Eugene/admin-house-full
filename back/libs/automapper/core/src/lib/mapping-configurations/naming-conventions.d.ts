import type { Dictionary, MappingConfiguration, NamingConventionInput } from '../types';
export declare const namingConventions: <TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  namingConventionsInput: NamingConventionInput,
) => MappingConfiguration<TSource, TDestination>;