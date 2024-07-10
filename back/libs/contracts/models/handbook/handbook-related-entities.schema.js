"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const field_of_category_material_1 = require("../field-of-category-material");
const category_material_1 = require("../category-material");
const field_unit_measurement_1 = require("../field-unit-measurement");
const user_1 = require("../user");
const material_1 = require("../material");
const responsible_partner_producer_1 = require("../responsible-partner-producer");
const workspace_1 = require("../workspace");
exports.HandbookRelatedEntitiesSchema = zod_1.z.object({
    categoryMaterials: zod_1.z.array(category_material_1.CategoryMaterialBusinessValueSchema).nullable().optional(),
    fieldUnitMeasurements: zod_1.z.array(field_unit_measurement_1.FieldUnitMeasurementBusinessValueSchema).nullable().optional(),
    responsibleManager: user_1.UserBusinessValueSchema,
    responsiblePartnerProducers: zod_1.z.array(responsible_partner_producer_1.ResponsiblePartnerProducerBusinessValueSchema).nullable().optional(),
    workspace: workspace_1.WorkspaceBusinessValueSchema,
    //   .merge(
    //   z.object({
    //     workspaceMembers: z.array(UserBusinessValueSchema).nullable().optional(),
    //     organizations: z.array(OrganizationBusinessValueSchema).nullable().optional(),
    //   }),
    // ),
    materials: zod_1.z.array(material_1.MaterialBusinessValueSchema).nullable().optional(),
    fieldsOfCategoryMaterials: zod_1.z.array(field_of_category_material_1.FieldOfCategoryMaterialBusinessValueSchema).nullable().optional(),
});
