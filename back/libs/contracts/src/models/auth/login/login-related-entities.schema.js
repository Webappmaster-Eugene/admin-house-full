"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const role_schema_1 = require("../../role/role.schema");
exports.LoginRelatedEntitiesSchema = zod_1.z.object({
    role: role_schema_1.RoleSchema,
});
