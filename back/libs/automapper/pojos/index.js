import { defaultStrategyInitializerOptions } from '@automapper/core';

class PojosMetadataMap {
  static reset() {
    this.metadataStorage = new Map();
  }
  static create(identifier, metadata = {}) {
    const symbolIdentifier = typeof identifier === 'string' ? Symbol.for(identifier) : identifier;
    const metadataEntries = Object.entries(metadata);
    if (!metadataEntries.length) return;
    for (let i = 0, length = metadataEntries.length; i < length; i++) {
      const [metadataKey, pojoMetadata] = metadataEntries[i];
      const normalizedMetadata = this.normalizePojoMetadata(pojoMetadata);
      if (!this.metadataStorage.has(symbolIdentifier)) {
        this.metadataStorage.set(symbolIdentifier, []);
      }
      this.metadataStorage.get(symbolIdentifier)?.push([metadataKey, normalizedMetadata]);
    }
  }
  static retrieve(identifier) {
    const identifierMetadata = this.metadataStorage.get(identifier);
    if (!identifierMetadata) return [];
    return identifierMetadata.map(([key, {
      type,
      depth
    }]) => {
      const meta = type();
      const isArray = Array.isArray(meta);
      return [key, {
        type: isArray ? () => meta[0] : () => meta,
        isArray,
        depth
      }];
    });
  }
  static normalizePojoMetadata(pojoMetadata) {
    if (typeof pojoMetadata === 'string' || typeof pojoMetadata === 'symbol' || typeof pojoMetadata === 'function' || Array.isArray(pojoMetadata)) {
      return {
        type: () => this.toSymbol(pojoMetadata),
        depth: 1
      };
    }
    const metadata = pojoMetadata;
    metadata.type = this.toSymbol(metadata.type);
    return {
      type: () => metadata.type,
      depth: metadata.depth
    };
  }
  static toSymbol(metadata) {
    if (typeof metadata === 'string') {
      return Symbol.for(metadata);
    }
    if (Array.isArray(metadata) && typeof metadata[0] === 'string') {
      return Symbol.for(metadata[0]);
    }
    return metadata;
  }
}
PojosMetadataMap.metadataStorage = new Map();

function pojos(options = {}) {
  const {
    destinationConstructor = () => ({}),
    applyMetadata,
    postMap,
    preMap
  } = {
    ...defaultStrategyInitializerOptions,
    ...options
  };
  return mapper => ({
    destinationConstructor,
    mapper,
    get applyMetadata() {
      return applyMetadata(this);
    },
    retrieveMetadata(...identifiers) {
      const metadataMap = new Map();
      for (let i = 0, length = identifiers.length; i < length; i++) {
        const identifier = identifiers[i];
        metadataMap.set(identifier, PojosMetadataMap.retrieve(identifier));
      }
      return metadataMap;
    },
    preMap,
    postMap
  });
}

export { PojosMetadataMap, pojos };
