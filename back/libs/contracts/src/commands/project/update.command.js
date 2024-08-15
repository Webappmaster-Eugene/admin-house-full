"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const project_related_entities_schema_1 = require("../../models/project/project-related-entities.schema");
const project_business_value_schema_1 = require("../../models/project/project-business-value.schema");
const ProjectUpdateResponseEntitySchema = project_business_value_schema_1.ProjectBusinessValueSchema.merge(project_related_entities_schema_1.ProjectRelatedEntitiesSchema);
const ProjectUpdateRequestSchema = models_1.ProjectSchema.pick({
    name: true,
    customerMail: true,
    customerUuid: true,
    description: true,
    projectStatus: true,
    responsibleManagerUuid: true,
    organizationUuid: true,
}).partial();
const ProjectUpdateResponseSchema = zod_1.z
    .object({
    data: ProjectUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var ProjectUpdateCommand;
(function (ProjectUpdateCommand) {
    ProjectUpdateCommand.RequestSchema = ProjectUpdateRequestSchema;
    ProjectUpdateCommand.ResponseSchema = ProjectUpdateResponseSchema;
    ProjectUpdateCommand.ResponseEntitySchema = ProjectUpdateResponseEntitySchema;
})(ProjectUpdateCommand || (exports.ProjectUpdateCommand = ProjectUpdateCommand = {}));
