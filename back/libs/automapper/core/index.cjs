'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function normalizeNamingConventions(namingConventions) {
  if ('source' in namingConventions && 'destination' in namingConventions) {
    return [namingConventions.source, namingConventions.destination];
  }
  return [namingConventions, namingConventions];
}

const STRATEGY = Symbol.for('__strategy__');
const MAPPINGS = Symbol.for('__mappings__');
const METADATA_MAP = Symbol.for('__metadata_map__');
const METADATA_OBJECT_MAP = Symbol.for('__metadata_object_map__');
const ERROR_HANDLER = Symbol.for('__error_handler__');
const NAMING_CONVENTIONS = Symbol.for('__naming_conventions__');
const RECURSIVE_DEPTH = Symbol.for('__recursive_depth__');
const RECURSIVE_COUNT = Symbol.for('__recursive_count__');
const PROFILE_CONFIGURATION_CONTEXT = Symbol.for('__profile_configuration_context__');
const CUSTOM_NODE_INSPECT = Symbol.for('nodejs.util.inspect.custom');
function getErrorHandler(mapper) {
  return mapper[ERROR_HANDLER];
}
function getMappings(mapper) {
  return mapper[MAPPINGS];
}
function getMetadataMap(mapper) {
  return mapper[METADATA_MAP];
}
function getMetadataObjectMap(mapper) {
  return mapper[METADATA_OBJECT_MAP];
}
function getNamingConventions(mapper) {
  const namingConventions = mapper[NAMING_CONVENTIONS];
  if (!namingConventions) return undefined;
  return normalizeNamingConventions(namingConventions);
}
function getRecursiveDepth(mapper) {
  return mapper[RECURSIVE_DEPTH];
}
function getRecursiveCount(mapper) {
  return mapper[RECURSIVE_COUNT];
}
function getStrategy(mapper) {
  return mapper[STRATEGY];
}
function getProfileConfigurationContext(mapper) {
  return mapper[PROFILE_CONFIGURATION_CONTEXT];
}

/**
 * Depends on implementation of strategy.createMapping
 */
function assertUnmappedProperties(destinationObject, destinationMetadata, configuredKeys, sourceIdentifier, destinationIdentifier, errorHandler) {
  const unmappedKeys = Object.keys(destinationMetadata).reduce((result, key) => {
    const isOnDestination = (key in destinationObject);
    const isAlreadyConfigured = configuredKeys.some(configuredKey => configuredKey === key);
    const isWritable = Object.getOwnPropertyDescriptor(destinationMetadata, key)?.writable === true;
    if (!isAlreadyConfigured && !isOnDestination && isWritable && destinationObject[key] === undefined) {
      result.push(key);
    }
    return result;
  }, []);
  const sourceText = getTextFromIdentifier(sourceIdentifier);
  const destinationText = getTextFromIdentifier(destinationIdentifier);
  if (unmappedKeys.length) {
    const parentInfo = `${sourceText} -> ${destinationText}`;
    errorHandler.handle(`
Unmapped properties for ${parentInfo}:
-------------------
${unmappedKeys.join(',\n')}
`);
  }
}
function getTextFromIdentifier(identifier) {
  let text = identifier.toString();
  if (identifier.name) {
    text = identifier.name;
  }
  return text;
}

function get(object, path = []) {
  if (!path.length) {
    return;
  }
  let index;
  const length = path.length;
  for (index = 0; index < length && object != null; index++) {
    object = object[path[index]];
  }
  return index && index == length ? object : undefined;
}

function getMapping(mapper, source, destination, allowNull = false) {
  // turn string into symbol for identifier
  const sourceIdentifier = typeof source === 'string' ? Symbol.for(source) : source;
  const destinationIdentifier = typeof destination === 'string' ? Symbol.for(destination) : destination;
  const mapping = getMappings(mapper).get(sourceIdentifier)?.get(destinationIdentifier);
  if (mapping == null && !allowNull) {
    const sourceName = typeof source === 'function' ? source.name || String(source) : String(source);
    const destinationName = typeof destination === 'function' ? destination.name || String(destination) : String(destination);
    const errorHandler = getErrorHandler(mapper);
    const errorMessage = `Mapping is not found for ${sourceName} and ${destinationName}`;
    errorHandler.handle(errorMessage);
    throw new Error(errorMessage);
  }
  return mapping;
}

/**
 * Check if value is a Date constructor
 *
 * @param {Function} value
 */
function isDateConstructor(value) {
  return Object.getPrototypeOf(value) === Date || value === Date;
}

function isEmpty(value) {
  if (Array.isArray(value)) {
    return !value.length;
  }
  if (typeof value !== 'object' && typeof value !== 'function') {
    return !value;
  }
  return !Object.keys(value).length;
}

function isPrimitiveArrayEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((itemA, index) => b[index] === itemA);
}

/**
 * Check if value is a String/Number/Boolean/Array constructor
 *
 * @param {Function} value
 */
function isPrimitiveConstructor(value) {
  // constructor/function passed in is undefined/null, we fall back to primitive
  if (value == null) return true;
  const proto = Object.getPrototypeOf(value);
  return proto === String || proto === Number || proto === Boolean || value === String || value === Number || value === Boolean;
}

function set(object, path, value) {
  const {
    decomposedPath,
    base
  } = decomposePath(path);
  if (base === undefined) {
    return object;
  }
  // assign an empty object in order to spread object
  assignEmpty(object, base);
  // Determine if there is still layers to traverse
  value = decomposedPath.length <= 1 ? value : set(object[base], decomposedPath.slice(1), value);
  return Object.assign(object, {
    [base]: value
  });
}
function setMutate(object, path, value) {
  const {
    decomposedPath,
    base
  } = decomposePath(path);
  if (base === undefined) {
    return;
  }
  // assign an empty object in order to spread object
  assignEmpty(object, base);
  // Determine if there is still layers to traverse
  if (decomposedPath.length <= 1) {
    object[base] = value;
  } else {
    setMutate(object[base], decomposedPath.slice(1), value);
  }
}
function decomposePath(path) {
  if (path.length < 1) {
    return {
      base: '',
      decomposedPath: []
    };
  }
  const decomposedPath = path;
  const base = path[0];
  return {
    base,
    decomposedPath
  };
}
function assignEmpty(obj, base) {
  if (!obj.hasOwnProperty(base)) {
    obj[base] = {};
  }
}

