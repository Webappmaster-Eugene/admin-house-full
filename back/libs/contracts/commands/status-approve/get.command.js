"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusApproveGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const StatusApproveGetResponseEntitySchema = models_1.StatusApproveSchema.pick({
    name: true,
    nameRu: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
});
const StatusApproveGetResponseSchema = zod_1.z
    .object({
    data: StatusApproveGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var StatusApproveGetCommand;
(function (StatusApproveGetCommand) {
    StatusApproveGetCommand.ResponseSchema = StatusApproveGetResponseSchema;
    StatusApproveGetCommand.ResponseEntitySchema = StatusApproveGetResponseEntitySchema;
})(StatusApproveGetCommand || (exports.StatusApproveGetCommand = StatusApproveGetCommand = {}));
