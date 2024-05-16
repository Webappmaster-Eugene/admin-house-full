"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const HandbookDeleteResponseSchema = zod_1.z
    .object({
    data: models_1.HandbookSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var HandbookDeleteCommand;
(function (HandbookDeleteCommand) {
    HandbookDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    HandbookDeleteCommand.ResponseSchema = HandbookDeleteResponseSchema;
})(HandbookDeleteCommand || (exports.HandbookDeleteCommand = HandbookDeleteCommand = {}));
