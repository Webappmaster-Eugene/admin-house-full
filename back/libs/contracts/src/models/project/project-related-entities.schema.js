"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const organization_business_value_schema_1 = require("../organization/organization-business-value.schema");
const user_business_value_schema_1 = require("../user/user-business-value.schema");
exports.ProjectRelatedEntitiesSchema = zod_1.z.object({
    organization: organization_business_value_schema_1.OrganizationBusinessValueSchema,
    projectMembers: zod_1.z.array(user_business_value_schema_1.UserBusinessValueSchema).nullable().optional(),
    customer: user_business_value_schema_1.UserBusinessValueSchema.nullable().optional(),
    responsibleManager: user_business_value_schema_1.UserBusinessValueSchema,
});
