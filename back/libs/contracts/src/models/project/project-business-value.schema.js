"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectBusinessValueSchema = void 0;
const project_schema_1 = require("./project.schema");
exports.ProjectBusinessValueSchema = project_schema_1.ProjectSchema.pick({
    name: true,
    description: true,
    customerMail: true,
    customerUuid: true,
    createdAt: true,
    updatedAt: true,
    uuid: true,
    projectStatus: true,
    responsibleManagerUuid: true,
    organizationUuid: true,
    lastChangeByUserUuid: true,
});
