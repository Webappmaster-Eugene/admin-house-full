"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const user_business_value_schema_1 = require("../user/user-business-value.schema");
const project_business_value_schema_1 = require("../project/project-business-value.schema");
const workspace_business_value_schema_1 = require("../workspace/workspace-business-value.schema");
exports.OrganizationRelatedEntitiesSchema = zod_1.z.object({
    organizationLeader: user_business_value_schema_1.UserBusinessValueSchema,
    organizationMembers: zod_1.z.array(user_business_value_schema_1.UserBusinessValueSchema).nullable().optional(),
    projects: zod_1.z.array(project_business_value_schema_1.ProjectBusinessValueSchema).nullable().optional(),
    workspace: workspace_business_value_schema_1.WorkspaceBusinessValueSchema,
});
