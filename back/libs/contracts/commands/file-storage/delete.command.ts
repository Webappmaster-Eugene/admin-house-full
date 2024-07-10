import { z } from 'zod';
import { EntityUrlParamCommand } from '../common/entity-url-param.command';
import { ResponseClientSchema, FileStorageSchema, FileStorageBusinessValueSchema } from '../../models';

const FileStorageDeleteResponseEntitySchema = FileStorageBusinessValueSchema;

const FileStorageDeleteResponseSchema = z
  .object({
    data: FileStorageDeleteResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FileStorageDeleteCommand {
  export const RequestParamSchema = EntityUrlParamCommand.RequestUuidParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const ResponseSchema = FileStorageDeleteResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FileStorageDeleteResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
