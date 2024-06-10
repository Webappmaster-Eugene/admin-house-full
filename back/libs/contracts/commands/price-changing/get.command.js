"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const PriceChangingGetResponseEntitySchema = models_1.PriceChangingSchema.pick({
    oldPrice: true,
    comment: true,
    newPrice: true,
    source: true,
    uuid: true,
    lastChangeByUserUuid: true,
    materialUuid: true,
});
const PriceChangingGetResponseSchema = zod_1.z
    .object({
    data: PriceChangingGetResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var PriceChangingGetCommand;
(function (PriceChangingGetCommand) {
    PriceChangingGetCommand.ResponseSchema = PriceChangingGetResponseSchema;
    PriceChangingGetCommand.ResponseEntitySchema = PriceChangingGetResponseEntitySchema;
})(PriceChangingGetCommand || (exports.PriceChangingGetCommand = PriceChangingGetCommand = {}));
