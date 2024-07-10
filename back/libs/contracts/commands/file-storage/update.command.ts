import { z } from 'zod';
import { ResponseClientSchema, FileStorageSchema, FileStorageBusinessValueSchema } from '../../models';

const FileStorageUpdateResponseEntitySchema = FileStorageBusinessValueSchema;

const FileStorageUpdateRequestSchema = FileStorageSchema.pick({
  comment: true,
}).partial();

const FileStorageUpdateResponseSchema = z
  .object({
    data: FileStorageUpdateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FileStorageUpdateCommand {
  export const RequestSchema = FileStorageUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FileStorageUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FileStorageUpdateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
