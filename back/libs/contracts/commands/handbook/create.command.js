"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const HandbookCreateRequestSchema = models_1.HandbookSchema.omit({
    uuid: true,
    createdAt: true,
    updatedAt: true,
    responsibleManagerUuid: true,
});
const HandbookCreateResponseSchema = zod_1.z
    .object({
    data: models_1.HandbookSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var HandbookCreateCommand;
(function (HandbookCreateCommand) {
    HandbookCreateCommand.RequestSchema = HandbookCreateRequestSchema;
    HandbookCreateCommand.ResponseSchema = HandbookCreateResponseSchema;
})(HandbookCreateCommand || (exports.HandbookCreateCommand = HandbookCreateCommand = {}));
