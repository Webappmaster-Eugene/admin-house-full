"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDeleteCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_2 = require("../../models");
const ProjectDeleteResponseEntitySchema = models_1.ProjectBusinessValueSchema.merge(models_1.ProjectRelatedEntitiesSchema);
const ProjectDeleteResponseSchema = zod_1.z
    .object({
    data: ProjectDeleteResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var ProjectDeleteCommand;
(function (ProjectDeleteCommand) {
    ProjectDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    ProjectDeleteCommand.ResponseSchema = ProjectDeleteResponseSchema;
    ProjectDeleteCommand.ResponseEntitySchema = ProjectDeleteResponseEntitySchema;
})(ProjectDeleteCommand || (exports.ProjectDeleteCommand = ProjectDeleteCommand = {}));
