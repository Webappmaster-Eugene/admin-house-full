"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const file_storage_business_value_schema_1 = require("../../models/file-storage/file-storage-business-value.schema");
const FileStorageGetAllResponseEntitySchema = zod_1.z.array(file_storage_business_value_schema_1.FileStorageBusinessValueSchema);
const FileStorageGetAllResponseSchema = zod_1.z
    .object({
    data: FileStorageGetAllResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FileStorageGetAllCommand;
(function (FileStorageGetAllCommand) {
    FileStorageGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    FileStorageGetAllCommand.ResponseSchema = FileStorageGetAllResponseSchema;
    FileStorageGetAllCommand.ResponseEntitySchema = FileStorageGetAllResponseEntitySchema;
})(FileStorageGetAllCommand || (exports.FileStorageGetAllCommand = FileStorageGetAllCommand = {}));
