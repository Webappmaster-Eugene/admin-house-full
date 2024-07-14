import { z } from 'zod';
import { FileStorageBusinessValueSchema } from '../../models/file-storage/file-storage-business-value.schema';
import { FileStorageSchema, ResponseClientSchema } from '../../models';

const FileStorageUpdateResponseEntitySchema = FileStorageBusinessValueSchema;

const FileStorageUpdateRequestSchema = FileStorageSchema.pick({
  comment: true,
}).partial();

const FileStorageUpdateResponseSchema = z
  .object({
    data: FileStorageUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FileStorageUpdateCommand {
  export const RequestSchema = FileStorageUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FileStorageUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FileStorageUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
