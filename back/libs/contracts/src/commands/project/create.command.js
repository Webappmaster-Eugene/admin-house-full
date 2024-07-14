"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const project_business_value_schema_1 = require("../../models/project/project-business-value.schema");
const project_related_entities_schema_1 = require("../../models/project/project-related-entities.schema");
const ProjectCreateResponseEntitySchema = project_business_value_schema_1.ProjectBusinessValueSchema.merge(project_related_entities_schema_1.ProjectRelatedEntitiesSchema);
const ProjectCreateRequestSchema = models_1.ProjectSchema.pick({
    name: true,
    description: true,
    customerMail: true,
    customerUuid: true,
});
const ProjectCreateResponseSchema = zod_1.z
    .object({
    data: ProjectCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var ProjectCreateCommand;
(function (ProjectCreateCommand) {
    ProjectCreateCommand.RequestSchema = ProjectCreateRequestSchema;
    ProjectCreateCommand.ResponseSchema = ProjectCreateResponseSchema;
    ProjectCreateCommand.ResponseEntitySchema = ProjectCreateResponseEntitySchema;
})(ProjectCreateCommand || (exports.ProjectCreateCommand = ProjectCreateCommand = {}));
