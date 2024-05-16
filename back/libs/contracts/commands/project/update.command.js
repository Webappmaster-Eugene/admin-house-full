"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ProjectUpdateRequestSchema = models_1.ProjectSchema.omit({
    createdAt: true,
    updatedAt: true,
    uuid: true,
    responsibleManagerUuid: true,
    organizationUuid: true,
}).partial();
const ProjectUpdateResponseSchema = zod_1.z
    .object({
    data: models_1.ProjectSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var ProjectUpdateCommand;
(function (ProjectUpdateCommand) {
    ProjectUpdateCommand.RequestSchema = ProjectUpdateRequestSchema;
    ProjectUpdateCommand.ResponseSchema = ProjectUpdateResponseSchema;
})(ProjectUpdateCommand || (exports.ProjectUpdateCommand = ProjectUpdateCommand = {}));
