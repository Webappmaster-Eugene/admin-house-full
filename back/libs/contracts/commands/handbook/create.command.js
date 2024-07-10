"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const models_3 = require("../../models");
const HandbookCreateResponseEntitySchema = models_1.HandbookBusinessValueSchema.merge(models_3.HandbookRelatedEntitiesSchema);
const HandbookCreateRequestSchema = models_1.HandbookSchema.pick({
    name: true,
    description: true,
    canCustomerView: true,
    workspaceUuid: true,
});
const HandbookCreateResponseSchema = zod_1.z
    .object({
    data: HandbookCreateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var HandbookCreateCommand;
(function (HandbookCreateCommand) {
    HandbookCreateCommand.RequestSchema = HandbookCreateRequestSchema;
    HandbookCreateCommand.ResponseSchema = HandbookCreateResponseSchema;
    HandbookCreateCommand.ResponseEntitySchema = HandbookCreateResponseEntitySchema;
})(HandbookCreateCommand || (exports.HandbookCreateCommand = HandbookCreateCommand = {}));