function mapMember(transformationMapFn, sourceObject, destinationObject, destinationMemberPath, extraArgs, mapper, sourceMemberIdentifier, destinationMemberIdentifier) {
  let value;
  const transformationType = transformationMapFn[0 /* MapFnClassId.type */];
  const mapFn = transformationMapFn[1 /* MapFnClassId.fn */];
  const shouldRunImplicitMap = !(isPrimitiveConstructor(sourceMemberIdentifier) || isPrimitiveConstructor(destinationMemberIdentifier) || isDateConstructor(sourceMemberIdentifier) || isDateConstructor(destinationMemberIdentifier));
  switch (transformationType) {
    case 1 /* TransformationType.MapFrom */:
      value = mapFn(sourceObject);
      break;
    case 3 /* TransformationType.FromValue */:
      value = mapFn();
      break;
    case 4 /* TransformationType.MapWith */:
      value = mapFn(sourceObject, mapper, extraArgs ? {
        extraArgs: () => extraArgs
      } : undefined);
      break;
    case 5 /* TransformationType.ConvertUsing */:
      value = mapFn(sourceObject);
      break;
    case 2 /* TransformationType.Condition */:
    case 7 /* TransformationType.NullSubstitution */:
    case 8 /* TransformationType.UndefinedSubstitution */:
      value = mapFn(sourceObject, destinationMemberPath);
      if (shouldRunImplicitMap && value != null) {
        value = Array.isArray(value) ? mapper.mapArray(value, sourceMemberIdentifier, destinationMemberIdentifier) : mapper.map(value, sourceMemberIdentifier, destinationMemberIdentifier);
      }
      break;
    case 9 /* TransformationType.MapWithArguments */:
      value = mapFn(sourceObject, extraArgs || {});
      break;
    case 10 /* TransformationType.MapDefer */:
      value = mapMember(mapFn(sourceObject), sourceObject, destinationObject, destinationMemberPath, extraArgs, mapper, sourceMemberIdentifier, destinationMemberIdentifier);
      break;
  }
  return value;
}

function setMemberReturnFn(destinationMemberPath, destination) {
  return value => {
    if (destination) {
      destination = set(destination, destinationMemberPath, value);
    }
  };
}
function mapReturn(mapping, sourceObject, options, isMapArray = false) {
  return map({
    mapping,
    sourceObject,
    options,
    setMemberFn: setMemberReturnFn,
    isMapArray
  });
}
function setMemberMutateFn(destinationObj) {
  return destinationMember => value => {
    if (value !== undefined) {
      setMutate(destinationObj, destinationMember, value);
    }
  };
}
function getMemberMutateFn(destinationObj) {
  return memberPath => get(destinationObj, memberPath);
}
function mapMutate(mapping, sourceObject, destinationObj, options, isMapArray = false) {
  map({
    sourceObject,
    mapping,
    setMemberFn: setMemberMutateFn(destinationObj),
    getMemberFn: getMemberMutateFn(destinationObj),
    options,
    isMapArray
  });
}
function map({
  mapping,
  sourceObject,
  options,
  setMemberFn,
  getMemberFn,
  isMapArray = false
}) {
  // destructure mapping
  const [[sourceIdentifier, destinationIdentifier], [, destinationWithMetadata], propsToMap,, mapper, destinationConstructor,, [mappingBeforeCallback, mappingAfterCallback] = []] = mapping;
  // deconstruct MapOptions
  const {
    beforeMap: mapBeforeCallback,
    afterMap: mapAfterCallback,
    destinationConstructor: mapDestinationConstructor = destinationConstructor,
    extraArgs
  } = options ?? {};
  const errorHandler = getErrorHandler(mapper);
  const metadataMap = getMetadataMap(mapper);
  const destination = mapDestinationConstructor(sourceObject, destinationIdentifier);
  // get extraArguments
  const extraArguments = extraArgs?.(mapping, destination);
  // initialize an array of keys that have already been configured
  const configuredKeys = [];
  if (!isMapArray) {
    const beforeMap = mapBeforeCallback ?? mappingBeforeCallback;
    if (beforeMap) {
      beforeMap(sourceObject, destination, extraArguments);
    }
  }
  // map
  for (let i = 0, length = propsToMap.length; i < length; i++) {
    // destructure mapping property
    const [destinationMemberPath, [, [transformationMapFn, [transformationPreConditionPredicate, transformationPreConditionDefaultValue = undefined] = []]], [destinationMemberIdentifier, sourceMemberIdentifier] = []] = propsToMap[i];
    let hasSameIdentifier = !isPrimitiveConstructor(destinationMemberIdentifier) && !isDateConstructor(destinationMemberIdentifier) && !isPrimitiveConstructor(sourceMemberIdentifier) && !isDateConstructor(sourceMemberIdentifier) && sourceMemberIdentifier === destinationMemberIdentifier;
    if (hasSameIdentifier) {
      // at this point, we have a same identifier that aren't primitive or date
      // we then check if there is a mapping created for this identifier
      hasSameIdentifier = !getMapping(mapper, sourceMemberIdentifier, destinationMemberIdentifier, true);
    }
    // Set up a shortcut function to set destinationMemberPath on destination with value as argument
    const setMember = valFn => {
      try {
        return setMemberFn(destinationMemberPath, destination)(valFn());
      } catch (originalError) {
        const errorMessage = `
Error at "${destinationMemberPath}" on ${destinationIdentifier['prototype']?.constructor?.name || destinationIdentifier.toString()} (${JSON.stringify(destination)})
---------------------------------------------------------------------
Original error: ${originalError}`;
        errorHandler.handle(errorMessage);
        throw new Error(errorMessage);
      }
    };
    // This destination key is being configured. Push to configuredKeys array
    configuredKeys.push(destinationMemberPath[0]);
    // Pre Condition check
    if (transformationPreConditionPredicate && !transformationPreConditionPredicate(sourceObject)) {
      setMember(() => transformationPreConditionDefaultValue);
      continue;
    }
    // Start with all the mapInitialize
    if (transformationMapFn[0 /* MapFnClassId.type */] === 6 /* TransformationType.MapInitialize */) {
      // check if metadata as destinationMemberPath is null
      const destinationMetadata = metadataMap.get(destinationIdentifier);
      const hasNullMetadata = destinationMetadata && destinationMetadata.find(metadata => isPrimitiveArrayEqual(metadata[0 /* MetadataClassId.propertyKeys */], destinationMemberPath)) === null;
      const mapInitializedValue = transformationMapFn[1 /* MapFnClassId.fn */](sourceObject);
      const isTypedConverted = transformationMapFn[2 /* MapFnClassId.isConverted */];
      // if null/undefined
      // if isDate, isFile
      // if metadata is null, treat as-is
      // if it has same identifier that are not primitives or Date
      // if the initialized value was converted with typeConverter
      if (mapInitializedValue == null || mapInitializedValue instanceof Date || Object.prototype.toString.call(mapInitializedValue).slice(8, -1) === 'File' || hasNullMetadata || hasSameIdentifier || isTypedConverted) {
        setMember(() => mapInitializedValue);
        continue;
      }
      // if isArray
      if (Array.isArray(mapInitializedValue)) {
        const [first] = mapInitializedValue;
        // if first item is a primitive
        if (typeof first !== 'object' || first instanceof Date || Object.prototype.toString.call(first).slice(8, -1) === 'File') {
          setMember(() => mapInitializedValue.slice());
          continue;
        }
        // if first is empty
        if (isEmpty(first)) {
          setMember(() => []);
          continue;
        }
        // if first is object but the destination identifier is a primitive
        // then skip completely
        if (isPrimitiveConstructor(destinationMemberIdentifier)) {
          continue;
        }
        setMember(() => mapInitializedValue.map(each => mapReturn(getMapping(mapper, sourceMemberIdentifier, destinationMemberIdentifier), each, {
          extraArgs
        })));
        continue;
      }
      if (typeof mapInitializedValue === 'object') {
        const nestedMapping = getMapping(mapper, sourceMemberIdentifier, destinationMemberIdentifier);
        // nested mutate
        if (getMemberFn) {
          const memberValue = getMemberFn(destinationMemberPath);
          if (memberValue !== undefined) {
            map({
              sourceObject: mapInitializedValue,
              mapping: nestedMapping,
              options: {
                extraArgs
              },
              setMemberFn: setMemberMutateFn(memberValue),
              getMemberFn: getMemberMutateFn(memberValue)
            });
          }
          continue;
        }
        setMember(() => map({
          mapping: nestedMapping,
          sourceObject: mapInitializedValue,
          options: {
            extraArgs
          },
          setMemberFn: setMemberReturnFn
        }));
        continue;
      }
      // if is primitive
      setMember(() => mapInitializedValue);
      continue;
    }
    setMember(() => mapMember(transformationMapFn, sourceObject, destination, destinationMemberPath, extraArguments, mapper, sourceMemberIdentifier, destinationMemberIdentifier));
  }
  if (!isMapArray) {
    const afterMap = mapAfterCallback ?? mappingAfterCallback;
    if (afterMap) {
      afterMap(sourceObject, destination, extraArguments);
    }
  }
  // Check unmapped properties
  assertUnmappedProperties(destination, destinationWithMetadata, configuredKeys, sourceIdentifier, destinationIdentifier, errorHandler);
  return destination;
}

