"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechLogChangesCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const TechLogChangesCreateResponseEntitySchema = models_1.TechLogChangesBusinessValueSchema;
const TechLogChangesCreateRequestSchema = models_1.TechLogChangesSchema.pick({
    updateInfo: true,
    action: true,
    oldInfo: true,
    newInfo: true,
    name: true,
    comment: true,
});
const TechLogChangesCreateResponseSchema = zod_1.z
    .object({
    data: TechLogChangesCreateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var TechLogChangesCreateCommand;
(function (TechLogChangesCreateCommand) {
    TechLogChangesCreateCommand.RequestSchema = TechLogChangesCreateRequestSchema;
    TechLogChangesCreateCommand.ResponseSchema = TechLogChangesCreateResponseSchema;
    TechLogChangesCreateCommand.ResponseEntitySchema = TechLogChangesCreateResponseEntitySchema;
})(TechLogChangesCreateCommand || (exports.TechLogChangesCreateCommand = TechLogChangesCreateCommand = {}));
