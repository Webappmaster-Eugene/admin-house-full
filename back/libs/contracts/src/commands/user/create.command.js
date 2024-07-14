"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const user_business_value_schema_1 = require("../../models/user/user-business-value.schema");
const user_related_entities_schema_1 = require("../../models/user/user-related-entities.schema");
const UserCreateResponseEntitySchema = user_business_value_schema_1.UserBusinessValueSchema.merge(user_related_entities_schema_1.UserRelatedEntitiesSchema);
const UserCreateRequestSchema = models_1.UserSchema.pick({
    avatar: true,
    info: true,
    address: true,
    secondName: true,
    documents: true,
    email: true,
    password: true,
    firstName: true,
    phone: true,
});
const UserCreateResponseSchema = zod_1.z
    .object({
    data: UserCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var UserCreateCommand;
(function (UserCreateCommand) {
    UserCreateCommand.RequestSchema = UserCreateRequestSchema;
    UserCreateCommand.ResponseSchema = UserCreateResponseSchema;
    UserCreateCommand.ResponseEntitySchema = UserCreateResponseEntitySchema;
})(UserCreateCommand || (exports.UserCreateCommand = UserCreateCommand = {}));
