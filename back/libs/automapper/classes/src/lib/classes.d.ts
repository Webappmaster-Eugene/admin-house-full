import { Constructor, MappingStrategyInitializer, MappingStrategyInitializerOptions } from 'automapper/core';
import 'reflect-metadata';
export declare function classes(options?: MappingStrategyInitializerOptions): MappingStrategyInitializer<Constructor>;