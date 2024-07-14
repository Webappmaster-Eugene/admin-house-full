"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoBusinessValueSchema = void 0;
const app_info_schema_1 = require("./app-info.schema");
exports.AppInfoBusinessValueSchema = app_info_schema_1.AppInfoSchema.pick({
    name: true,
    description: true,
    currency: true,
    language: true,
    comment: true,
    status: true,
    lastChangeByUserUuid: true,
});
