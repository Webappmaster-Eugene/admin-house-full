import type { Dictionary, ErrorHandler, MetadataIdentifier } from '../types';
/**
 * Depends on implementation of strategy.createMapping
 */
export declare function assertUnmappedProperties<TDestination extends Dictionary<TDestination>>(
  destinationObject: TDestination,
  destinationMetadata: TDestination,
  configuredKeys: string[],
  sourceIdentifier: MetadataIdentifier,
  destinationIdentifier: MetadataIdentifier,
  errorHandler: ErrorHandler,
): void;