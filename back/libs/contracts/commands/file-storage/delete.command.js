"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorageDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const FileStorageDeleteResponseEntitySchema = models_1.FileStorageSchema.pick({
    nameFile: true,
    link: true,
    comment: true,
    uuid: true,
    lastChangeByUserUuid: true,
    createdAt: true,
    updatedAt: true,
});
const FileStorageDeleteResponseSchema = zod_1.z
    .object({
    data: FileStorageDeleteResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var FileStorageDeleteCommand;
(function (FileStorageDeleteCommand) {
    FileStorageDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    FileStorageDeleteCommand.ResponseSchema = FileStorageDeleteResponseSchema;
    FileStorageDeleteCommand.ResponseEntitySchema = FileStorageDeleteResponseEntitySchema;
})(FileStorageDeleteCommand || (exports.FileStorageDeleteCommand = FileStorageDeleteCommand = {}));
