import { z } from 'zod';
import { ProjectSchema } from '../../models';
import { ResponseClientSchema } from '../../models';

const ProjectCreateRequestSchema = ProjectSchema.pick({
  name: true,
  description: true,
  customerMail: true,
  customerUuid: true,
});

const ProjectCreateResponseSchema = z
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

export namespace ProjectCreateCommand {
  export const RequestSchema = ProjectCreateRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = ProjectCreateResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;
}
