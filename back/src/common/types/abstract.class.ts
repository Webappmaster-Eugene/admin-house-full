// export class UnknownClassWithConstructor {
//   constructor(...args) {}
// }
// export type AbstractClassType = typeof UnknownClassWithConstructor;
export type AbstractClassType = { new (...args: any[]): any };
