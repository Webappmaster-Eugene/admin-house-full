"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const AppInfoUpdateResponseEntitySchema = models_1.AppInfoBusinessValueSchema;
const AppInfoUpdateRequestSchema = models_2.AppInfoSchema.omit({
    uuid: true,
})
    .partial()
    .strict();
const AppInfoUpdateResponseSchema = zod_1.z
    .object({
    data: AppInfoUpdateResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var AppInfoUpdateCommand;
(function (AppInfoUpdateCommand) {
    AppInfoUpdateCommand.RequestSchema = AppInfoUpdateRequestSchema;
    AppInfoUpdateCommand.ResponseSchema = AppInfoUpdateResponseSchema;
    AppInfoUpdateCommand.ResponseEntitySchema = AppInfoUpdateResponseEntitySchema;
})(AppInfoUpdateCommand || (exports.AppInfoUpdateCommand = AppInfoUpdateCommand = {}));
