"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const user_1 = require("../user");
const project_1 = require("../project");
const workspace_1 = require("../workspace");
exports.OrganizationRelatedEntitiesSchema = zod_1.z.object({
    organizationLeader: user_1.UserBusinessValueSchema,
    organizationMembers: zod_1.z.array(user_1.UserBusinessValueSchema).nullable().optional(),
    projects: zod_1.z.array(project_1.ProjectBusinessValueSchema).nullable().optional(),
    workspace: workspace_1.WorkspaceBusinessValueSchema,
});
