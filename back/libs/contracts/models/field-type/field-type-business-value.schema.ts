import { FieldTypeSchema } from '../field-type';

export const FieldTypeBusinessValueSchema = FieldTypeSchema.pick({
  name: true,
  description: true,
  jsType: true,
  lastChangeByUserUuid: true,
  uuid: true,
});
