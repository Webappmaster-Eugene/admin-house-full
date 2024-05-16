"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const ProjectGetAllResponseSchema = zod_1.z
    .object({
    data: zod_1.z.array(models_1.ProjectSchema.omit({
        createdAt: true,
        updatedAt: true,
    })),
})
    .merge(models_2.ResponseClientSchema);
var ProjectGetAllCommand;
(function (ProjectGetAllCommand) {
    ProjectGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    ProjectGetAllCommand.ResponseSchema = ProjectGetAllResponseSchema;
})(ProjectGetAllCommand || (exports.ProjectGetAllCommand = ProjectGetAllCommand = {}));
