"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const FileStorageGetResponseEntitySchema = models_1.FileStorageSchema.pick({
    nameFile: true,
    link: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
});
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