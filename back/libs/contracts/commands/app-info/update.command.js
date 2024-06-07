"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoUpdateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const AppInfoUpdateRequestSchema = models_2.AppInfoSchema.omit({
    uuid: true,
})
    .partial()
    .strict();
const AppInfoUpdateResponseSchema = zod_1.z
    .object({
    data: models_2.AppInfoSchema.pick({
        status: true,
        comment: true,
        language: true,
        currency: true,
        name: true,
        description: true,
        lastChangeByUserUuid: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var AppInfoUpdateCommand;
(function (AppInfoUpdateCommand) {
    AppInfoUpdateCommand.RequestSchema = AppInfoUpdateRequestSchema;
    AppInfoUpdateCommand.ResponseSchema = AppInfoUpdateResponseSchema;
})(AppInfoUpdateCommand || (exports.AppInfoUpdateCommand = AppInfoUpdateCommand = {}));
