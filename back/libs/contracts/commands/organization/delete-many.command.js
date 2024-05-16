"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSchemaDeleteManyCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const OrganizationSchemaDeleteManyRequestSchema = models_1.OrganizationSchema.pick({
    uuid: true,
});
const OrganizationSchemaDeleteManyResponseSchema = zod_1.z.object({
    deletedWorkspace: zod_1.z.array(models_1.OrganizationSchema),
    count: zod_1.z.number(),
});
var OrganizationSchemaDeleteManyCommand;
(function (OrganizationSchemaDeleteManyCommand) {
    OrganizationSchemaDeleteManyCommand.RequestSchema = OrganizationSchemaDeleteManyRequestSchema;
    OrganizationSchemaDeleteManyCommand.ResponseSchema = OrganizationSchemaDeleteManyResponseSchema;
})(OrganizationSchemaDeleteManyCommand || (exports.OrganizationSchemaDeleteManyCommand = OrganizationSchemaDeleteManyCommand = {}));
