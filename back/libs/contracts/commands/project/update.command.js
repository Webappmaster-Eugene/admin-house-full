"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ProjectUpdateResponseEntitySchema = models_1.ProjectSchema.pick({
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
});
const ProjectUpdateRequestSchema = models_1.ProjectSchema.pick({
    name: true,
    customerMail: true,
    customerUuid: true,
    description: true,
}).partial();
const ProjectUpdateResponseSchema = zod_1.z
    .object({
    data: ProjectUpdateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var ProjectUpdateCommand;
(function (ProjectUpdateCommand) {
    ProjectUpdateCommand.RequestSchema = ProjectUpdateRequestSchema;
    ProjectUpdateCommand.ResponseSchema = ProjectUpdateResponseSchema;
    ProjectUpdateCommand.ResponseEntitySchema = ProjectUpdateResponseEntitySchema;
})(ProjectUpdateCommand || (exports.ProjectUpdateCommand = ProjectUpdateCommand = {}));
