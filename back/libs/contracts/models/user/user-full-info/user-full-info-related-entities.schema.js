"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFullInfoRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const organization_1 = require("../../organization");
const role_1 = require("../../role");
const workspace_1 = require("../../workspace");
const project_1 = require("../../project");
const handbook_1 = require("../../handbook");
exports.UserFullInfoRelatedEntitiesSchema = zod_1.z.object({
    role: role_1.RoleSchema,
    creatorOfWorkspace: workspace_1.WorkspaceSchema.nullable().optional(),
    memberOfWorkspace: workspace_1.WorkspaceSchema.nullable().optional(),
    memberOfOrganization: organization_1.OrganizationSchema.nullable().optional(),
    leaderOfOrganizations: zod_1.z.array(organization_1.OrganizationSchema).nullable().optional(),
    memberOfProject: project_1.ProjectSchema.nullable().optional(),
    responsibleManagerOfProjects: zod_1.z.array(project_1.ProjectSchema).nullable().optional(),
    handbookManager: handbook_1.HandbookSchema.nullable().optional(),
});
