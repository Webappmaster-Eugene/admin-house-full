"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const role_business_value_schema_1 = require("../role/role-business-value.schema");
const workspace_business_value_schema_1 = require("../workspace/workspace-business-value.schema");
const project_business_value_schema_1 = require("../project/project-business-value.schema");
const organization_business_value_schema_1 = require("../organization/organization-business-value.schema");
exports.UserRelatedEntitiesSchema = zod_1.z.object({
    role: role_business_value_schema_1.RoleBusinessValueSchema,
    creatorOfWorkspace: workspace_business_value_schema_1.WorkspaceBusinessValueSchema.nullable().optional(),
    memberOfWorkspace: workspace_business_value_schema_1.WorkspaceBusinessValueSchema.nullable().optional(),
    memberOfProject: project_business_value_schema_1.ProjectBusinessValueSchema.nullable().optional(),
    memberOfOrganization: organization_business_value_schema_1.OrganizationBusinessValueSchema.nullable().optional(),
});
