"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ProjectSchemaGetRequestSchema = models_1.ProjectSchema.pick({
    uuid: true,
});
const ProjectSchemaGetResponseSchema = zod_1.z
    .object({
    data: models_1.ProjectSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var ProjectGetCommand;
(function (ProjectGetCommand) {
    ProjectGetCommand.RequestSchema = ProjectSchemaGetRequestSchema;
    ProjectGetCommand.ResponseSchema = ProjectSchemaGetResponseSchema;
})(ProjectGetCommand || (exports.ProjectGetCommand = ProjectGetCommand = {}));
