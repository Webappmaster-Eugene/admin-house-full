"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const PriceChangingDeleteResponseSchema = zod_1.z
    .object({
    data: models_1.PriceChangingSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var PriceChangingDeleteCommand;
(function (PriceChangingDeleteCommand) {
    PriceChangingDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    PriceChangingDeleteCommand.ResponseSchema = PriceChangingDeleteResponseSchema;
})(PriceChangingDeleteCommand || (exports.PriceChangingDeleteCommand = PriceChangingDeleteCommand = {}));
