"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppInfoUpdateCommand = void 0;
const zod_1 = require("zod");
const app_info_business_value_schema_1 = require("../../models/app-info/app-info-business-value.schema");
const models_1 = require("../../models");
const AppInfoUpdateResponseEntitySchema = app_info_business_value_schema_1.AppInfoBusinessValueSchema;
const AppInfoUpdateRequestSchema = models_1.AppInfoSchema.omit({
    uuid: true,
});
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
