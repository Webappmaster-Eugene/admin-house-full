import { z } from 'zod';
import { ProjectSchema, RequestGetAllQuerySchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ProjectGetAllResponseEntitySchema = z.array(
  ProjectSchema.pick({
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
  }),
);

const ProjectGetAllResponseSchema = z
  .object({
    data: ProjectGetAllResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace ProjectGetAllCommand {
  export const RequestQuerySchema = RequestGetAllQuerySchema;
  export type RequestQuery = z.infer<typeof RequestQuerySchema>;

  export const ResponseSchema = ProjectGetAllResponseSchema;
  export type Request = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = ProjectGetAllResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
