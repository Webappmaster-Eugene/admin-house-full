"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const HandbookUpdateResponseEntitySchema = models_1.HandbookBusinessValueSchema.merge(models_1.HandbookRelatedEntitiesSchema);
const HandbookUpdateRequestSchema = models_1.HandbookSchema.pick({
    name: true,
    canCustomerView: true,
    description: true,
}).partial();
const HandbookUpdateResponseSchema = zod_1.z
    .object({
    data: HandbookUpdateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var HandbookUpdateCommand;
(function (HandbookUpdateCommand) {
    HandbookUpdateCommand.RequestSchema = HandbookUpdateRequestSchema;
    HandbookUpdateCommand.ResponseSchema = HandbookUpdateResponseSchema;
    HandbookUpdateCommand.ResponseEntitySchema = HandbookUpdateResponseEntitySchema;
})(HandbookUpdateCommand || (exports.HandbookUpdateCommand = HandbookUpdateCommand = {}));
