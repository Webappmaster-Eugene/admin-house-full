import type { Constructor } from 'automapper/core';
import type { MappedType } from './mapped-type';
export declare function MapperIntersectionType<A, B>(classARef: Constructor<A>, classBRef: Constructor<B>): MappedType<A & B>;