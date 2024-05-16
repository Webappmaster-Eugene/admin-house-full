"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsiblePartnerProducerDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ResponsiblePartnerProducerDeleteResponseSchema = zod_1.z
    .object({
    data: models_1.ResponsiblePartnerProducerSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var ResponsiblePartnerProducerDeleteCommand;
(function (ResponsiblePartnerProducerDeleteCommand) {
    ResponsiblePartnerProducerDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    ResponsiblePartnerProducerDeleteCommand.ResponseSchema = ResponsiblePartnerProducerDeleteResponseSchema;
})(ResponsiblePartnerProducerDeleteCommand || (exports.ResponsiblePartnerProducerDeleteCommand = ResponsiblePartnerProducerDeleteCommand = {}));
