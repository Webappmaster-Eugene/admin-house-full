import type { Dictionary, MapOptions, Mapper, ModelIdentifier } from 'automapper/core';
export declare function shouldSkipTransform<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  mapper: Mapper | undefined,
  from: ModelIdentifier<TDestination>,
  to: ModelIdentifier<TSource>,
): boolean;
export declare function transformArray<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  value: TSource[],
  mapper: Mapper | undefined,
  from: ModelIdentifier<TSource>,
  to: ModelIdentifier<TDestination>,
  options?: MapOptions<TSource[], TDestination[]>,
): TDestination[] | undefined;
export declare function getTransformOptions<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  options?: {
    isArray?: boolean;
    mapperName?: string;
  } & MapOptions<TSource, TDestination>,
): {
  mapperName?: string;
  isArray: boolean;
  transformedMapOptions?: MapOptions<TSource, TDestination>;
};