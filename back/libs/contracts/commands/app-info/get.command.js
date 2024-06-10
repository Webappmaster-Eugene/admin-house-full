"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const AppInfoGetResponseEntitySchema = models_2.AppInfoSchema.pick({
    name: true,
    description: true,
    currency: true,
    language: true,
    comment: true,
    status: true,
    lastChangeByUserUuid: true,
});
const AppInfoGetResponseSchema = zod_1.z
    .object({
    data: AppInfoGetResponseEntitySchema,
})
    .merge(models_1.ResponseClientSchema);
var AppInfoGetCommand;
(function (AppInfoGetCommand) {
    AppInfoGetCommand.ResponseSchema = AppInfoGetResponseSchema;
    AppInfoGetCommand.ResponseEntitySchema = AppInfoGetResponseEntitySchema;
})(AppInfoGetCommand || (exports.AppInfoGetCommand = AppInfoGetCommand = {}));
