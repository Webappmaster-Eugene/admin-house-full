import { z } from 'zod';
import { FileStorageBusinessValueSchema, RequestGetAllQuerySchema, StatusResourceSchema } from '../../models';
import { ResponseClientSchema, FileStorageSchema } from '../../models';

const FileStorageGetAllResponseEntitySchema = z.array(FileStorageBusinessValueSchema);

const FileStorageGetAllResponseSchema = z
  .object({
    data: FileStorageGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FileStorageGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FileStorageGetAllResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FileStorageGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
