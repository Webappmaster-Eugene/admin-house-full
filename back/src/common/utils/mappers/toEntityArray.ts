import { AbstractClassType } from '../../types/abstract.class';

export function toEntityArray<EntityType>(
  arrayFromDB: Array<unknown>,
  classEntity: AbstractClassType,
): EntityType[] {
  return arrayFromDB.map((elem, index) => {
    return new classEntity(elem);
  });
}
