"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const PriceChangingUpdateResponseEntitySchema = models_1.PriceChangingBusinessValueSchema.merge(models_1.PriceChangingRelatedEntitiesSchema);
const PriceChangingUpdateRequestSchema = models_1.PriceChangingSchema.pick({
    source: true,
    comment: true,
    newPrice: true,
}).partial();
const PriceChangingUpdateResponseSchema = zod_1.z
    .object({
    data: PriceChangingUpdateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var PriceChangingUpdateCommand;
(function (PriceChangingUpdateCommand) {
    PriceChangingUpdateCommand.RequestSchema = PriceChangingUpdateRequestSchema;
    PriceChangingUpdateCommand.ResponseSchema = PriceChangingUpdateResponseSchema;
    PriceChangingUpdateCommand.ResponseEntitySchema = PriceChangingUpdateResponseEntitySchema;
})(PriceChangingUpdateCommand || (exports.PriceChangingUpdateCommand = PriceChangingUpdateCommand = {}));
