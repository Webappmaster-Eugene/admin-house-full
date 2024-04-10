import { z } from 'zod';

const EntityIdRequestParamSchema = z.string();

const EntityEmailRequestParamSchema = z.string().email();

const EntityNumberRequestParamSchema = z.number().nonnegative().finite();

export namespace EntityUrlParamCommand {
  export const RequestUuidParamSchema = EntityIdRequestParamSchema;
  export type RequestUuidParam = z.infer<typeof RequestUuidParamSchema>;

  export const RequestEmailParamSchema = EntityEmailRequestParamSchema;
  export type RequestEmailParam = z.infer<typeof RequestEmailParamSchema>;

  export const RequestNumberParamSchema = EntityNumberRequestParamSchema;
  export type RequestNumberParam = z.infer<typeof RequestNumberParamSchema>;
}
