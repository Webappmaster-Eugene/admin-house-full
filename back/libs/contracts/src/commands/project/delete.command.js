"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const project_business_value_schema_1 = require("../../models/project/project-business-value.schema");
const project_related_entities_schema_1 = require("../../models/project/project-related-entities.schema");
const ProjectDeleteResponseEntitySchema = project_business_value_schema_1.ProjectBusinessValueSchema.merge(project_related_entities_schema_1.ProjectRelatedEntitiesSchema);
const ProjectDeleteResponseSchema = zod_1.z
    .object({
    data: ProjectDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var ProjectDeleteCommand;
(function (ProjectDeleteCommand) {
    ProjectDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    ProjectDeleteCommand.ResponseSchema = ProjectDeleteResponseSchema;
    ProjectDeleteCommand.ResponseEntitySchema = ProjectDeleteResponseEntitySchema;
})(ProjectDeleteCommand || (exports.ProjectDeleteCommand = ProjectDeleteCommand = {}));
