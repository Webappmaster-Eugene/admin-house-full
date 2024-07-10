"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const OrganizationDeleteResponseEntitySchema = models_1.OrganizationBusinessValueSchema.merge(models_1.OrganizationRelatedEntitiesSchema);
const OrganizationDeleteResponseSchema = zod_1.z
    .object({
    data: OrganizationDeleteResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var OrganizationDeleteCommand;
(function (OrganizationDeleteCommand) {
    OrganizationDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    OrganizationDeleteCommand.ResponseSchema = OrganizationDeleteResponseSchema;
    OrganizationDeleteCommand.ResponseEntitySchema = OrganizationDeleteResponseEntitySchema;
})(OrganizationDeleteCommand || (exports.OrganizationDeleteCommand = OrganizationDeleteCommand = {}));
