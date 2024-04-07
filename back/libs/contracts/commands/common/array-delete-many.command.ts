import { z } from 'zod';

const ArrayIdRequestSchema = z.array(z.string().uuid());

export namespace ArrayIdRequestCommand {
  export const RequestParamSchema = ArrayIdRequestSchema;
  export type RequestParam = z.infer<typeof RequestParamSchema>;
}
