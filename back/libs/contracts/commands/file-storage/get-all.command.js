"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const FileStorageGetAllResponseEntitySchema = zod_1.z.array(models_1.FileStorageBusinessValueSchema);
const FileStorageGetAllResponseSchema = zod_1.z
    .object({
    data: FileStorageGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var FileStorageGetAllCommand;
(function (FileStorageGetAllCommand) {
    FileStorageGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    FileStorageGetAllCommand.ResponseSchema = FileStorageGetAllResponseSchema;
    FileStorageGetAllCommand.ResponseEntitySchema = FileStorageGetAllResponseEntitySchema;
})(FileStorageGetAllCommand || (exports.FileStorageGetAllCommand = FileStorageGetAllCommand = {}));
