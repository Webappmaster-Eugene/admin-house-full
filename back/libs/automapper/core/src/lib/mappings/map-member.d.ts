import type { Dictionary, Mapper, MemberMapReturn, MetadataIdentifier, Primitive } from '../types';
export declare function mapMember<TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  transformationMapFn: MemberMapReturn<TSource, TDestination>,
  sourceObject: TSource,
  destinationObject: TDestination,
  destinationMemberPath: string[],
  extraArgs: Record<string, any> | undefined,
  mapper: Mapper,
  sourceMemberIdentifier?: MetadataIdentifier | Primitive | Date,
  destinationMemberIdentifier?: MetadataIdentifier | Primitive | Date,
): unknown;