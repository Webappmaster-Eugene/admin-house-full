import type { Converter, ConvertUsingReturn, Dictionary, Selector, SelectorReturn } from '../types';
export declare function convertUsing<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TSelectorReturn = SelectorReturn<TDestination>,
  TConvertSourceReturn = SelectorReturn<TSource>,
>(
  converter: Converter<TConvertSourceReturn, TSelectorReturn>,
  selector: Selector<TSource, TConvertSourceReturn>,
): ConvertUsingReturn<TSource, TDestination, TSelectorReturn>;