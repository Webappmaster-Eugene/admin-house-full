"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ProjectGetAllResponseEntitySchema = zod_1.z.array(models_1.ProjectSchema.pick({
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
}));
const ProjectGetAllResponseSchema = zod_1.z
    .object({
    data: ProjectGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var ProjectGetAllCommand;
(function (ProjectGetAllCommand) {
    ProjectGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    ProjectGetAllCommand.ResponseSchema = ProjectGetAllResponseSchema;
    ProjectGetAllCommand.ResponseEntitySchema = ProjectGetAllResponseEntitySchema;
})(ProjectGetAllCommand || (exports.ProjectGetAllCommand = ProjectGetAllCommand = {}));
