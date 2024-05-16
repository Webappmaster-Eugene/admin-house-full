"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const AppInfoGetResponseSchema = zod_1.z
    .object({
    data: models_2.AppInfoSchema.omit({
        uuid: true,
    }),
})
    .merge(models_1.ResponseClientSchema);
var AppInfoGetCommand;
(function (AppInfoGetCommand) {
    AppInfoGetCommand.ResponseSchema = AppInfoGetResponseSchema;
})(AppInfoGetCommand || (exports.AppInfoGetCommand = AppInfoGetCommand = {}));
