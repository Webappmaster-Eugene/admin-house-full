import type { Dictionary, MapOptions, Mapping } from '../types';
export declare function mapReturn<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  mapping: Mapping<TSource, TDestination>,
  sourceObject: TSource,
  options: MapOptions<TSource, TDestination>,
  isMapArray?: boolean,
): TDestination;
export declare function mapMutate<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  mapping: Mapping<TSource, TDestination>,
  sourceObject: TSource,
  destinationObj: TDestination,
  options: MapOptions<TSource, TDestination>,
  isMapArray?: boolean,
): void;
interface MapParameter<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>> {
  sourceObject: TSource;
  mapping: Mapping<TSource, TDestination>;
  options: MapOptions<TSource, TDestination>;
  setMemberFn: (destinationMemberPath: string[], destination?: TDestination) => (value: unknown) => void;
  getMemberFn?: (destinationMemberPath: string[] | undefined) => Record<string, unknown>;
  isMapArray?: boolean;
}
export declare function map<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>({
  mapping,
  sourceObject,
  options,
  setMemberFn,
  getMemberFn,
  isMapArray,
}: MapParameter<TSource, TDestination>): TDestination;
export {};