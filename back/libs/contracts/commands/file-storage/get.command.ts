import { z } from 'zod';
import { ResponseClientSchema, FileStorageSchema } from '../../models';

const FileStorageGetResponseEntitySchema = FileStorageSchema.pick({
  nameFile: true,
  link: true,
  comment: true,
  uuid: true,
  lastChangeByUserUuid: true,
  createdAt: true,
  updatedAt: true,
});

const FileStorageGetResponseSchema = z
  .object({
    data: FileStorageGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace FileStorageGetCommand {
  export const ResponseSchema = FileStorageGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FileStorageGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
