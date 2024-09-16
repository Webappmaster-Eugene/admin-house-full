"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const role_business_value_schema_1 = require("../../../models/role/role-business-value.schema");
exports.RegisterRelatedEntitiesSchema = zod_1.z.object({
    roles: zod_1.z.array(role_business_value_schema_1.RoleBusinessValueSchema).nullable().optional(),
});