class AutoMapperLogger {
  static configure(customLogger = {}) {
    if (this.configured) return;
    this.configured = true;
    Object.entries(customLogger).forEach(([logLevel, logImpl]) => {
      if (logImpl !== undefined) {
        this[logLevel] = logImpl;
      }
    });
  }
  static log(message) {
    console.log.bind(console, this.AUTOMAPPER_PREFIX, message);
  }
  static warn(warning) {
    console.warn.bind(console, this.AUTOMAPPER_PREFIX, warning);
  }
  static error(error) {
    console.error.bind(console, this.AUTOMAPPER_PREFIX, error);
  }
  static info(info) {
    console.info.bind(console, this.AUTOMAPPER_PREFIX, info);
  }
}
AutoMapperLogger.AUTOMAPPER_PREFIX = '[AutoMapper]: ';
AutoMapperLogger.configured = false;

/**
 * Creates and returns a Mapper {} as a Proxy. The following methods are available to use with a Mapper:
 *  ```
 *  - Mapper#map(Array)(Async), Mapper#mutate(Array)(Async)
 *  - createMap()
 *  - addProfile()
 *  - getMapping()
 *  - getMappings()
 *  ```
 * @param {CreateMapperOptions} options
 */
function createMapper({
  strategyInitializer,
  errorHandler,
  namingConventions
}) {
  let strategy;
  // this mapper is responsible for all mappings
  let mappings;
  // this mapper is responsible for all metadata
  let metadataMap;
  let metadataObjectMap;
  // this mapper is responsible for recursive depths and counts
  let recursiveDepth;
  let recursiveCount;
  // this mapper is tracking some context about the MappingProfile
  let profileConfigurationContext;
  function getOptions(sourceIdentifier, destinationIdentifierOrOptions, options) {
    if (destinationIdentifierOrOptions && options) {
      return {
        destinationIdentifier: destinationIdentifierOrOptions,
        mapOptions: options
      };
    }
    let destinationIdentifier = sourceIdentifier;
    if (destinationIdentifierOrOptions && !options) {
      const typeofDestinationOrOptions = typeof destinationIdentifierOrOptions;
      if (typeofDestinationOrOptions === 'string' || typeofDestinationOrOptions === 'function') {
        destinationIdentifier = destinationIdentifierOrOptions;
      } else {
        options = destinationIdentifierOrOptions;
      }
    }
    return {
      destinationIdentifier,
      mapOptions: options
    };
  }
  // return the Proxy
  return new Proxy({
    [CUSTOM_NODE_INSPECT]() {
      return `
Mapper {} is an empty Object as a Proxy. The following methods are available to use with a Mapper:
- Mapper#map(Array)(Async), Mapper#mutate(Array)(Async)
- createMap()
- addProfile()
- getMapping()
- getMappings()
        `;
    }
  }, {
    get(target, p, receiver) {
      if (p === STRATEGY) {
        if (!strategy) {
          strategy = strategyInitializer(receiver);
        }
        return strategy;
      }
      if (p === PROFILE_CONFIGURATION_CONTEXT) {
        if (!profileConfigurationContext) {
          profileConfigurationContext = new Set();
        }
        return profileConfigurationContext;
      }
      if (p === MAPPINGS) {
        if (!mappings) {
          mappings = new Map();
        }
        return mappings;
      }
      if (p === METADATA_MAP) {
        if (!metadataMap) {
          metadataMap = new Map();
        }
        return metadataMap;
      }
      if (p === METADATA_OBJECT_MAP) {
        if (!metadataObjectMap) {
          metadataObjectMap = new Map();
        }
        return metadataObjectMap;
      }
      if (p === ERROR_HANDLER) {
        if (!errorHandler) {
          errorHandler = {
            handle: AutoMapperLogger.error ? AutoMapperLogger.error.bind(AutoMapperLogger) :
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            () => {}
          };
        }
        return errorHandler;
      }
      if (p === NAMING_CONVENTIONS) {
        return namingConventions;
      }
      if (p === RECURSIVE_DEPTH) {
        if (!recursiveDepth) {
          recursiveDepth = new Map();
        }
        return recursiveDepth;
      }
      if (p === RECURSIVE_COUNT) {
        if (!recursiveCount) {
          recursiveCount = new Map();
        }
        return recursiveCount;
      }
      if (p === 'dispose') {
        return () => {
          mappings?.clear();
          // TODO: why can metadata not be clear?
          // metadata?.clear();
          metadataObjectMap?.clear();
          recursiveDepth?.clear();
          recursiveCount?.clear();
          profileConfigurationContext?.clear();
        };
      }
      if (p === 'map') {
        return (sourceObject, sourceIdentifier, destinationIdentifierOrOptions, options) => {
          if (sourceObject == null) return sourceObject;
          const {
            destinationIdentifier,
            mapOptions
          } = getOptions(sourceIdentifier, destinationIdentifierOrOptions, options);
          const mapping = getMapping(receiver, sourceIdentifier, destinationIdentifier);
          sourceObject = strategy.preMap(sourceObject, mapping);
          const destination = mapReturn(mapping, sourceObject, mapOptions || {});
          return strategy.postMap(sourceObject,
          // seal destination so that consumers cannot add properties to it
          // or change the property descriptors. but they can still modify it
          // the ideal behavior is seal but the consumers might need to add/modify the object after map finishes
          destination, mapping);
        };
      }
      if (p === 'mapAsync') {
        return (sourceObject, sourceIdentifier, destinationIdentifierOrOptions, options) => {
          const result = receiver['map'](sourceObject, sourceIdentifier, destinationIdentifierOrOptions, options);
          return new Promise(res => {
            setTimeout(res, 0, result);
          });
        };
      }
      if (p === 'mapArray') {
        return (sourceArray, sourceIdentifier, destinationIdentifierOrOptions, options) => {
          if (!sourceArray.length) return [];
          const {
            destinationIdentifier,
            mapOptions
          } = getOptions(sourceIdentifier, destinationIdentifierOrOptions, options);
          const mapping = getMapping(receiver, sourceIdentifier, destinationIdentifier);
          const {
            beforeMap,
            afterMap,
            extraArgs
          } = mapOptions || {};
          if (beforeMap) {
            beforeMap(sourceArray, []);
          }
          const destinationArray = [];
          for (let i = 0, length = sourceArray.length; i < length; i++) {
            let sourceObject = sourceArray[i];
            sourceObject = strategy.preMap(sourceObject, mapping);
            const destination = mapReturn(mapping, sourceObject, {
              extraArgs: extraArgs
            }, true);
            destinationArray.push(strategy.postMap(sourceObject,
            // seal destination so that consumers cannot add properties to it
            // or change the property descriptors. but they can still modify it
            // the ideal behavior is seal but the consumers might need to add/modify the object after map finishes
            destination, mapping));
          }
          if (afterMap) {
            afterMap(sourceArray, destinationArray);
          }
          return destinationArray;
        };
      }
      if (p === 'mapArrayAsync') {
        return (sourceArray, sourceIdentifier, destinationIdentifierOrOptions, options) => {
          const result = receiver['mapArray'](sourceArray, sourceIdentifier, destinationIdentifierOrOptions, options);
          return new Promise(res => {
            setTimeout(res, 0, result);
          });
        };
      }
      if (p === 'mutate') {
        return (sourceObject, destinationObject, sourceIdentifier, destinationIdentifierOrOptions, options) => {
          if (sourceObject == null) return;
          const {
            destinationIdentifier,
            mapOptions
          } = getOptions(sourceIdentifier, destinationIdentifierOrOptions, options);
          const mapping = getMapping(receiver, sourceIdentifier, destinationIdentifier);
          sourceObject = strategy.preMap(sourceObject, mapping);
          mapMutate(mapping, sourceObject, destinationObject, mapOptions || {});
          strategy.postMap(sourceObject, destinationObject, mapping);
        };
      }
      if (p === 'mutateAsync') {
        return (sourceObject, destinationObject, sourceIdentifier, destinationIdentifierOrOptions, options) => {
          return new Promise(res => {
            receiver['mutate'](sourceObject, destinationObject, sourceIdentifier, destinationIdentifierOrOptions, options);
            setTimeout(res, 0);
          });
        };
      }
      if (p === 'mutateArray') {
        return (sourceArray, destinationArray, sourceIdentifier, destinationIdentifierOrOptions, options) => {
          if (!sourceArray.length) return;
          const {
            destinationIdentifier,
            mapOptions
          } = getOptions(sourceIdentifier, destinationIdentifierOrOptions, options);
          const mapping = getMapping(receiver, sourceIdentifier, destinationIdentifier);
          const {
            beforeMap,
            afterMap,
            extraArgs
          } = mapOptions || {};
          if (beforeMap) {
            beforeMap(sourceArray, destinationArray);
          }
          for (let i = 0, length = sourceArray.length; i < length; i++) {
            let sourceObject = sourceArray[i];
            sourceObject = strategy.preMap(sourceObject, mapping);
            mapMutate(mapping, sourceObject, destinationArray[i] || {}, {
              extraArgs: extraArgs
            }, true);
            strategy.postMap(sourceObject, destinationArray[i], mapping);
          }
          if (afterMap) {
            afterMap(sourceArray, destinationArray);
          }
        };
      }
      if (p === 'mutateArrayAsync') {
        return (sourceArray, destinationArray, sourceIdentifier, destinationIdentifierOrOptions, options) => {
          return new Promise(res => {
            receiver['mutateArray'](sourceArray, destinationArray, sourceIdentifier, destinationIdentifierOrOptions, options);
            setTimeout(res, 0);
          });
        };
      }
      return Reflect.get(target, p, receiver);
    }
  });
}

