import type { Dictionary, Mapper, Mapping, MappingConfiguration, Metadata, MetadataIdentifier, NestedMappingPair } from '../types';
import { MappingClassId } from '../types';
export declare function createInitialMapping<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  mapper: Mapper,
  source: MetadataIdentifier<TSource>,
  destination: MetadataIdentifier<TDestination>,
  configurations?: MappingConfiguration<TSource, TDestination>[],
): Mapping;
export declare function createMappingUtil<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  mapper: Mapper,
  sourceIdentifier: MetadataIdentifier<TSource>,
  destinationIdentifier: MetadataIdentifier<TDestination>,
): {
  getMetadataAtMember: (memberPath: string[], type: 'source' | 'destination') => Metadata | undefined;
  processSourcePath: (
    sourceObject: TSource,
    namingConventions: [source: import('../types').NamingConvention, destination: import('../types').NamingConvention] | undefined,
    memberPath: string[],
  ) => string[];
  getNestedMappingPair: (
    metadataAtSource: Metadata | undefined,
    metadataAtDestination: Metadata | undefined,
  ) => NestedMappingPair | undefined;
};