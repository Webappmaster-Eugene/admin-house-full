import type { Dictionary, MapOptions, ModelIdentifier } from 'automapper/core';
import type { NestInterceptor } from '@nestjs/common';
export declare const MapInterceptor: <TSource extends Dictionary<TSource>, TDestination extends Dictionary<TDestination>>(
  from: ModelIdentifier<TSource>,
  to: ModelIdentifier<TDestination>,
  options?: {
    isArray?: boolean;
    mapperName?: string;
  } & MapOptions<TSource, TDestination>,
) => NestInterceptor;