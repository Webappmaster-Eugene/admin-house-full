import type { Dictionary, SelectorReturn, UndefinedSubstitutionReturn } from '../types';
export declare function undefinedSubstitution<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TSelectorReturn = SelectorReturn<TDestination>,
>(substitution: TSelectorReturn): UndefinedSubstitutionReturn<TSource, TDestination, TSelectorReturn>;