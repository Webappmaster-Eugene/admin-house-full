"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMemberOfProjectsSchema = void 0;
const zod_1 = require("zod");
const project_business_value_schema_1 = require("../../../models/project/project-business-value.schema");
exports.UserMemberOfProjectsSchema = zod_1.z.object({
    memberOfProjects: zod_1.z.array(project_business_value_schema_1.ProjectBusinessValueSchema).nullable().optional(),
});
