import { z } from 'zod';
import { ProjectSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ProjectUpdateRequestSchema = ProjectSchema.pick({
  name: true,
  customerMail: true,
  customerUuid: true,
  description: true,
}).partial();

const ProjectUpdateResponseSchema = z
  .object({
    data: ProjectSchema.pick({
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
  })
  .merge(ResponseClientSchema);

export namespace ProjectUpdateCommand {
  export const RequestSchema = ProjectUpdateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectUpdateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
