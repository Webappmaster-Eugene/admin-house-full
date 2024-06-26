"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddToWorkspaceCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const UserAddToWorkspaceResponseEntitySchema = models_1.UserSchema.omit({
    password: true,
    createdAt: true,
    updatedAt: true,
});
const UserAddToWorkspaceRequestSchema = models_1.UserSchema.pick({
    uuid: true,
    //DOC это поле специально здесь, потому что dtoToUpdateUser формируется в сервисе userService на этапе добавления
    //пользователя в организацию (не в исходном входном dto, поступившего из контроллера, там только userId)
    memberOfWorkspaceUuid: true,
});
const UserAddToWorkspaceResponseSchema = zod_1.z
    .object({
    data: UserAddToWorkspaceResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var UserAddToWorkspaceCommand;
(function (UserAddToWorkspaceCommand) {
    UserAddToWorkspaceCommand.RequestSchema = UserAddToWorkspaceRequestSchema;
    UserAddToWorkspaceCommand.ResponseSchema = UserAddToWorkspaceResponseSchema;
    UserAddToWorkspaceCommand.ResponseEntitySchema = UserAddToWorkspaceResponseEntitySchema;
})(UserAddToWorkspaceCommand || (exports.UserAddToWorkspaceCommand = UserAddToWorkspaceCommand = {}));
