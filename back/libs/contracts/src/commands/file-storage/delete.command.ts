import { z } from 'zod';
import { FileStorageBusinessValueSchema } from '../../models/file-storage/file-storage-business-value.schema';
import { ResponseClientSchema } from '../../models';
import { EntityUrlParamCommand } from '../../commands/common';

const FileStorageDeleteResponseEntitySchema = FileStorageBusinessValueSchema;

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
