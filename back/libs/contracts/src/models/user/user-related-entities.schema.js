"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const role_business_value_schema_1 = require("../role/role-business-value.schema");
const workspace_business_value_schema_1 = require("../workspace/workspace-business-value.schema");
const project_business_value_schema_1 = require("../project/project-business-value.schema");
const organization_business_value_schema_1 = require("../organization/organization-business-value.schema");
const handbook_business_value_schema_1 = require("../handbook/handbook-business-value.schema");
exports.UserRelatedEntitiesSchema = zod_1.z.object({
    roles: zod_1.z.array(role_business_value_schema_1.RoleBusinessValueSchema).nullable().optional(),
    customerOfProjects: zod_1.z.array(project_business_value_schema_1.ProjectBusinessValueSchema).nullable().optional(),
    handbookManager: handbook_business_value_schema_1.HandbookBusinessValueSchema.nullable().optional(),
    responsibleManagerOfProjects: zod_1.z.array(project_business_value_schema_1.ProjectBusinessValueSchema).nullable().optional(),
    creatorOfWorkspace: workspace_business_value_schema_1.WorkspaceBusinessValueSchema.nullable().optional(),
    leaderOfOrganizations: zod_1.z.array(organization_business_value_schema_1.OrganizationBusinessValueSchema).nullable().optional(),
    memberOfWorkspaces: zod_1.z.array(workspace_business_value_schema_1.WorkspaceBusinessValueSchema).nullable().optional(),
    memberOfProjects: zod_1.z.array(project_business_value_schema_1.ProjectBusinessValueSchema).nullable().optional(),
    memberOfOrganizations: zod_1.z.array(organization_business_value_schema_1.OrganizationBusinessValueSchema).nullable().optional(),
});
