"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const AppInfoGetResponseEntitySchema = models_1.AppInfoBusinessValueSchema;
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
