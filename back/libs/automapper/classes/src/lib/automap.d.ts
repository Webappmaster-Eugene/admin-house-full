import type { Constructor } from 'automapper/core';
import 'reflect-metadata';
export interface AutoMapOptions {
  /**
   * Type Function
   */
  type?: () => Constructor | [Constructor];
  /**
   * Depth for nested models. Default to 1
   */
  depth?: number;
  /**
   * Is this property getter-only?
   */
  isGetterOnly?: boolean;
}
export declare function AutoMap(): PropertyDecorator;
export declare function AutoMap(typeFn: () => Constructor | [Constructor]): PropertyDecorator;
export declare function AutoMap(options: AutoMapOptions): PropertyDecorator;