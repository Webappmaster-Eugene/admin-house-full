import type { ArrayKeyedMap, Mapper, MetadataIdentifier, NamingConvention } from './types';
export declare const STRATEGY: unique symbol;
export declare const MAPPINGS: unique symbol;
export declare const METADATA_MAP: unique symbol;
export declare const METADATA_OBJECT_MAP: unique symbol;
export declare const ERROR_HANDLER: unique symbol;
export declare const NAMING_CONVENTIONS: unique symbol;
export declare const RECURSIVE_DEPTH: unique symbol;
export declare const RECURSIVE_COUNT: unique symbol;
export declare const PROFILE_CONFIGURATION_CONTEXT: unique symbol;
export declare const CUSTOM_NODE_INSPECT: unique symbol;
export declare function getErrorHandler(mapper: Mapper): import('./types').ErrorHandler;
export declare function getMappings(
  mapper: Mapper,
): Map<MetadataIdentifier<any>, Map<MetadataIdentifier<any>, import('./types').Mapping<any, any>>>;
export declare function getMetadataMap(mapper: Mapper): Map<MetadataIdentifier<any>, import('./types').Metadata[]>;
export declare function getMetadataObjectMap(
  mapper: Mapper,
): Map<MetadataIdentifier<any>, [asSource?: Record<string, unknown> | undefined, asDestination?: Record<string, unknown> | undefined]>;
export declare function getNamingConventions(
  mapper: Mapper,
): [sourceNamingConvention: NamingConvention, destinationNamingConvention: NamingConvention] | undefined;
export declare function getRecursiveDepth(mapper: Mapper): Map<MetadataIdentifier, ArrayKeyedMap>;
export declare function getRecursiveCount(mapper: Mapper): Map<MetadataIdentifier, ArrayKeyedMap>;
export declare function getStrategy(mapper: Mapper): import('./types').MappingStrategy<MetadataIdentifier<any>>;
export declare function getProfileConfigurationContext(mapper: Mapper): Set<import('./types').MappingConfiguration<any, any>>;