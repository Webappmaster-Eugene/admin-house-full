import { getMetadataList, AUTOMAP_PROPERTIES_METADATA_KEY } from 'automapper/classes';
import { AutoMapperLogger } from 'automapper/core';

function inheritAutoMapMetadata(
  parentClass,
  // eslint-disable-next-line @typescript-eslint/ban-types
  targetClass,
  isPropertyInherited = () => true,
) {
  try {
    const [parentClassMetadataList] = getMetadataList(parentClass);
    if (!parentClassMetadataList.length) {
      return;
    }
    const [existingMetadataList] = getMetadataList(targetClass);
    Reflect.defineMetadata(
      AUTOMAP_PROPERTIES_METADATA_KEY,
      [...existingMetadataList, ...parentClassMetadataList.filter(([propertyKey]) => isPropertyInherited(propertyKey))],
      targetClass,
    );
  } catch (e) {
    if (AutoMapperLogger.error) {
      AutoMapperLogger.error(`Error trying to inherit metadata: ${e}`);
    }
  }
}
function inheritPropertyInitializers(target, sourceClass, isPropertyInherited = () => true) {
  try {
    const tempInstance = new sourceClass();
    const propertyNames = Object.getOwnPropertyNames(tempInstance);
    propertyNames
      .filter(propertyName => typeof tempInstance[propertyName] !== 'undefined' && typeof target[propertyName] === 'undefined')
      .filter(propertyName => isPropertyInherited(propertyName))
      .forEach(propertyName => {
        target[propertyName] = tempInstance[propertyName];
      });
  } catch (e) {
    if (AutoMapperLogger.error) {
      AutoMapperLogger.error(`Error inheriting properties: ${e}`);
    }
  }
}

function MapperPickType(classRef, keys) {
  const isInheritedPredicate = propertyKey => keys.includes(propertyKey);
  class PickClassType {
    constructor() {
      inheritPropertyInitializers(this, classRef, isInheritedPredicate);
    }
  }
  inheritAutoMapMetadata(classRef, PickClassType, isInheritedPredicate);
  return PickClassType;
}

function MapperOmitType(classRef, keys) {
  const isInheritedPredicate = propertyKey => !keys.includes(propertyKey);
  class OmitClassType {
    constructor() {
      inheritPropertyInitializers(this, classRef, isInheritedPredicate);
    }
  }
  inheritAutoMapMetadata(classRef, OmitClassType, isInheritedPredicate);
  return OmitClassType;
}

function MapperIntersectionType(classARef, classBRef) {
  class IntersectionClassType {
    constructor() {
      inheritPropertyInitializers(this, classARef);
      inheritPropertyInitializers(this, classBRef);
    }
  }
  inheritAutoMapMetadata(classARef, IntersectionClassType);
  inheritAutoMapMetadata(classBRef, IntersectionClassType);
  return IntersectionClassType;
}

export { MapperIntersectionType, MapperOmitType, MapperPickType };