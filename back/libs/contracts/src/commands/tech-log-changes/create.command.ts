import { z } from 'zod';
import { ResponseClientSchema, TechLogChangesSchema } from '../../models';
import { TechLogChangesBusinessValueSchema } from '../../models/tech-log-changes/tech-log-changes-business-value.schema';

const TechLogChangesCreateResponseEntitySchema = TechLogChangesBusinessValueSchema;

const TechLogChangesCreateRequestSchema = TechLogChangesSchema.pick({
  updateInfo: true,
  action: true,
  oldInfo: true,
  newInfo: true,
  name: true,
  comment: true,
});

const TechLogChangesCreateResponseSchema = z
  .object({
    data: TechLogChangesCreateResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace TechLogChangesCreateCommand {
  export const RequestSchema = TechLogChangesCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = TechLogChangesCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = TechLogChangesCreateResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
