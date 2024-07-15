import { z } from 'zod';
import { PasswordSchema, ResponseClientSchema, UserSchema } from '../../models';
import { LoginRelatedEntitiesSchema } from '../../models/auth/login/login-related-entities.schema';
import { AuthStrictKeyBusinessValueSchema } from '../../models/auth/auth-strict-key/auth.strict-key-business-value.schema';
import { LoginBusinessValueSchema } from '../../models/auth/login/login-business-value.schema';

const AuthLoginResponseEntitySchema = LoginBusinessValueSchema.merge(LoginRelatedEntitiesSchema);

const AuthLoginRequestSchema = UserSchema.pick({
  email: true,
}).merge(PasswordSchema);

const AuthLoginResponseSchema = z
  .object({
    data: AuthLoginResponseEntitySchema,
  })
  .merge(ResponseClientSchema);

export namespace AuthLoginCommand {
  export const BusinessValueSchema = LoginBusinessValueSchema;
  export type BusinessValue = z.infer<typeof BusinessValueSchema>;

  export const RequestSchema = AuthLoginRequestSchema;
  export type Request = z.infer<typeof RequestSchema>;

  export const ResponseSchema = AuthLoginResponseSchema;
  export type Response = z.infer<typeof ResponseSchema>;

  export const ResponseEntitySchema = AuthLoginResponseEntitySchema;
  export type ResponseEntity = z.infer<typeof ResponseEntitySchema>;
}
