"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const OrganizationDeleteResponseSchema = zod_1.z
    .object({
    data: models_1.OrganizationSchema.pick({
        uuid: true,
        name: true,
        description: true,
        organizationLeaderUuid: true,
        workspaceUuid: true,
        lastChangeByUserUuid: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var OrganizationDeleteCommand;
(function (OrganizationDeleteCommand) {
    OrganizationDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    OrganizationDeleteCommand.ResponseSchema = OrganizationDeleteResponseSchema;
})(OrganizationDeleteCommand || (exports.OrganizationDeleteCommand = OrganizationDeleteCommand = {}));
