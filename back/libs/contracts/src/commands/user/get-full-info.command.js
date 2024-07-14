"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetFullInfoCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const user_full_info_business_value_schema_1 = require("../../models/user/user-full-info/user-full-info-business-value.schema");
const models_1 = require("../../models");
const user_full_info_related_entities_schema_1 = require("../../models/user/user-full-info/user-full-info-related-entities.schema");
const UserGetFullInfoResponseEntitySchema = user_full_info_business_value_schema_1.UserFullInfoBusinessValueSchema.merge(user_full_info_related_entities_schema_1.UserFullInfoRelatedEntitiesSchema);
const UserGetFullInfoResponseSchema = zod_1.z
    .object({
    data: UserGetFullInfoResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var UserGetFullInfoCommand;
(function (UserGetFullInfoCommand) {
    UserGetFullInfoCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    UserGetFullInfoCommand.ResponseSchema = UserGetFullInfoResponseSchema;
    UserGetFullInfoCommand.ResponseEntitySchema = UserGetFullInfoResponseEntitySchema;
})(UserGetFullInfoCommand || (exports.UserGetFullInfoCommand = UserGetFullInfoCommand = {}));
