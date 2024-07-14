"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const project_business_value_schema_1 = require("../../models/project/project-business-value.schema");
const project_related_entities_schema_1 = require("../../models/project/project-related-entities.schema");
const ProjectGetAllResponseEntitySchema = zod_1.z.array(project_business_value_schema_1.ProjectBusinessValueSchema.merge(project_related_entities_schema_1.ProjectRelatedEntitiesSchema));
const ProjectGetAllResponseSchema = zod_1.z
    .object({
    data: ProjectGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var ProjectGetAllCommand;
(function (ProjectGetAllCommand) {
    ProjectGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    ProjectGetAllCommand.ResponseSchema = ProjectGetAllResponseSchema;
    ProjectGetAllCommand.ResponseEntitySchema = ProjectGetAllResponseEntitySchema;
})(ProjectGetAllCommand || (exports.ProjectGetAllCommand = ProjectGetAllCommand = {}));