const RECURSIVE_DATA = Symbol('__recursive_data__');
function getRecursiveValue(recursiveMap, parent, member) {
  const parentValue = recursiveMap.get(parent);
  return parentValue ? arrayMapGet(parentValue, member) : undefined;
}
function setRecursiveValue(recursiveMap, parent, member, value) {
  if (!recursiveMap.has(parent)) {
    recursiveMap.set(parent, arrayMapSet(new Map(), member, value));
    return;
  }
  const parentValue = recursiveMap.get(parent);
  if (arrayMapHas(parentValue, member)) return;
  arrayMapSet(parentValue, member, value);
}
function arrayMapSet(root, path, value) {
  let map = root;
  for (const item of path) {
    let nextMap = map.get(item);
    if (!nextMap) {
      // Create next map if none exists
      nextMap = new Map();
      map.set(item, nextMap);
    }
    map = nextMap;
  }
  // Reached end of path.  Set the data symbol to the given value
  map.set(RECURSIVE_DATA, value);
  return root;
}
function arrayMapHas(root, path) {
  let map = root;
  for (const item of path) {
    const nextMap = map.get(item);
    if (nextMap) {
      map = nextMap;
    } else {
      return false;
    }
  }
  return map.has(RECURSIVE_DATA);
}
function arrayMapGet(root, path) {
  let map = root;
  for (const item of path) {
    map = map.get(item);
    if (!map) return undefined;
  }
  return map.get(RECURSIVE_DATA);
}

function defaultApplyMetadata(strategy) {
  const mapper = strategy.mapper;
  const metadataMap = getMetadataMap(mapper);
  const metadataObjectMap = getMetadataObjectMap(mapper);
  const recursiveCountMap = getRecursiveCount(mapper);
  const recursiveDepthMap = getRecursiveDepth(mapper);
  function applyMetadata(model, as, root = true, selfReference = false) {
    // get the metadata of the model
    const metadata = metadataMap.get(model);
    // instantiate a model
    const instance = {};
    // if metadata is empty, return the instance early
    if (isEmpty(metadata) || !metadata) {
      return instance;
    }
    // walking the metadata
    for (let i = 0, length = metadata.length; i < length; i++) {
      // destructure the metadata
      const key = metadata[i][0 /* MetadataClassId.propertyKeys */];
      const metaFn = metadata[i][1 /* MetadataClassId.metaFn */];
      const isArray = metadata[i][2 /* MetadataClassId.isArray */];
      /**
       * in V8, AutoMapper does not instantiate a new model on applying metadata anymore.
       * Hence, isGetterOnly seems to be obsolete.
       */
      const isGetterOnly = metadata[i][3 /* MetadataClassId.isGetterOnly */];
      // skip getter if is applying metadata to a destination (because we will be setting data
      // on the destination. Getter only cannot be set
      if (isGetterOnly && as === 1 /* MetadataObjectMapClassId.asDestination */) {
        continue;
      }
      // call the meta fn to get the metaResult of the current key
      const metaResult = metaFn();
      // if the metadata is an Array, then assign an empty array
      if (isArray) {
        setMutate(instance, key, []);
        continue;
      }
      // if is String, Number, Boolean
      // null meta means this has any type or an arbitrary object, treat as primitives
      if (isPrimitiveConstructor(metaResult) || metaResult === null) {
        setMutate(instance, key, undefined);
        continue;
      }
      // if is Date, assign a new Date value if valueAtKey is defined, otherwise, undefined
      if (isDateConstructor(metaResult)) {
        setMutate(instance, key, new Date());
        continue;
      }
      // get depth and count of the current key on the current model
      // Eg: Foo {bar: Bar}, model here is Foo and key is bar
      const depth = getRecursiveValue(recursiveDepthMap, model, key);
      const count = getRecursiveValue(recursiveCountMap, model, key) || 0;
      // if no depth, just instantiate with new keyword without recursive
      if (depth === 0) {
        setMutate(instance, key, {});
        continue;
      }
      // if depth equals count, meaning instantiate has run enough loop.
      // reset the count then assign with new keyword
      if (depth === count) {
        if (root || !selfReference) {
          setRecursiveValue(recursiveCountMap, model, key, 0);
        }
        setMutate(instance, key, {});
        continue;
      }
      // increment the count and recursively call instantiate
      setRecursiveValue(recursiveCountMap, model, key, count + 1);
      const childMetadataObjectMap = metadataObjectMap.get(metaResult);
      const childMetadata = childMetadataObjectMap?.[as] || applyMetadata(metaResult, as, false, metaResult === model);
      setMutate(instance, key, childMetadata);
    }
    // after all, resetAllCount on the current model
    if (root || !selfReference) {
      recursiveCountMap.get(model)?.clear();
    }
    return instance;
  }
  return applyMetadata;
}

