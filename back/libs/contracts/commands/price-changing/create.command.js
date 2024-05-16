"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const PriceChangingCreateRequestSchema = models_1.PriceChangingSchema.omit({
    uuid: true,
    materialUuid: true,
    changedByUuid: true,
    createdAt: true,
    updatedAt: true,
});
const PriceChangingCreateResponseSchema = zod_1.z
    .object({
    data: models_1.PriceChangingSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var PriceChangingCreateCommand;
(function (PriceChangingCreateCommand) {
    PriceChangingCreateCommand.RequestSchema = PriceChangingCreateRequestSchema;
    PriceChangingCreateCommand.ResponseSchema = PriceChangingCreateResponseSchema;
})(PriceChangingCreateCommand || (exports.PriceChangingCreateCommand = PriceChangingCreateCommand = {}));
