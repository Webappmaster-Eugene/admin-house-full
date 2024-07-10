"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const MaterialCreateResponseEntitySchema = models_1.MaterialBusinessValueSchema.merge(models_1.MaterialRelatedEntitiesSchema);
const MaterialCreateRequestSchema = models_1.MaterialSchema.pick({
    name: true,
    price: true,
    comment: true,
    namePublic: true,
    sourceInfo: true,
    unitMeasurementUuid: true,
    responsiblePartnerUuid: true,
});
const MaterialCreateResponseSchema = zod_1.z
    .object({
    data: MaterialCreateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var MaterialCreateCommand;
(function (MaterialCreateCommand) {
    MaterialCreateCommand.RequestSchema = MaterialCreateRequestSchema;
    MaterialCreateCommand.ResponseSchema = MaterialCreateResponseSchema;
    MaterialCreateCommand.ResponseEntitySchema = MaterialCreateResponseEntitySchema;
})(MaterialCreateCommand || (exports.MaterialCreateCommand = MaterialCreateCommand = {}));
