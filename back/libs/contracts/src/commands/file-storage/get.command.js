"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageGetCommand = void 0;
const zod_1 = require("zod");
const file_storage_business_value_schema_1 = require("../../models/file-storage/file-storage-business-value.schema");
const models_1 = require("../../models");
const FileStorageGetResponseEntitySchema = file_storage_business_value_schema_1.FileStorageBusinessValueSchema;
const FileStorageGetResponseSchema = zod_1.z
    .object({
    data: FileStorageGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FileStorageGetCommand;
(function (FileStorageGetCommand) {
    FileStorageGetCommand.ResponseSchema = FileStorageGetResponseSchema;
    FileStorageGetCommand.ResponseEntitySchema = FileStorageGetResponseEntitySchema;
})(FileStorageGetCommand || (exports.FileStorageGetCommand = FileStorageGetCommand = {}));
