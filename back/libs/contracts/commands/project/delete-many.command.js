"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectSchemaDeleteManyCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const ProjectSchemaDeleteManyRequestSchema = models_1.ProjectSchema.pick({
    uuid: true,
});
const ProjectSchemaDeleteManyResponseSchema = zod_1.z.object({
    deletedProjects: zod_1.z.array(models_1.ProjectSchema),
    count: zod_1.z.number(),
});
var ProjectSchemaDeleteManyCommand;
(function (ProjectSchemaDeleteManyCommand) {
    ProjectSchemaDeleteManyCommand.RequestSchema = ProjectSchemaDeleteManyRequestSchema;
    ProjectSchemaDeleteManyCommand.ResponseSchema = ProjectSchemaDeleteManyResponseSchema;
})(ProjectSchemaDeleteManyCommand || (exports.ProjectSchemaDeleteManyCommand = ProjectSchemaDeleteManyCommand = {}));
