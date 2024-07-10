"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceBusinessValueSchema = void 0;
const workspace_schema_1 = require("./workspace.schema");
exports.WorkspaceBusinessValueSchema = workspace_schema_1.WorkspaceSchema.pick({
    uuid: true,
    name: true,
    workspaceCreatorUuid: true,
});
