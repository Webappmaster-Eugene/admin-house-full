"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const HandbookCreateRequestSchema = models_1.HandbookSchema.pick({
    name: true,
    description: true,
    canCustomerView: true,
    workspaceUuid: true,
});
const HandbookCreateResponseSchema = zod_1.z
    .object({
    data: models_1.HandbookSchema.pick({
        name: true,
        description: true,
        canCustomerView: true,
        uuid: true,
        responsibleManagerUuid: true,
        workspaceUuid: true,
        lastChangeByUserUuid: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var HandbookCreateCommand;
(function (HandbookCreateCommand) {
    HandbookCreateCommand.RequestSchema = HandbookCreateRequestSchema;
    HandbookCreateCommand.ResponseSchema = HandbookCreateResponseSchema;
})(HandbookCreateCommand || (exports.HandbookCreateCommand = HandbookCreateCommand = {}));
