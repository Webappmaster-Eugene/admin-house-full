import type { Constructor } from 'automapper/core';
export declare function inheritAutoMapMetadata(
  parentClass: Constructor,
  targetClass: Function,
  isPropertyInherited?: (key: string) => boolean,
): void;
export declare function inheritPropertyInitializers(
  target: Record<string, unknown>,
  sourceClass: Constructor,
  isPropertyInherited?: (key: string) => boolean,
): void;