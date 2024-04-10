import { z } from 'zod';
import { HandbookSchema } from '../../models';

const HandbookGetAllResponseSchema = z.array(HandbookSchema);

export namespace HandbookGetAllCommand {
  export const ResponseSchema = HandbookGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;
}
