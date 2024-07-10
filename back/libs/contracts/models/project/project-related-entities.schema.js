"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const organization_1 = require("../organization");
const user_1 = require("../user");
exports.ProjectRelatedEntitiesSchema = zod_1.z.object({
    organization: organization_1.OrganizationBusinessValueSchema,
    projectMembers: zod_1.z.array(user_1.UserBusinessValueSchema).nullable().optional(),
    customer: user_1.UserBusinessValueSchema.nullable().optional(),
    responsibleManager: user_1.UserBusinessValueSchema,
});
