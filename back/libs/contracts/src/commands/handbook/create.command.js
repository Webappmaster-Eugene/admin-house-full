"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const handbook_related_entities_schema_1 = require("../../models/handbook/handbook-related-entities.schema");
const handbook_business_value_schema_1 = require("../../models/handbook/handbook-business-value.schema");
const HandbookCreateResponseEntitySchema = handbook_business_value_schema_1.HandbookBusinessValueSchema.merge(handbook_related_entities_schema_1.HandbookRelatedEntitiesSchema);
const HandbookCreateRequestSchema = models_1.HandbookSchema.pick({
    name: true,
    description: true,
    canCustomerView: true,
    workspaceUuid: true,
    handbookStatus: true,
});
const HandbookCreateResponseSchema = zod_1.z
    .object({
    data: HandbookCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var HandbookCreateCommand;
(function (HandbookCreateCommand) {
    HandbookCreateCommand.RequestSchema = HandbookCreateRequestSchema;
    HandbookCreateCommand.ResponseSchema = HandbookCreateResponseSchema;
    HandbookCreateCommand.ResponseEntitySchema = HandbookCreateResponseEntitySchema;
})(HandbookCreateCommand || (exports.HandbookCreateCommand = HandbookCreateCommand = {}));
