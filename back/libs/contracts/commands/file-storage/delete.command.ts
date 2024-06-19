import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema, FileStorageSchema } from '../../models';

const FileStorageDeleteResponseEntitySchema = FileStorageSchema.pick({
  nameFile: true,
  link: true,
  comment: true,
  uuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});

const FileStorageDeleteResponseSchema = z
  .object({
    data: FileStorageDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FileStorageDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FileStorageDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FileStorageDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
