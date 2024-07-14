"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusinessValueSchema = void 0;
const user_schema_1 = require("./user.schema");
exports.UserBusinessValueSchema = user_schema_1.UserSchema.omit({
    password: true,
    createdAt: true,
    updatedAt: true,
});
