"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const FileStorageUpdateResponseEntitySchema = models_1.FileStorageBusinessValueSchema;
const FileStorageUpdateRequestSchema = models_1.FileStorageSchema.pick({
    comment: true,
}).partial();
const FileStorageUpdateResponseSchema = zod_1.z
    .object({
    data: FileStorageUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FileStorageUpdateCommand;
(function (FileStorageUpdateCommand) {
    FileStorageUpdateCommand.RequestSchema = FileStorageUpdateRequestSchema;
    FileStorageUpdateCommand.ResponseSchema = FileStorageUpdateResponseSchema;
    FileStorageUpdateCommand.ResponseEntitySchema = FileStorageUpdateResponseEntitySchema;
})(FileStorageUpdateCommand || (exports.FileStorageUpdateCommand = FileStorageUpdateCommand = {}));
