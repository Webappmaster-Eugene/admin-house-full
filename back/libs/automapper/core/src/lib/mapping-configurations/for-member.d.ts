import type { Dictionary, MappingConfiguration, MemberMapReturn, PreConditionReturn, Selector, SelectorReturn } from '../types';
export declare function forMember<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TMemberType = SelectorReturn<TDestination>,
>(
  selector: Selector<TDestination, TMemberType>,
  ...fns: [
    preCondOrMapMemberFn:
      | PreConditionReturn<TSource, TDestination, TMemberType>
      | MemberMapReturn<TSource, TDestination, TMemberType>
      | undefined,
    mapMemberFn?: MemberMapReturn<TSource, TDestination, TMemberType>,
  ]
): MappingConfiguration<TSource, TDestination>;