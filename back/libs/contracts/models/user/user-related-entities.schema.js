"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const organization_1 = require("../organization");
const role_1 = require("../role");
const workspace_1 = require("../workspace");
const project_1 = require("../project");
exports.UserRelatedEntitiesSchema = zod_1.z.object({
    role: role_1.RoleBusinessValueSchema,
    creatorOfWorkspace: workspace_1.WorkspaceBusinessValueSchema.nullable().optional(),
    memberOfWorkspace: workspace_1.WorkspaceBusinessValueSchema.nullable().optional(),
    memberOfProject: project_1.ProjectBusinessValueSchema.nullable().optional(),
    memberOfOrganization: organization_1.OrganizationBusinessValueSchema.nullable().optional(),
});
