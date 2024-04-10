import { z } from 'zod';
import { HandbookSchema } from '../../models';

const HandbookUpdateRequestSchema = HandbookSchema.omit({
  createdAt: true,
  updatedAt: true,
  uuid: true,
  workspaceHandbookUuid: true,
  responsibleManagerUuid: true,
  workspaceUuid: true,
}).partial();

const HandbookUpdateResponseSchema = HandbookSchema.pick({ uuid: true });

export namespace HandbookUpdateCommand {
  export const RequestSchema = HandbookUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = HandbookUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