const defaultStrategyInitializerOptions = {
  applyMetadata: defaultApplyMetadata,
  preMap(source) {
    return source;
  },
  postMap(_, destination) {
    return destination;
  }
};

function isDefined(value, strict = false) {
  return strict ? value !== undefined : value != null;
}

function storeMetadata(mapper, model, metadataList) {
  if (!isDefined(metadataList)) return;
  const metadataMap = getMetadataMap(mapper);
  if (metadataMap.has(model)) return;
  for (const [propertyKey, {
    isGetterOnly,
    type,
    depth,
    isArray
  }] of metadataList) {
    metadataMap.set(model, [...(metadataMap.get(model) || []), [[propertyKey], type, isArray, isGetterOnly]]);
    if (depth != null) {
      setRecursiveValue(getRecursiveDepth(mapper), model, [propertyKey], depth);
    }
  }
}

function mapInitialize(sourcePath) {
  return [6 /* TransformationType.MapInitialize */, source => get(source, sourcePath)];
}

function getPath(path, [sourceNamingConvention, destinationNamingConvention]) {
  const keyParts = path.map(s => s.split(destinationNamingConvention.splittingExpression).filter(Boolean)).filter(p => p.length > 0);
  return !keyParts.length ? path : keyParts.map(p => sourceNamingConvention.transformPropertyName(p));
}
function getFlatteningPaths(src, srcPath, namingConventions) {
  const [sourceNamingConvention] = namingConventions;
  const splitSourcePaths = [].concat(...srcPath.map(s => s.split(sourceNamingConvention.splittingExpression).filter(Boolean)));
  const [first, ...paths] = splitSourcePaths.slice(0, splitSourcePaths.length - 1);
  let trueFirstPartOfSource = first;
  let stopIndex = 0;
  let found = hasProperty(src, trueFirstPartOfSource);
  if (!found) {
    for (let i = 0, len = paths.length; i < len; i++) {
      trueFirstPartOfSource = sourceNamingConvention.transformPropertyName([trueFirstPartOfSource, paths[i]]);
      if (hasProperty(src, trueFirstPartOfSource)) {
        stopIndex = i + 1;
        found = true;
        break;
      }
    }
  }
  if (!found) {
    return srcPath;
  }
  const restPaths = splitSourcePaths.slice(stopIndex + 1, splitSourcePaths.length + 1);
  const transformedRestPaths = sourceNamingConvention.transformPropertyName(restPaths);
  if (restPaths.length > 1 && !hasProperty(src[trueFirstPartOfSource], transformedRestPaths) && hasProperty(src[trueFirstPartOfSource], sourceNamingConvention.transformPropertyName([restPaths[0]]))) {
    // still has more flattening to do: eg: bookAuthorName -> ['Author', 'Name']
    // transformedRestPaths (authorName) does not exist on source
    // first of rest paths (author) does exist on source
    return [trueFirstPartOfSource, ...getFlatteningPaths(src[trueFirstPartOfSource], getPath([transformedRestPaths], namingConventions), namingConventions)];
  }
  return [trueFirstPartOfSource, sourceNamingConvention.transformPropertyName(splitSourcePaths.slice(stopIndex + 1, splitSourcePaths.length + 1))];
}
function hasProperty(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property);
}

function isSamePath(target, value) {
  if (target.length !== value.length) {
    return false;
  }
  for (let i = 0, targetLen = target.length; i < targetLen; i++) {
    if (target[i] !== value[i]) {
      return false;
    }
  }
  return true;
}

function uniquePaths(paths) {
  const result = [];
  for (let i = 0, pathsLen = paths.length; i < pathsLen; i++) {
    const value = paths[i];
    if (!result.some(item => isSamePath(item, value))) {
      result.push(value);
    }
  }
  return result;
}

const EXCLUDE_KEYS = ['constructor', '__defineGetter__', '__defineSetter__', 'hasOwnProperty', '__lookupGetter__', '__lookupSetter__', 'isPrototypeOf', 'propertyIsEnumerable', 'toString', 'valueOf', '__proto__', 'toLocaleString'];
function getPathRecursive(node, prefix = [], previous = []) {
  const result = previous;
  let hasChildPaths = false;
  const keys = Array.from(new Set([...Object.getOwnPropertyNames(node)].filter(key => !EXCLUDE_KEYS.includes(key))));
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    const path = [...prefix, key];
    const child = node[key];
    if (typeof child === 'function') {
      continue;
    }
    result.push(path);
    if (typeof child === 'object') {
      const queue = Array.isArray(child) ? child : [child];
      for (const childNode of queue) {
        const childPaths = getPathRecursive(childNode, path);
        if (childPaths) {
          hasChildPaths = true;
          result.push(...childPaths);
        }
      }
    }
  }
  if (hasChildPaths) {
    return uniquePaths(result);
  }
  return result;
}

