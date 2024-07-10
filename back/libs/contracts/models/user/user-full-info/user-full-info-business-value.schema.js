"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFullInfoBusinessValueSchema = void 0;
const user_full_info_schema_1 = require("./user-full-info.schema");
exports.UserFullInfoBusinessValueSchema = user_full_info_schema_1.UserFullInfoSchema.omit({
    password: true,
    createdAt: true,
    updatedAt: true,
});
