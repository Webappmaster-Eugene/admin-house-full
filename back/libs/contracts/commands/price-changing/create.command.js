"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const PriceChangingCreateResponseEntitySchema = models_1.PriceChangingBusinessValueSchema.merge(models_1.PriceChangingRelatedEntitiesSchema);
const PriceChangingCreateRequestSchema = models_1.PriceChangingSchema.pick({
    oldPrice: true,
    comment: true,
    newPrice: true,
    source: true,
});
const PriceChangingCreateResponseSchema = zod_1.z
    .object({
    data: PriceChangingCreateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var PriceChangingCreateCommand;
(function (PriceChangingCreateCommand) {
    PriceChangingCreateCommand.RequestSchema = PriceChangingCreateRequestSchema;
    PriceChangingCreateCommand.ResponseSchema = PriceChangingCreateResponseSchema;
    PriceChangingCreateCommand.ResponseEntitySchema = PriceChangingCreateResponseEntitySchema;
})(PriceChangingCreateCommand || (exports.PriceChangingCreateCommand = PriceChangingCreateCommand = {}));
