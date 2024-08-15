"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationBusinessValueSchema = void 0;
const organization_schema_1 = require("./organization.schema");
exports.OrganizationBusinessValueSchema = organization_schema_1.OrganizationSchema.pick({
    uuid: true,
    name: true,
    description: true,
    organizationStatus: true,
    organizationLeaderUuid: true,
    workspaceUuid: true,
    lastChangeByUserUuid: true,
});
