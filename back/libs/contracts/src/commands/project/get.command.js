"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const project_business_value_schema_1 = require("../../models/project/project-business-value.schema");
const project_related_entities_schema_1 = require("../../models/project/project-related-entities.schema");
const ProjectGetResponseEntitySchema = project_business_value_schema_1.ProjectBusinessValueSchema.merge(project_related_entities_schema_1.ProjectRelatedEntitiesSchema);
const ProjectSchemaGetRequestSchema = models_1.ProjectSchema.pick({
    uuid: true,
});
const ProjectSchemaGetResponseSchema = zod_1.z
    .object({
    data: ProjectGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var ProjectGetCommand;
(function (ProjectGetCommand) {
    ProjectGetCommand.BusinessValueSchema = project_business_value_schema_1.ProjectBusinessValueSchema;
    ProjectGetCommand.RequestSchema = ProjectSchemaGetRequestSchema;
    ProjectGetCommand.ResponseSchema = ProjectSchemaGetResponseSchema;
    ProjectGetCommand.ResponseEntitySchema = ProjectGetResponseEntitySchema;
})(ProjectGetCommand || (exports.ProjectGetCommand = ProjectGetCommand = {}));
