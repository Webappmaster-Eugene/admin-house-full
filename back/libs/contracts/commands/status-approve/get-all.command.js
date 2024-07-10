"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusApproveGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const StatusApproveGetAllResponseEntitySchema = zod_1.z.array(models_1.StatusApproveBusinessValueSchema);
const StatusApproveGetAllResponseSchema = zod_1.z
    .object({
    data: StatusApproveGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var StatusApproveGetAllCommand;
(function (StatusApproveGetAllCommand) {
    StatusApproveGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    StatusApproveGetAllCommand.ResponseSchema = StatusApproveGetAllResponseSchema;
    StatusApproveGetAllCommand.ResponseEntitySchema = StatusApproveGetAllResponseEntitySchema;
})(StatusApproveGetAllCommand || (exports.StatusApproveGetAllCommand = StatusApproveGetAllCommand = {}));
