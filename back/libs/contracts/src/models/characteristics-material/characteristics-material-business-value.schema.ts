import { CharacteristicsMaterialSchema } from './characteristics-material.schema';

export const CharacteristicsMaterialBusinessValueSchema = CharacteristicsMaterialSchema.pick({
  uuid: true,
  value: true,
  comment: true,
  numInOrder: true,
  characteristicsMaterialStatus: true,
  fieldOfCategoryMaterialUuid: true,
  handbookUuid: true,
  materialUuid: true,
  lastChangeByUserUuid: true,
});
