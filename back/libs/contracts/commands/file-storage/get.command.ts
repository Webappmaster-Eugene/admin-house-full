import { z } from 'zod';
import { ResponseClientSchema, FileStorageSchema, FileStorageBusinessValueSchema } from '../../models';

const FileStorageGetResponseEntitySchema = FileStorageBusinessValueSchema;

const FileStorageGetResponseSchema = z
  .object({
    data: FileStorageGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FileStorageGetCommand {
  export const ResponseSchema = FileStorageGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FileStorageGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
