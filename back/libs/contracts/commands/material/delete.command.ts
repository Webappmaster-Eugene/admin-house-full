import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { MaterialSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const MaterialDeleteResponseEntitySchema = MaterialSchema.pick({
  name: true,
  price: true,
  comment: true,
  namePublic: true,
  sourceInfo: true,
  unitMeasurementUuid: true,
  responsiblePartnerUuid: true,
  categoryUuid: true,
  handbookUuid: true,
  lastChangeByUserUuid: true,
  uuid: true,
});

const MaterialDeleteResponseSchema = z
  .object({
    data: MaterialDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace MaterialDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = MaterialDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = MaterialDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
