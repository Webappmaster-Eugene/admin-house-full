import { z } from 'zod';
import { FileStorageBusinessValueSchema } from '../../models/file-storage/file-storage-business-value.schema';
import { ResponseClientSchema } from '../../models';

const FileStorageGetResponseEntitySchema = FileStorageBusinessValueSchema;

const FileStorageGetResponseSchema = z
  .object({
    data: FileStorageGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FileStorageGetCommand {
  export const BusinessValueSchema = FileStorageBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const ResponseSchema = FileStorageGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FileStorageGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
