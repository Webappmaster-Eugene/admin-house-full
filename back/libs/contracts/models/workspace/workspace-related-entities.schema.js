"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const organization_1 = require("../organization");
const user_1 = require("../user");
const handbook_1 = require("../handbook");
exports.WorkspaceRelatedEntitiesSchema = zod_1.z.object({
    workspaceMembers: zod_1.z.array(user_1.UserBusinessValueSchema).nullable().optional(),
    organizations: zod_1.z.array(organization_1.OrganizationBusinessValueSchema).nullable().optional(),
    handbookOfWorkspace: handbook_1.HandbookBusinessValueSchema.nullable().optional(),
    workspaceCreator: user_1.UserBusinessValueSchema,
});
