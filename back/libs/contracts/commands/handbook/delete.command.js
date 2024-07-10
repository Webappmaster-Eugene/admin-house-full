"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookDeleteCommand = void 0;
const zod_1 = require("zod");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_1 = require("../../models");
const models_2 = require("../../models");
const HandbookDeleteResponseEntitySchema = models_1.HandbookBusinessValueSchema.merge(models_1.HandbookRelatedEntitiesSchema);
const HandbookDeleteResponseSchema = zod_1.z
    .object({
    data: HandbookDeleteResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var HandbookDeleteCommand;
(function (HandbookDeleteCommand) {
    HandbookDeleteCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    HandbookDeleteCommand.ResponseSchema = HandbookDeleteResponseSchema;
    HandbookDeleteCommand.ResponseEntitySchema = HandbookDeleteResponseEntitySchema;
})(HandbookDeleteCommand || (exports.HandbookDeleteCommand = HandbookDeleteCommand = {}));
