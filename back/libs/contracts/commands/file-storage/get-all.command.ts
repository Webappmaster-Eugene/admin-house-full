import { z } from 'zod';
import { RequestGetAllQuerySchema, StatusResourceSchema } from '../../models';
import { ResponseClientSchema, FileStorageSchema } from '../../models';

const FileStorageGetAllResponseEntitySchema = z.array(
  FileStorageSchema.pick({
    nameFile: true,
    link: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
  }),
);

const FileStorageGetAllResponseSchema = z
  .object({
    data: FileStorageGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FileStorageGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = FileStorageGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FileStorageGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
