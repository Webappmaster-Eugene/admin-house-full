import type {
  Converter,
  Dictionary,
  MappingConfiguration,
  PrimitiveConstructorExtended,
  PrimitiveConstructorReturnType,
  Selector,
} from '../types';
type ConstructorReturnType<TConstructor extends PrimitiveConstructorExtended | PrimitiveConstructorExtended[]> =
  TConstructor extends PrimitiveConstructorExtended[]
    ? Array<PrimitiveConstructorReturnType<TConstructor[0]>>
    : TConstructor extends PrimitiveConstructorExtended
      ? PrimitiveConstructorReturnType<TConstructor>
      : never;
type ConverterOrValueSelector<
  TSourceConstructor extends PrimitiveConstructorExtended | PrimitiveConstructorExtended[],
  TDestinationConstructor extends PrimitiveConstructorExtended | PrimitiveConstructorExtended[],
> =
  | Selector<ConstructorReturnType<TSourceConstructor>, ConstructorReturnType<TDestinationConstructor> | undefined>
  | Converter<ConstructorReturnType<TSourceConstructor>, ConstructorReturnType<TDestinationConstructor> | undefined>;
export declare function typeConverter<
  TSource extends Dictionary<TSource>,
  TDestination extends Dictionary<TDestination>,
  TSourceConstructor extends PrimitiveConstructorExtended | [PrimitiveConstructorExtended],
  TDestinationConstructor extends PrimitiveConstructorExtended | [PrimitiveConstructorExtended],
>(
  source: TSourceConstructor,
  destination: TDestinationConstructor,
  converterOrValueSelector: ConverterOrValueSelector<TSourceConstructor, TDestinationConstructor>,
): MappingConfiguration<TSource, TDestination>;
export {};