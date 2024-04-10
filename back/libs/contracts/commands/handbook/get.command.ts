import { z } from 'zod';
import { HandbookSchema } from '../../models';

const HandbookGetRequestSchema = HandbookSchema.pick({
  uuid: true,
});

const HandbookGetResponseSchema = HandbookSchema;

export namespace HandbookGetCommand {
  export const RequestSchema = HandbookGetRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = HandbookGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
