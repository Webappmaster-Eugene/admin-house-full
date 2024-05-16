"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const PriceChangingUpdateRequestSchema = models_1.PriceChangingSchema.omit({
    createdAt: true,
    updatedAt: true,
    uuid: true,
    changedByUuid: true,
    materialUuid: true,
}).partial();
const PriceChangingUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.PriceChangingSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var PriceChangingUpdateCommand;
(function (PriceChangingUpdateCommand) {
    PriceChangingUpdateCommand.RequestSchema = PriceChangingUpdateRequestSchema;
    PriceChangingUpdateCommand.ResponseSchema = PriceChangingUpdateResponseSchema;
})(PriceChangingUpdateCommand || (exports.PriceChangingUpdateCommand = PriceChangingUpdateCommand = {}));
