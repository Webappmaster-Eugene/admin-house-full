"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageDeleteCommand = void 0;
const zod_1 = require("zod");
const file_storage_business_value_schema_1 = require("../../models/file-storage/file-storage-business-value.schema");
const models_1 = require("../../models");
const common_1 = require("../../commands/common");
const FileStorageDeleteResponseEntitySchema = file_storage_business_value_schema_1.FileStorageBusinessValueSchema;
const FileStorageDeleteResponseSchema = zod_1.z
    .object({
    data: FileStorageDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FileStorageDeleteCommand;
(function (FileStorageDeleteCommand) {
    FileStorageDeleteCommand.RequestParamSchema = common_1.EntityUrlParamCommand.RequestUuidParamSchema;
    FileStorageDeleteCommand.ResponseSchema = FileStorageDeleteResponseSchema;
    FileStorageDeleteCommand.ResponseEntitySchema = FileStorageDeleteResponseEntitySchema;
})(FileStorageDeleteCommand || (exports.FileStorageDeleteCommand = FileStorageDeleteCommand = {}));
