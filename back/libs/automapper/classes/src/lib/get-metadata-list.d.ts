import type { Constructor } from 'automapper/core';
import 'reflect-metadata';
export declare function getMetadataList(model: Constructor): [
  metadataList: [
    string,
    {
      type: () => Constructor;
      isArray: boolean;
      depth: number;
      isGetterOnly?: boolean;
    },
  ][],
  nestedConstructor: Constructor[],
];