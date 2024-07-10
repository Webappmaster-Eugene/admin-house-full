import { AbstractClassType } from '../../types/abstract.class';

export function toEntityArray<EntityType>(arrayFromDB: Array<EntityType>, ClassEntity: AbstractClassType): EntityType[] {
  return arrayFromDB.map((elem, index) => {
    return new ClassEntity(elem);
  });
}
