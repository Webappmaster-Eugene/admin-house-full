"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const PriceChangingGetAllResponseEntitySchema = zod_1.z.array(models_1.PriceChangingBusinessValueSchema.merge(models_1.PriceChangingRelatedEntitiesSchema));
const PriceChangingGetAllResponseSchema = zod_1.z
    .object({
    data: PriceChangingGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var PriceChangingGetAllCommand;
(function (PriceChangingGetAllCommand) {
    PriceChangingGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    PriceChangingGetAllCommand.ResponseSchema = PriceChangingGetAllResponseSchema;
    PriceChangingGetAllCommand.ResponseEntitySchema = PriceChangingGetAllResponseEntitySchema;
})(PriceChangingGetAllCommand || (exports.PriceChangingGetAllCommand = PriceChangingGetAllCommand = {}));
