"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddToOrganizationCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const user_business_value_schema_1 = require("../../models/user/user-business-value.schema");
const user_related_entities_schema_1 = require("../../models/user/user-related-entities.schema");
const user_member_organizations_schema_1 = require("../../models/user/user-member/user-member-organizations.schema");
const UserAddToOrganizationResponseEntitySchema = user_business_value_schema_1.UserBusinessValueSchema.merge(user_related_entities_schema_1.UserRelatedEntitiesSchema);
const UserAddToOrganizationRequestSchema = models_1.UserSchema.pick({
    uuid: true,
    //DOC это поле специально здесь, потому что dtoToUpdateUser формируется в сервисе userService на этапе добавления
    //пользователя в организацию (не в исходном входном dto, поступившем из контроллера, там только userId)
}).merge(user_member_organizations_schema_1.UserMemberOfOrganizationsSchema);
const UserAddToOrganizationResponseSchema = zod_1.z
    .object({
    data: UserAddToOrganizationResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var UserAddToOrganizationCommand;
(function (UserAddToOrganizationCommand) {
    UserAddToOrganizationCommand.RequestSchema = UserAddToOrganizationRequestSchema;
    UserAddToOrganizationCommand.ResponseSchema = UserAddToOrganizationResponseSchema;
    UserAddToOrganizationCommand.ResponseEntitySchema = UserAddToOrganizationResponseEntitySchema;
})(UserAddToOrganizationCommand || (exports.UserAddToOrganizationCommand = UserAddToOrganizationCommand = {}));
