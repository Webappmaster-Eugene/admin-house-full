"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechLogChangesGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const entity_url_param_command_1 = require("../common/entity-url-param.command");
const models_2 = require("../../models");
const TechLogChangesGetResponseEntitySchema = models_1.TechLogChangesSchema.pick({
    name: true,
    entity: true,
    comment: true,
    oldInfo: true,
    newInfo: true,
    updateInfo: true,
    action: true,
    uuid: true,
    createdAt: true,
    updatedAt: true,
});
const TechLogChangesGetResponseSchema = zod_1.z
    .object({
    data: TechLogChangesGetResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var TechLogChangesGetCommand;
(function (TechLogChangesGetCommand) {
    TechLogChangesGetCommand.RequestParamSchema = entity_url_param_command_1.EntityUrlParamCommand.RequestUuidParamSchema;
    TechLogChangesGetCommand.ResponseSchema = TechLogChangesGetResponseSchema;
    TechLogChangesGetCommand.ResponseEntitySchema = TechLogChangesGetResponseEntitySchema;
})(TechLogChangesGetCommand || (exports.TechLogChangesGetCommand = TechLogChangesGetCommand = {}));
