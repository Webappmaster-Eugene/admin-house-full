"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkspaceRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const user_business_value_schema_1 = require("../user/user-business-value.schema");
const organization_business_value_schema_1 = require("../organization/organization-business-value.schema");
const handbook_business_value_schema_1 = require("../handbook/handbook-business-value.schema");
exports.WorkspaceRelatedEntitiesSchema = zod_1.z.object({
    workspaceMembers: zod_1.z.array(user_business_value_schema_1.UserBusinessValueSchema).nullable().optional(),
    organizations: zod_1.z.array(organization_business_value_schema_1.OrganizationBusinessValueSchema).nullable().optional(),
    handbookOfWorkspace: handbook_business_value_schema_1.HandbookBusinessValueSchema.nullable().optional(),
    workspaceCreator: user_business_value_schema_1.UserBusinessValueSchema,
});
