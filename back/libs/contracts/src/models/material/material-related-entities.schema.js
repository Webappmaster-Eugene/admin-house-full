"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const responsible_partner_producer_business_value_schema_1 = require("../responsible-partner-producer/responsible-partner-producer-business-value.schema");
const field_unit_measurement_business_value_schema_1 = require("../field-unit-measurement/field-unit-measurement-business-value.schema");
const handbook_business_value_schema_1 = require("../handbook/handbook-business-value.schema");
const category_material_business_value_schema_1 = require("../category-material/category-material-business-value.schema");
const characteristics_material_business_value_schema_1 = require("../characteristics-material/characteristics-material-business-value.schema");
const price_changing_business_value_schema_1 = require("../price-changing/price-changing-business-value.schema");
exports.MaterialRelatedEntitiesSchema = zod_1.z.object({
    responsiblePartner: responsible_partner_producer_business_value_schema_1.ResponsiblePartnerProducerBusinessValueSchema,
    unitMeasurement: field_unit_measurement_business_value_schema_1.FieldUnitMeasurementBusinessValueSchema.nullable().optional(),
    handbook: handbook_business_value_schema_1.HandbookBusinessValueSchema,
    categoryMaterial: category_material_business_value_schema_1.CategoryMaterialBusinessValueSchema,
    characteristicsMaterial: zod_1.z.array(characteristics_material_business_value_schema_1.CharacteristicsMaterialBusinessValueSchema).nullable().optional(),
    priceChanges: zod_1.z.array(price_changing_business_value_schema_1.PriceChangingBusinessValueSchema).nullable().optional(),
});
