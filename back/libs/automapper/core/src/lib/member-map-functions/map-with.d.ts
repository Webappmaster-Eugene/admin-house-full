import type { Dictionary, MapWithReturn, ModelIdentifier, SelectorReturn } from '../types';
import { ValueSelector } from '../types';
type Constructor<TModel> = new (...args: unknown[]) => TModel;
export declare function mapWith<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TSelectorReturn = SelectorReturn<TDestination>,
  TWithDestination extends ModelIdentifier = ModelIdentifier,
  TWithSource extends ModelIdentifier = ModelIdentifier,
  TWithSourceValue extends ValueSelector = TWithSource extends Constructor<infer InferredWithSource>
    ? ValueSelector<TSource, InferredWithSource>
    : ValueSelector<TSource>,
>(
  withDestination: TWithDestination,
  withSource: TWithSource,
  withSourceValue: TWithSourceValue,
): MapWithReturn<TSource, TDestination, TSelectorReturn>;
export {};