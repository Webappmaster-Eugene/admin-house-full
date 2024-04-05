import { z } from 'zod';

const EntityIdRequestParamSchema = z.string();

export namespace EntityGetCommand {
  export const RequestParamSchema = EntityIdRequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;
}