function createInitialMapping(mapper, source, destination, configurations = []) {
  const strategy = getStrategy(mapper);
  const applyMetadataFn = strategy.applyMetadata.bind(strategy);
  const destinationConstructor = strategy.destinationConstructor.bind(strategy);
  const metadataObjectMap = getMetadataObjectMap(mapper);
  const sourceMetadataObjectMap = metadataObjectMap.get(source);
  const destinationMetadataObjectMap = metadataObjectMap.get(destination);
  const destinationObject = destinationMetadataObjectMap?.[1 /* MetadataObjectMapClassId.asDestination */] || applyMetadataFn(destination, 1 /* MetadataObjectMapClassId.asDestination */);
  if (destinationMetadataObjectMap) {
    destinationMetadataObjectMap[1 /* MetadataObjectMapClassId.asDestination */] = destinationObject;
  } else {
    metadataObjectMap.set(destination, [undefined, destinationObject]);
  }
  const sourceObject = sourceMetadataObjectMap?.[0 /* MetadataObjectMapClassId.asSource */] || applyMetadataFn(source, 0 /* MetadataObjectMapClassId.asSource */);
  if (sourceMetadataObjectMap) {
    sourceMetadataObjectMap[0 /* MetadataObjectMapClassId.asSource */] = sourceObject;
  } else {
    metadataObjectMap.set(source, [sourceObject]);
  }
  const mapping = [[source, destination], [sourceObject, destinationObject], [], [], mapper, destinationConstructor];
  // try to inherit naming conventions from mapper
  mapping[8 /* MappingClassId.namingConventions */] = getNamingConventions(mapper);
  // run configuration fn on mapping
  for (let i = 0, length = configurations.length; i < length; i++) {
    configurations[i](mapping);
  }
  const destinationPaths = getPathRecursive(destinationObject);
  const mappingProperties = mapping[2 /* MappingClassId.properties */];
  const customMappingProperties = mapping[3 /* MappingClassId.customProperties */];
  const hasCustomMappingProperties = customMappingProperties.length > 0;
  const namingConventions = mapping[8 /* MappingClassId.namingConventions */];
  const {
    processSourcePath,
    getMetadataAtMember,
    getNestedMappingPair
  } = createMappingUtil(mapper, source, destination);
  for (let i = 0, length = destinationPaths.length; i < length; i++) {
    const destinationPath = destinationPaths[i];
    // is a forMember (custom mapping configuration) already exists
    // for this destination path, skip it
    if (hasCustomMappingProperties && customMappingProperties.some(property => isPrimitiveArrayEqual(property[0 /* MappingPropertiesClassId.path */], destinationPath))) {
      continue;
    }
    // try getting the sourcePath that is associated with this destinationPath
    /**
     * with naming conventions: fooBar -> [foo, bar]
     * without naming conventions: fooBar -> fooBar
     */
    const sourcePath = processSourcePath(sourceObject, namingConventions, destinationPath);
    // sourcePath is not in sourceObject. No AutoMap available
    if (!(sourcePath[0] in sourceObject)) {
      continue;
    }
    const metadataAtDestination = getMetadataAtMember(destinationPath, 'destination');
    const metadataAtSource = getMetadataAtMember(sourcePath, 'source');
    if (!metadataAtSource && !metadataAtDestination) continue;
    const nestedMappingPair = getNestedMappingPair(metadataAtSource, metadataAtDestination);
    const transformation = [mapInitialize(sourcePath)];
    if (nestedMappingPair) {
      let typeConverter;
      const isSourceArray = metadataAtSource[2 /* MetadataClassId.isArray */];
      const isDestinationArray = metadataAtDestination[2 /* MetadataClassId.isArray */];
      const mappingTypeConverters = mapping[6 /* MappingClassId.typeConverters */];
      if (mappingTypeConverters) {
        const [sourceConverters, arraySourceConverters] = mappingTypeConverters.get(nestedMappingPair[1 /* NestedMappingPairClassId.source */]) || [];
        const [destinationConverter, arrayDestinationConverter] = (isSourceArray ? arraySourceConverters?.get(nestedMappingPair[0 /* NestedMappingPairClassId.destination */]) : sourceConverters?.get(nestedMappingPair[0 /* NestedMappingPairClassId.destination */])) || [];
        typeConverter = isDestinationArray ? arrayDestinationConverter : destinationConverter;
      }
      if (typeConverter) {
        const originalMapInitializeFn = transformation[0 /* MappingTransformationClassId.memberMapFn */][1 /* MapFnClassId.fn */];
        transformation[0 /* MappingTransformationClassId.memberMapFn */][1 /* MapFnClassId.fn */] = srcObj => typeConverter(originalMapInitializeFn(srcObj));
        transformation[0 /* MappingTransformationClassId.memberMapFn */][2 /* MapFnClassId.isConverted */] = true;
      }
    }
    mappingProperties.push([destinationPath, [destinationPath, transformation], nestedMappingPair]);
  }
  // consolidate mapping properties
  for (const customMappingProperty of customMappingProperties) {
    mappingProperties.push(customMappingProperty);
  }
  return mapping;
}
function createMappingUtil(mapper, sourceIdentifier, destinationIdentifier) {
  const metadataMap = getMetadataMap(mapper);
  const destinationMetadata = metadataMap.get(destinationIdentifier) || [];
  const sourceMetadata = metadataMap.get(sourceIdentifier) || [];
  return {
    getMetadataAtMember: (memberPath, type) => (type === 'source' ? sourceMetadata : destinationMetadata).find(m => isPrimitiveArrayEqual(m[0 /* MetadataClassId.propertyKeys */], memberPath)),
    processSourcePath: (sourceObject, namingConventions, memberPath) => {
      let sourcePath = memberPath;
      if (namingConventions) {
        sourcePath = getFlatteningPaths(sourceObject, getPath(memberPath, namingConventions), namingConventions);
      }
      return sourcePath;
    },
    getNestedMappingPair: (metadataAtSource, metadataAtDestination) => {
      if (metadataAtSource && metadataAtDestination) {
        return [metadataAtDestination[1 /* MetadataClassId.metaFn */](), metadataAtSource[1 /* MetadataClassId.metaFn */]()];
      }

      return undefined;
    }
  };
}

function createMap(mapper, source, ...mappingConfigFnsOrIdentifier) {
  // turn string into symbol for identifier
  const sourceIdentifier = typeof source === 'string' ? Symbol.for(source) : source;
  let destinationIdentifier = sourceIdentifier;
  const [destination, ...mappingConfigFns] = mappingConfigFnsOrIdentifier || [];
  if (destination) {
    if (typeof destination === 'string') {
      destinationIdentifier = Symbol.for(destination);
    } else if (typeof destination === 'function' && destination.prototype !== undefined) {
      destinationIdentifier = destination;
    } else {
      (mappingConfigFns || []).push(destination);
    }
  }
  const mappings = getMappings(mapper);
  let mapping = mappings.get(sourceIdentifier)?.get(destinationIdentifier);
  if (mapping) {
    getErrorHandler(mapper).handle(`Mapping for source ${String(source)} and destination ${String(destination)} already exists`);
    return mapping;
  }
  // get the strategy from Mapper to retrieve the metadata
  const strategy = getStrategy(mapper);
  const strategyMetadataMap = strategy.retrieveMetadata(sourceIdentifier, destinationIdentifier);
  strategyMetadataMap.forEach((metadataList, identifier) => {
    storeMetadata(mapper, identifier, metadataList);
  });
  // after all the mapping configurations are consolidated,
  // initialize the mapping
  mapping = createInitialMapping(mapper, sourceIdentifier, destinationIdentifier, (mappingConfigFns || []).concat(...getProfileConfigurationContext(mapper).values()).filter(configFn => configFn != undefined));
  // store the mapping
  if (!mappings.has(sourceIdentifier)) {
    mappings.set(sourceIdentifier, new Map([[destinationIdentifier, mapping]]));
  } else {
    mappings.get(sourceIdentifier).set(destinationIdentifier, mapping);
  }
  // return the mapping
  return mapping;
}

function addProfile(mapper, profile, ...mappingConfigurations) {
  mappingConfigurations.forEach(mappingConfiguration => {
    getProfileConfigurationContext(mapper).add(mappingConfiguration);
  });
  profile.apply({
    profileName: profile.name
  }, [mapper]);
  getProfileConfigurationContext(mapper).clear();
}

