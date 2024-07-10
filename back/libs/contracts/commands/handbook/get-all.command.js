"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const HandbookGetAllResponseEntitySchema = zod_1.z.array(models_1.HandbookBusinessValueSchema.merge(models_1.HandbookRelatedEntitiesSchema));
const HandbookGetAllResponseSchema = zod_1.z
    .object({
    data: HandbookGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var HandbookGetAllCommand;
(function (HandbookGetAllCommand) {
    HandbookGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    HandbookGetAllCommand.ResponseSchema = HandbookGetAllResponseSchema;
    HandbookGetAllCommand.ResponseEntitySchema = HandbookGetAllResponseEntitySchema;
})(HandbookGetAllCommand || (exports.HandbookGetAllCommand = HandbookGetAllCommand = {}));
