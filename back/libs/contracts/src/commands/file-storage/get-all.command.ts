import { z } from 'zod';
import { RequestGetAllQuerySchema, ResponseClientSchema } from '../../models';
import { FileStorageBusinessValueSchema } from '../../models/file-storage/file-storage-business-value.schema';

const FileStorageGetAllResponseEntitySchema = z.array(FileStorageBusinessValueSchema);

const FileStorageGetAllResponseSchema = z
  .object({
    data: FileStorageGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FileStorageGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FileStorageGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FileStorageGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
