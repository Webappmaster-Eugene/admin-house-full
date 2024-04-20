import { z } from 'zod';
import { HandbookSchema } from '../../models';
import { ResponseClientSchema } from '../../models/response-client';

const HandbookCreateRequestSchema = HandbookSchema.omit({
  uuid: true,
  createdAt: true,
  updatedAt: true,
  workspaceHandbookUuid: true,
  responsibleManagerUuid: true,
  workspaceUuid: true,
});

const HandbookCreateResponseSchema = z
  .object({
    data: HandbookSchema.omit({
      createdAt: true,
      updatedAt: true,
    }),
  })
  .merge(ResponseClientSchema);

export namespace HandbookCreateCommand {
  export const RequestSchema = HandbookCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = HandbookCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
