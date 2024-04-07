import { z } from 'zod';

const EntityIdRequestParamSchema = z.string();

const EntityNumberIdRequestParamSchema = z.number();

export namespace EntityUrlParamCommand {
  export const RequestParamSchema = EntityIdRequestParamSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;

  export const RequestParamNumberSchema = EntityNumberIdRequestParamSchema;
  export type RequestParamNumber = z.infer<typeof RequestParamNumberSchema>;
}
