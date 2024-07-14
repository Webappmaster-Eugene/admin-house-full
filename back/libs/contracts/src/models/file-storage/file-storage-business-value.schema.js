"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageBusinessValueSchema = void 0;
const file_storage_schema_1 = require("./file-storage.schema");
exports.FileStorageBusinessValueSchema = file_storage_schema_1.FileStorageSchema.pick({
    nameFile: true,
    link: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
});
