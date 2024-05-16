"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const HandbookUpdateRequestSchema = models_1.HandbookSchema.omit({
    createdAt: true,
    updatedAt: true,
    uuid: true,
    responsibleManagerUuid: true,
    workspaceUuid: true,
}).partial();
const HandbookUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.HandbookSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var HandbookUpdateCommand;
(function (HandbookUpdateCommand) {
    HandbookUpdateCommand.RequestSchema = HandbookUpdateRequestSchema;
    HandbookUpdateCommand.ResponseSchema = HandbookUpdateResponseSchema;
})(HandbookUpdateCommand || (exports.HandbookUpdateCommand = HandbookUpdateCommand = {}));
