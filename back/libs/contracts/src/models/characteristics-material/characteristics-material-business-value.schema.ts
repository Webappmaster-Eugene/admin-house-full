import { CharacteristicsMaterialSchema } from './characteristics-material.schema';

export const CharacteristicsMaterialBusinessValueSchema = CharacteristicsMaterialSchema.pick({
  uuid: true,
  value: true,
  name: true,
  comment: true,
  fieldOfCategoryMaterialUuid: true,
  fieldUnitMeasurementUuid: true,
  fieldTypeUuid: true,
  handbookUuid: true,
  materialUuid: true,
  lastChangeByUserUuid: true,
});
