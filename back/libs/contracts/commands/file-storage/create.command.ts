import { z } from 'zod';
import { ResponseClientSchema, FileStorageSchema, FileStorageBusinessValueSchema } from '../../models';

const FileStorageCreateResponseEntitySchema = FileStorageBusinessValueSchema;

const FileStorageCreateRequestSchema = FileStorageSchema.pick({
  nameFile: true,
  link: true,
  comment: true,
});

const FileStorageCreateResponseSchema = z
  .object({
    data: FileStorageCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema.strict());

export namespace FileStorageCreateCommand {
  export const RequestSchema = FileStorageCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = FileStorageCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = FileStorageCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
