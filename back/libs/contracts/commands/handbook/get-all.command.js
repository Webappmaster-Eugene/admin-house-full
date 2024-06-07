"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const HandbookGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.HandbookSchema.pick({
        name: true,
        description: true,
        canCustomerView: true,
        uuid: true,
        responsibleManagerUuid: true,
        workspaceUuid: true,
        lastChangeByUserUuid: true,
    })),
})
    .merge(models_2.ResponseClientSchema);
var HandbookGetAllCommand;
(function (HandbookGetAllCommand) {
    HandbookGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    HandbookGetAllCommand.ResponseSchema = HandbookGetAllResponseSchema;
})(HandbookGetAllCommand || (exports.HandbookGetAllCommand = HandbookGetAllCommand = {}));
