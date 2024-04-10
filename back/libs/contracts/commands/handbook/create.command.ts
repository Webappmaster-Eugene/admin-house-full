import { z } from 'zod';
import { HandbookSchema } from '../../models';

const HandbookCreateRequestSchema = HandbookSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
  workspaceHandbookUuid: true,
  responsibleManagerUuid: true,
  workspaceUuid: true,
});

const HandbookCreateResponseSchema = HandbookSchema;

export namespace HandbookCreateCommand {
  export const RequestSchema = HandbookCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = HandbookCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
