import type { ErrorHandler, Mapper, MappingStrategyInitializer, MetadataIdentifier, NamingConventionInput } from './types';
export interface CreateMapperOptions {
  strategyInitializer: MappingStrategyInitializer<MetadataIdentifier>;
  errorHandler?: ErrorHandler;
  namingConventions?: NamingConventionInput;
}
/**
 * Creates and returns a Mapper {} as a Proxy. The following methods are available to use with a Mapper:
 *  ```
 *  - Mapper#map(Array)(Async), Mapper#mutate(Array)(Async)
 *  - createMap()
 *  - addProfile()
 *  - getMapping()
 *  - getMappings()
 *  ```
 * @param {CreateMapperOptions} options
 */
export declare function createMapper({ strategyInitializer, errorHandler, namingConventions }: CreateMapperOptions): Mapper;