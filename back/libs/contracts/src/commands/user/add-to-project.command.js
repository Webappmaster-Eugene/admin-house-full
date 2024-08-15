"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddToProjectCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const user_business_value_schema_1 = require("../../models/user/user-business-value.schema");
const user_related_entities_schema_1 = require("../../models/user/user-related-entities.schema");
const user_member_projects_schema_1 = require("../../models/user/user-member/user-member-projects.schema");
const UserAddToProjectResponseEntitySchema = user_business_value_schema_1.UserBusinessValueSchema.merge(user_related_entities_schema_1.UserRelatedEntitiesSchema);
const UserAddToProjectRequestSchema = models_1.UserSchema.pick({
    uuid: true,
    //DOC это поле специально здесь, потому что dtoToUpdateUser формируется в сервисе userService на этапе добавления
    //пользователя в организацию (не в исходном входном dto, поступившего из контроллера, там только userId)
}).merge(user_member_projects_schema_1.UserMemberOfProjectsSchema);
const UserAddToProjectResponseSchema = zod_1.z
    .object({
    data: UserAddToProjectResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var UserAddToProjectCommand;
(function (UserAddToProjectCommand) {
    UserAddToProjectCommand.RequestSchema = UserAddToProjectRequestSchema;
    UserAddToProjectCommand.ResponseSchema = UserAddToProjectResponseSchema;
    UserAddToProjectCommand.ResponseEntitySchema = UserAddToProjectResponseEntitySchema;
})(UserAddToProjectCommand || (exports.UserAddToProjectCommand = UserAddToProjectCommand = {}));
