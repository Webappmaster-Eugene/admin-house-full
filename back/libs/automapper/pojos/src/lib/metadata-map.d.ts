import type { AnyConstructor, Constructor, Dictionary, ModelIdentifier } from '@automapper/core';
export type PojoMetadata = Exclude<ModelIdentifier, Constructor> | AnyConstructor;
export declare class PojosMetadataMap {
    private static metadataStorage;
    static reset(): void;
    static create<TModel extends Dictionary<TModel>>(identifier: string | symbol, metadata?: {
        [key in keyof TModel]?: PojoMetadata | [PojoMetadata] | {
            type: PojoMetadata | [PojoMetadata];
            depth: number;
        };
    }): void;
    static retrieve(identifier: symbol): [
        string,
        {
            type: () => PojoMetadata;
            isArray: boolean;
            depth: number;
            isGetterOnly?: boolean;
        }
    ][];
    private static normalizePojoMetadata;
    private static toSymbol;
}
