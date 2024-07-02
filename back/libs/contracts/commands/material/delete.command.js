"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const MaterialDeleteResponseEntitySchema = models_1.MaterialSchema.pick({
    name: true,
    price: true,
    comment: true,
    namePublic: true,
    sourceInfo: true,
    unitMeasurementUuid: true,
    responsiblePartnerUuid: true,
    categoryMaterialUuid: true,
    handbookUuid: true,
    lastChangeByUserUuid: true,
    uuid: true,
}).merge(models_1.MaterialRelatedEntitiesSchema);
const MaterialDeleteResponseSchema = zod_1.z
    .object({
    data: MaterialDeleteResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var MaterialDeleteCommand;
(function (MaterialDeleteCommand) {
    MaterialDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    MaterialDeleteCommand.ResponseSchema = MaterialDeleteResponseSchema;
    MaterialDeleteCommand.ResponseEntitySchema = MaterialDeleteResponseEntitySchema;
})(MaterialDeleteCommand || (exports.MaterialDeleteCommand = MaterialDeleteCommand = {}));
