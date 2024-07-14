"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleBusinessValueSchema = void 0;
const role_schema_1 = require("./role.schema");
exports.RoleBusinessValueSchema = role_schema_1.RoleSchema.pick({
    uuid: true,
    idRole: true,
    name: true,
    description: true,
    lastChangeByUserUuid: true,
});
