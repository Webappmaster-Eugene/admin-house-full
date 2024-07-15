"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const user_business_value_schema_1 = require("../../models/user/user-business-value.schema");
const models_1 = require("../../models");
const user_related_entities_schema_1 = require("../../models/user/user-related-entities.schema");
const UserGetResponseEntitySchema = user_business_value_schema_1.UserBusinessValueSchema.merge(user_related_entities_schema_1.UserRelatedEntitiesSchema);
const UserGetResponseSchema = zod_1.z
    .object({
    data: UserGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var UserGetCommand;
(function (UserGetCommand) {
    UserGetCommand.BusinessValueSchema = user_business_value_schema_1.UserBusinessValueSchema;
    UserGetCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    UserGetCommand.ResponseSchema = UserGetResponseSchema;
    UserGetCommand.ResponseEntitySchema = UserGetResponseEntitySchema;
})(UserGetCommand || (exports.UserGetCommand = UserGetCommand = {}));
