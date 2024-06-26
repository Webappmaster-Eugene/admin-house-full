"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddToOrganizationCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const UserAddToOrganizationResponseEntitySchema = models_1.UserSchema.omit({
    password: true,
    createdAt: true,
    updatedAt: true,
});
const UserAddToOrganizationRequestSchema = models_1.UserSchema.pick({
    uuid: true,
    //DOC это поле специально здесь, потому что dtoToUpdateUser формируется в сервисе userService на этапе добавления
    //пользователя в организацию (не в исходном входном dto, поступившего из контроллера, там только userId)
    memberOfOrganizationUuid: true,
});
const UserAddToOrganizationResponseSchema = zod_1.z
    .object({
    data: UserAddToOrganizationResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var UserAddToOrganizationCommand;
(function (UserAddToOrganizationCommand) {
    UserAddToOrganizationCommand.RequestSchema = UserAddToOrganizationRequestSchema;
    UserAddToOrganizationCommand.ResponseSchema = UserAddToOrganizationResponseSchema;
    UserAddToOrganizationCommand.ResponseEntitySchema = UserAddToOrganizationResponseEntitySchema;
})(UserAddToOrganizationCommand || (exports.UserAddToOrganizationCommand = UserAddToOrganizationCommand = {}));
