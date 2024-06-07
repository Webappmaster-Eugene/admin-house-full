"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ProjectCreateRequestSchema = models_1.ProjectSchema.pick({
    name: true,
    description: true,
    customerMail: true,
    customerUuid: true,
});
const ProjectCreateResponseSchema = zod_1.z
    .object({
    data: models_1.ProjectSchema.pick({
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
    }),
})
    .merge(models_2.ResponseClientSchema);
var ProjectCreateCommand;
(function (ProjectCreateCommand) {
    ProjectCreateCommand.RequestSchema = ProjectCreateRequestSchema;
    ProjectCreateCommand.ResponseSchema = ProjectCreateResponseSchema;
})(ProjectCreateCommand || (exports.ProjectCreateCommand = ProjectCreateCommand = {}));
