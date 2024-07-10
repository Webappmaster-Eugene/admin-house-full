"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationCreateCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const OrganizationCreateResponseEntitySchema = models_1.OrganizationBusinessValueSchema.merge(models_1.OrganizationRelatedEntitiesSchema);
const OrganizationCreateRequestSchema = models_1.OrganizationSchema.pick({
    name: true,
    description: true,
});
const OrganizationCreateResponseSchema = zod_1.z
    .object({
    data: OrganizationCreateResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var OrganizationCreateCommand;
(function (OrganizationCreateCommand) {
    OrganizationCreateCommand.RequestSchema = OrganizationCreateRequestSchema;
    OrganizationCreateCommand.ResponseSchema = OrganizationCreateResponseSchema;
    OrganizationCreateCommand.ResponseEntitySchema = OrganizationCreateResponseEntitySchema;
})(OrganizationCreateCommand || (exports.OrganizationCreateCommand = OrganizationCreateCommand = {}));
