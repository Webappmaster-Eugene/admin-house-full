import { z } from 'zod';
import { ProjectSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ProjectGetResponseEntitySchema = ProjectSchema.pick({
  name: true,
  description: true,
  customerMail: true,
  customerUuid: true,
  createdAt: true,
  updatedAt: true,
  uuid: true,
  responsibleManagerUuid: true,
  organizationUuid: true,
  lastChangeByUserUuid: true,
});

const ProjectSchemaGetRequestSchema = ProjectSchema.pick({
  uuid: true,
});

const ProjectSchemaGetResponseSchema = z
  .object({
    data: ProjectGetResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ProjectGetCommand {
  export const RequestSchema = ProjectSchemaGetRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectSchemaGetResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ProjectGetResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
