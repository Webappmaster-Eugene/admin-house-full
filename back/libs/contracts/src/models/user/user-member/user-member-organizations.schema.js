"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMemberOfOrganizationsSchema = void 0;
const zod_1 = require("zod");
const organization_business_value_schema_1 = require("../../../models/organization/organization-business-value.schema");
exports.UserMemberOfOrganizationsSchema = zod_1.z.object({
    memberOfOrganizations: zod_1.z.array(organization_business_value_schema_1.OrganizationBusinessValueSchema).nullable().optional(),
});
