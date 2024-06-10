"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationSchemaDeleteManyCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const OrganizationDeleteManyResponseEntitySchema = zod_1.z.array(models_1.OrganizationSchema);
const OrganizationSchemaDeleteManyRequestSchema = zod_1.z.array(models_1.OrganizationSchema.pick({
    uuid: true,
}));
const OrganizationSchemaDeleteManyResponseSchema = zod_1.z
    .object({
    data: zod_1.z.object({
        deletedOrganizations: OrganizationDeleteManyResponseEntitySchema,
        count: zod_1.z.number(),
    }),
})
    .merge(models_1.ResponseClientSchema);
var OrganizationSchemaDeleteManyCommand;
(function (OrganizationSchemaDeleteManyCommand) {
    OrganizationSchemaDeleteManyCommand.RequestSchema = OrganizationSchemaDeleteManyRequestSchema;
    OrganizationSchemaDeleteManyCommand.ResponseSchema = OrganizationSchemaDeleteManyResponseSchema;
    OrganizationSchemaDeleteManyCommand.ResponseEntitySchema = OrganizationDeleteManyResponseEntitySchema;
})(OrganizationSchemaDeleteManyCommand || (exports.OrganizationSchemaDeleteManyCommand = OrganizationSchemaDeleteManyCommand = {}));
