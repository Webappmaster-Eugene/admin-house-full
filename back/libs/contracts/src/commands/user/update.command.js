"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const user_related_entities_schema_1 = require("../../models/user/user-related-entities.schema");
const user_business_value_schema_1 = require("../../models/user/user-business-value.schema");
const UserUpdateResponseEntitySchema = user_business_value_schema_1.UserBusinessValueSchema.merge(user_related_entities_schema_1.UserRelatedEntitiesSchema);
const UserUpdateRequestSchema = models_1.UserSchema.pick({
    avatar: true,
    info: true,
    address: true,
    secondName: true,
    documents: true,
    firstName: true,
    phone: true,
}).partial();
const UserUpdateResponseSchema = zod_1.z
    .object({
    data: UserUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var UserUpdateCommand;
(function (UserUpdateCommand) {
    UserUpdateCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    UserUpdateCommand.RequestSchema = UserUpdateRequestSchema;
    UserUpdateCommand.ResponseSchema = UserUpdateResponseSchema;
    UserUpdateCommand.ResponseEntitySchema = UserUpdateResponseEntitySchema;
})(UserUpdateCommand || (exports.UserUpdateCommand = UserUpdateCommand = {}));
