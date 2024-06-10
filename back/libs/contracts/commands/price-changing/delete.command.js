"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const PriceChangingDeleteResponseEntitySchema = models_1.PriceChangingSchema.pick({
    oldPrice: true,
    comment: true,
    newPrice: true,
    source: true,
    uuid: true,
    lastChangeByUserUuid: true,
    materialUuid: true,
});
const PriceChangingDeleteResponseSchema = zod_1.z
    .object({
    data: PriceChangingDeleteResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var PriceChangingDeleteCommand;
(function (PriceChangingDeleteCommand) {
    PriceChangingDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    PriceChangingDeleteCommand.ResponseSchema = PriceChangingDeleteResponseSchema;
    PriceChangingDeleteCommand.ResponseEntitySchema = PriceChangingDeleteResponseEntitySchema;
})(PriceChangingDeleteCommand || (exports.PriceChangingDeleteCommand = PriceChangingDeleteCommand = {}));
