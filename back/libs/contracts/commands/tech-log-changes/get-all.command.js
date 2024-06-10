"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechLogChangesGetAllCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const TechLogChangesGetAllResponseEntitySchema = zod_1.z.array(models_1.TechLogChangesSchema.pick({
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
}));
const TechLogChangesGetAllResponseSchema = zod_1.z
    .object({
    data: TechLogChangesGetAllResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var TechLogChangesGetAllCommand;
(function (TechLogChangesGetAllCommand) {
    TechLogChangesGetAllCommand.RequestQuerySchema = models_1.RequestGetAllQuerySchema;
    TechLogChangesGetAllCommand.ResponseSchema = TechLogChangesGetAllResponseSchema;
    TechLogChangesGetAllCommand.ResponseEntitySchema = TechLogChangesGetAllResponseEntitySchema;
})(TechLogChangesGetAllCommand || (exports.TechLogChangesGetAllCommand = TechLogChangesGetAllCommand = {}));
