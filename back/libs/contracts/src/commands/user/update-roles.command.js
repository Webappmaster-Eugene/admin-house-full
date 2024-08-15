"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateRolesCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const user_related_entities_schema_1 = require("../../models/user/user-related-entities.schema");
const user_business_value_schema_1 = require("../../models/user/user-business-value.schema");
const UserUpdateResponseEntitySchema = user_business_value_schema_1.UserBusinessValueSchema.merge(user_related_entities_schema_1.UserRelatedEntitiesSchema);
const UserUpdateRequestSchema = zod_1.z.object({ roles: zod_1.z.array(zod_1.z.number()).nullable().optional() });
const UserUpdateResponseSchema = zod_1.z
    .object({
    data: UserUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var UserUpdateRolesCommand;
(function (UserUpdateRolesCommand) {
    UserUpdateRolesCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    UserUpdateRolesCommand.RequestSchema = UserUpdateRequestSchema;
    UserUpdateRolesCommand.ResponseSchema = UserUpdateResponseSchema;
    UserUpdateRolesCommand.ResponseEntitySchema = UserUpdateResponseEntitySchema;
})(UserUpdateRolesCommand || (exports.UserUpdateRolesCommand = UserUpdateRolesCommand = {}));
