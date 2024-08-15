"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMemberOfWorkspacesSchema = void 0;
const zod_1 = require("zod");
const workspace_business_value_schema_1 = require("../../../models/workspace/workspace-business-value.schema");
exports.UserMemberOfWorkspacesSchema = zod_1.z.object({
    memberOfWorkspaces: zod_1.z.array(workspace_business_value_schema_1.WorkspaceBusinessValueSchema).nullable().optional(),
});
