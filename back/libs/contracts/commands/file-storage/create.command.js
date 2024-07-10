"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const FileStorageCreateResponseEntitySchema = models_1.FileStorageBusinessValueSchema;
const FileStorageCreateRequestSchema = models_1.FileStorageSchema.pick({
    nameFile: true,
    link: true,
    comment: true,
});
const FileStorageCreateResponseSchema = zod_1.z
    .object({
    data: FileStorageCreateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FileStorageCreateCommand;
(function (FileStorageCreateCommand) {
    FileStorageCreateCommand.RequestSchema = FileStorageCreateRequestSchema;
    FileStorageCreateCommand.ResponseSchema = FileStorageCreateResponseSchema;
    FileStorageCreateCommand.ResponseEntitySchema = FileStorageCreateResponseEntitySchema;
})(FileStorageCreateCommand || (exports.FileStorageCreateCommand = FileStorageCreateCommand = {}));
