"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDeleteCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_2 = require("../../models");
const ProjectDeleteResponseSchema = zod_1.z
    .object({
    data: models_1.ProjectSchema.pick({
        name: true,
        description: true,
        customerMail: true,
        customerUuid: true,
        createdAt: true,
        updatedAt: true,
        uuid: true,
        responsibleManagerUuid: true,
        organizationUuid: true,
        lastChangeByUserUuid: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var ProjectDeleteCommand;
(function (ProjectDeleteCommand) {
    ProjectDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    ProjectDeleteCommand.ResponseSchema = ProjectDeleteResponseSchema;
})(ProjectDeleteCommand || (exports.ProjectDeleteCommand = ProjectDeleteCommand = {}));