const PROXY_TARGET = () => undefined;
const PROXY_OBJECT = createProxy(PROXY_TARGET);
/**
 * For a given JS function selector, return a list of all members that were selected.
 *
 * @returns `null` if the given `fnSelector` doesn't match with anything.
 */
function getMembers(fnSelector) {
  const resultProxy = fnSelector(PROXY_OBJECT);
  if (typeof resultProxy !== 'function') {
    return null;
  }
  const members = resultProxy();
  if (members.length === 0 || members.some(m => typeof m !== 'string')) {
    return null;
  }
  return members;
}
/**
 * Get a dot-separated string of the properties selected by a given `fn` selector
 * function.
 *
 * @example
 * ```js
 * getMemberPath(s => s.foo.bar) === 'foo.bar'
 * getMemberPath(s => s['foo']) === 'foo'
 * getMemberPath(s => s.foo['']) === 'foo.'
 * // invalid usage
 * getMemberPath(s => s) === ''
 * ```
 */
function getMemberPath(fn) {
  const members = getMembers(fn);
  return members ? members : [];
}
/**
 * @returns {Proxy} A proxy that's wrap on the target object and track of
 * the path of accessed nested properties
 */
function createProxy(target, path = []) {
  const realTraps = {
    get(_, p) {
      const childPath = path.slice();
      childPath.push(p);
      return createProxy(PROXY_TARGET, childPath);
    },
    apply() {
      return path;
    }
  };
  return new Proxy(target, realTraps);
}

function forMember(selector, ...fns) {
  let [preCondOrMapMemberFn, mapMemberFn] = fns;
  const memberPath = getMemberPath(selector);
  // reassign mapMemberFn and preCond
  if (mapMemberFn == null) {
    mapMemberFn = preCondOrMapMemberFn;
    preCondOrMapMemberFn = undefined;
  }
  const mappingProperty = [memberPath, [mapMemberFn, preCondOrMapMemberFn]];
  return mapping => {
    const [sourceIdentifier, destinationIdentifier] = mapping[0 /* MappingClassId.identifiers */];
    const mapper = mapping[4 /* MappingClassId.mapper */];
    const namingConventions = mapping[8 /* MappingClassId.namingConventions */];
    const [sourceObject] = mapping[1 /* MappingClassId.identifierMetadata */];
    const {
      getNestedMappingPair,
      getMetadataAtMember,
      processSourcePath
    } = createMappingUtil(mapper, sourceIdentifier, destinationIdentifier);
    const sourcePath = processSourcePath(sourceObject, namingConventions, memberPath);
    // sourcePath is not in sourceObject. No AutoMap available
    if (!(sourcePath[0] in sourceObject)) {
      mapping[3 /* MappingClassId.customProperties */].push([memberPath, mappingProperty, undefined]);
      return;
    }
    const metadataAtMember = getMetadataAtMember(memberPath, 'destination');
    const metadataAtSource = getMetadataAtMember(sourcePath, 'source');
    const nestedMappingPair = getNestedMappingPair(metadataAtSource, metadataAtMember);
    mapping[3 /* MappingClassId.customProperties */].push([memberPath, mappingProperty, nestedMappingPair]);
  };
}

function forSelf(sourceOrMapping, selector) {
  let selfMapping = Array.isArray(sourceOrMapping) ? sourceOrMapping : undefined;
  return mapping => {
    if (selfMapping == null) {
      const [, destinationIdentifier] = mapping[0 /* MappingClassId.identifiers */];
      const mapper = mapping[4 /* MappingClassId.mapper */];
      const strategy = getStrategy(mapper);
      // turn string into symbol for identifier
      const sourceIdentifier = typeof sourceOrMapping === 'string' ? Symbol.for(sourceOrMapping) : sourceOrMapping;
      const strategyMetadataMap = strategy.retrieveMetadata(sourceIdentifier);
      strategyMetadataMap.forEach((metadataList, identifier) => {
        storeMetadata(mapper, identifier, metadataList);
      });
      selfMapping = createInitialMapping(mapper, sourceIdentifier, destinationIdentifier);
    }
    const selfMapProperties = selfMapping[2 /* MappingClassId.properties */];
    for (let i = 0, length = selfMapProperties.length; i < length; i++) {
      const mapProperty = selfMapProperties[i];
      if (mapping[2 /* MappingClassId.properties */].some(property => isPrimitiveArrayEqual(property[0 /* MappingPropertiesClassId.path */], mapProperty[0 /* MappingPropertiesClassId.path */]))) {
        continue;
      }
      const transformation = mapProperty[1 /* MappingPropertiesClassId.mappingProperty */][1 /* MappingPropertyClassId.transformation */];
      transformation[0 /* MappingTransformationClassId.memberMapFn */][1 /* MapFnClassId.fn */] = sourceObj => get(selector(sourceObj), mapProperty[0 /* MappingPropertiesClassId.path */]);
      mapping[2 /* MappingClassId.properties */].push([mapProperty[0 /* MappingPropertiesClassId.path */], [mapProperty[0 /* MappingPropertiesClassId.path */], transformation], mapProperty[2 /* MappingPropertiesClassId.nestedMappingPair */]]);
    }
  };
}

function toSelector(input) {
  if ('convert' in input) return input.convert.bind(input);
  return input;
}

function typeConverter(source, destination, converterOrValueSelector) {
  return mapping => {
    const isSourceArray = Array.isArray(source);
    const isDestinationArray = Array.isArray(destination);
    const sourceIdentifier = isSourceArray ? source[0] : source;
    const destinationIdentifier = isDestinationArray ? destination[0] : destination;
    const selector = toSelector(converterOrValueSelector);
    const typeConverters = mapping[6 /* MappingClassId.typeConverters */] || (mapping[6 /* MappingClassId.typeConverters */] = new Map());
    let sourceConverters;
    const [sourceTypeConverters, arraySourceTypeConverters] = typeConverters.get(sourceIdentifier) || [];
    if (sourceTypeConverters || arraySourceTypeConverters) {
      sourceConverters = isSourceArray ? arraySourceTypeConverters : sourceTypeConverters;
      const [destinationConverter, arrayDestinationConverter] = sourceConverters.get(destinationIdentifier) || [];
      sourceConverters.set(destinationIdentifier, isDestinationArray ? [destinationConverter, selector] : [selector, arrayDestinationConverter]);
      return;
    }
    sourceConverters = new Map([[destinationIdentifier, isDestinationArray ? [undefined, selector] : [selector, undefined]]]);
    typeConverters.set(sourceIdentifier, isSourceArray ? [new Map(), sourceConverters] : [sourceConverters, new Map()]);
  };
}

const constructUsing = destinationConstructor => {
  return mapping => {
    mapping[5 /* MappingClassId.destinationConstructor */] = destinationConstructor;
  };
};

function beforeMap(cb) {
  return mapping => {
    if (mapping[7 /* MappingClassId.callbacks */] == null) {
      mapping[7 /* MappingClassId.callbacks */] = [];
    }
    mapping[7 /* MappingClassId.callbacks */][0 /* MappingCallbacksClassId.beforeMap */] = cb;
  };
}

