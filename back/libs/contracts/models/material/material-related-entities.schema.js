"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const responsible_partner_producer_1 = require("../responsible-partner-producer");
const price_changing_1 = require("../price-changing");
const characteristics_material_1 = require("../characteristics-material");
const category_material_1 = require("../category-material");
const field_unit_measurement_1 = require("../field-unit-measurement");
const handbook_1 = require("../handbook");
exports.MaterialRelatedEntitiesSchema = zod_1.z.object({
    responsiblePartner: responsible_partner_producer_1.ResponsiblePartnerProducerBusinessValueSchema.nullable().optional(),
    unitMeasurement: field_unit_measurement_1.FieldUnitMeasurementBusinessValueSchema.nullable().optional(),
    handbook: handbook_1.HandbookBusinessValueSchema,
    categoryMaterial: category_material_1.CategoryMaterialBusinessValueSchema,
    characteristicsMaterial: zod_1.z.array(characteristics_material_1.CharacteristicsMaterialBusinessValueSchema).nullable().optional(),
    priceChanges: zod_1.z.array(price_changing_1.PriceChangingBusinessValueSchema).nullable().optional(),
});
