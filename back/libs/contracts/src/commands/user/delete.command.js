"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const user_business_value_schema_1 = require("../../models/user/user-business-value.schema");
const user_related_entities_schema_1 = require("../../models/user/user-related-entities.schema");
const models_1 = require("../../models");
const UserDeleteResponseEntitySchema = user_business_value_schema_1.UserBusinessValueSchema.merge(user_related_entities_schema_1.UserRelatedEntitiesSchema);
const UserDeleteResponseSchema = zod_1.z
    .object({
    data: UserDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var UserDeleteCommand;
(function (UserDeleteCommand) {
    UserDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    UserDeleteCommand.ResponseSchema = UserDeleteResponseSchema;
    UserDeleteCommand.ResponseEntitySchema = UserDeleteResponseEntitySchema;
})(UserDeleteCommand || (exports.UserDeleteCommand = UserDeleteCommand = {}));