function afterMap(cb) {
  return mapping => {
    if (mapping[7 /* MappingClassId.callbacks */] == null) {
      mapping[7 /* MappingClassId.callbacks */] = [];
    }
    mapping[7 /* MappingClassId.callbacks */][1 /* MappingCallbacksClassId.afterMap */] = cb;
  };
}

function extend(sourceOrMapping, destination) {
  return mapping => {
    let mappingToExtend;
    if (Array.isArray(sourceOrMapping)) {
      mappingToExtend = sourceOrMapping;
    } else {
      const mapper = mapping[4 /* MappingClassId.mapper */];
      mappingToExtend = getMapping(mapper, sourceOrMapping, destination);
    }
    const propsToExtend = mappingToExtend[2 /* MappingClassId.properties */];
    for (let i = 0, length = propsToExtend.length; i < length; i++) {
      const [propToExtendKey, propToExtendMappingProp, propToExtendNestedMapping] = propsToExtend[i];
      const existProp = mapping[3 /* MappingClassId.customProperties */].find(([pKey]) => isSamePath(pKey, propToExtendKey));
      if (existProp) continue;
      mapping[3 /* MappingClassId.customProperties */].push([propToExtendKey, propToExtendMappingProp, propToExtendNestedMapping]);
    }
  };
}

const namingConventions = namingConventionsInput => {
  return mapping => {
    mapping[8 /* MappingClassId.namingConventions */] = normalizeNamingConventions(namingConventionsInput);
  };
};

function isResolver(fn) {
  return 'resolve' in fn;
}

function mapFrom(from) {
  if (isResolver(from)) {
    return [1 /* TransformationType.MapFrom */, from.resolve.bind(from)];
  }
  return [1 /* TransformationType.MapFrom */, from];
}

function autoMap(prop) {
  return forMember(dest => dest[prop], mapFrom(src => src[prop]));
}

function mapWith(withDestination, withSource, withSourceValue) {
  return [4 /* TransformationType.MapWith */, (source, mapper, options) => {
    const sourceValue = withSourceValue(source);
    if (Array.isArray(sourceValue)) {
      return mapper.mapArray(sourceValue, withSource, withDestination, options);
    }
    return mapper.map(sourceValue, withSource, withDestination, options);
  }];
}

function convertUsing(converter, selector) {
  return [5 /* TransformationType.ConvertUsing */, source => converter.convert(selector(source))];
}

function ignore() {
  return [0 /* TransformationType.Ignore */];
}

function nullSubstitution(substitution) {
  return [7 /* TransformationType.NullSubstitution */, (source, sourceMemberPath) => {
    const sourceValue = get(source, sourceMemberPath);
    return sourceValue === null ? substitution : sourceValue;
  }];
}

function preCondition(predicate, defaultValue) {
  return [predicate, defaultValue];
}

function condition(predicate, defaultValue) {
  return [2 /* TransformationType.Condition */, (source, sourceMemberPaths) => {
    if (predicate(source)) {
      return get(source, sourceMemberPaths);
    }
    return defaultValue;
  }];
}

function fromValue(rawValue) {
  return [3 /* TransformationType.FromValue */, () => rawValue];
}

function mapWithArguments(withArgumentsResolver) {
  if (isResolver(withArgumentsResolver)) {
    return [9 /* TransformationType.MapWithArguments */, withArgumentsResolver.resolve.bind(withArgumentsResolver)];
  }
  return [9 /* TransformationType.MapWithArguments */, withArgumentsResolver];
}

function mapDefer(defer) {
  return [10 /* TransformationType.MapDefer */, defer];
}

function undefinedSubstitution(substitution) {
  return [8 /* TransformationType.UndefinedSubstitution */, (source, sourceMemberPath) => {
    const sourceValue = get(source, sourceMemberPath);
    return sourceValue === undefined ? substitution : sourceValue;
  }];
}

/**
 * CamelCaseNamingConvention
 *
 * @example thisIsCamelCase
 */
class CamelCaseNamingConvention {
  constructor() {
    this.separatorCharacter = '';
    this.splittingExpression = /(^[a-z]+(?=$|[A-Z][a-z0-9]+)|[A-Z]?[a-z0-9]+)/;
  }
  transformPropertyName(sourceNameParts) {
    let result = '';
    for (let i = 0, len = sourceNameParts.length; i < len; i++) {
      if (i === 0) {
        result += sourceNameParts[i].charAt(0).toLowerCase();
      } else {
        result += sourceNameParts[i].charAt(0).toUpperCase();
      }
      result += sourceNameParts[i].substring(1);
    }
    return result;
  }
}

/**
 * PascalCaseNamingConvention
 *
 * @example ThisIsPascalCase
 */
class PascalCaseNamingConvention {
  constructor() {
    this.separatorCharacter = '';
    this.splittingExpression = /(^[A-Z]+(?=$|[A-Z][a-z0-9]+)|[A-Z]?[a-z0-9]+)/;
  }
  transformPropertyName(sourceNameParts) {
    let result = '';
    for (let i = 0, len = sourceNameParts.length; i < len; i++) {
      result += sourceNameParts[i].charAt(0).toUpperCase() + sourceNameParts[i].substring(1);
    }
    return result;
  }
}

/**
 * SnakeCaseNamingConvention
 *
 * @example this_is_snake_case
 */
class SnakeCaseNamingConvention {
  constructor() {
    this.separatorCharacter = '_';
    this.splittingExpression = /_/;
  }
  transformPropertyName(sourcePropNameParts) {
    const len = sourcePropNameParts.length;
    if (len <= 1) {
      return sourcePropNameParts[0].toLowerCase() || '';
    }
    return sourcePropNameParts.map(p => p.toLowerCase()).join(this.separatorCharacter);
  }
}

exports.AutoMapperLogger = AutoMapperLogger;
exports.CamelCaseNamingConvention = CamelCaseNamingConvention;
exports.PascalCaseNamingConvention = PascalCaseNamingConvention;
exports.SnakeCaseNamingConvention = SnakeCaseNamingConvention;
exports.addProfile = addProfile;
exports.afterMap = afterMap;
exports.autoMap = autoMap;
exports.beforeMap = beforeMap;
exports.condition = condition;
exports.constructUsing = constructUsing;
exports.convertUsing = convertUsing;
exports.createMap = createMap;
exports.createMapper = createMapper;
exports.defaultStrategyInitializerOptions = defaultStrategyInitializerOptions;
exports.extend = extend;
exports.forMember = forMember;
exports.forSelf = forSelf;
exports.fromValue = fromValue;
exports.getRecursiveValue = getRecursiveValue;
exports.ignore = ignore;
exports.isDateConstructor = isDateConstructor;
exports.isEmpty = isEmpty;
exports.isPrimitiveConstructor = isPrimitiveConstructor;
exports.mapDefer = mapDefer;
exports.mapFrom = mapFrom;
exports.mapWith = mapWith;
exports.mapWithArguments = mapWithArguments;
exports.namingConventions = namingConventions;
exports.nullSubstitution = nullSubstitution;
exports.preCondition = preCondition;
exports.set = set;
exports.setMutate = setMutate;
exports.setRecursiveValue = setRecursiveValue;
exports.typeConverter = typeConverter;
exports.undefinedSubstitution = undefinedSubstitution;