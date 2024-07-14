"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const user_business_value_schema_1 = require("../../models/user/user-business-value.schema");
const user_related_entities_schema_1 = require("../../models/user/user-related-entities.schema");
const UserGetAllResponseEntitySchema = zod_1.z.array(user_business_value_schema_1.UserBusinessValueSchema.merge(user_related_entities_schema_1.UserRelatedEntitiesSchema));
const UserGetAllResponseSchema = zod_1.z
    .object({
    data: UserGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var UserGetAllCommand;
(function (UserGetAllCommand) {
    UserGetAllCommand.RequestQuerySchema = models_2.RequestGetAllQuerySchema;
    UserGetAllCommand.ResponseSchema = UserGetAllResponseSchema;
    UserGetAllCommand.ResponseEntitySchema = UserGetAllResponseEntitySchema;
})(UserGetAllCommand || (exports.UserGetAllCommand = UserGetAllCommand = {}));
