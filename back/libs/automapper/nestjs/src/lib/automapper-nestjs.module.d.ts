import type { CreateMapperOptions } from 'automapper/core';
import type { DynamicModule } from '@nestjs/common';
import type { AutomapperAsyncOptions, AutomapperGlobalOptions } from './options';
export declare class AutomapperModule {
  static forRoot(mapperOptions: CreateMapperOptions): DynamicModule;
  static forRoot(
    mapperOptions: Array<
      CreateMapperOptions & {
        name: string;
      }
    >,
    globalOptions?: AutomapperGlobalOptions,
  ): DynamicModule;
  static forRootAsync(asyncMapperOptions: AutomapperAsyncOptions): DynamicModule;
  static forRootAsync(
    asyncMapperOptions: Array<
      AutomapperAsyncOptions & {
        name: string;
      }
    >,
    globalOptions?: AutomapperGlobalOptions,
  ): DynamicModule;
  private static createProviders;
  private static createProvider;
  private static createMapperProvider;
  private static createMapper;
}