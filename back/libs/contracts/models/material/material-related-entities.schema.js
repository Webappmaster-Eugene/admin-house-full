"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const responsible_partner_producer_1 = require("../responsible-partner-producer");
const price_changing_1 = require("../price-changing");
const characteristics_material_1 = require("../characteristics-material");
const category_material_1 = require("../category-material");
const handbook_1 = require("../handbook");
const field_unit_measurement_1 = require("../field-unit-measurement");
exports.MaterialRelatedEntitiesSchema = zod_1.z.object({
    responsiblePartner: responsible_partner_producer_1.ResponsiblePartnerProducerSchema,
    unitMeasurement: field_unit_measurement_1.FieldUnitMeasurementSchema,
    handbook: handbook_1.HandbookSchema,
    categoryMaterial: category_material_1.CategoryMaterialSchema,
    characteristicsMaterial: zod_1.z.array(characteristics_material_1.CharacteristicsMaterialSchema),
    priceChanges: zod_1.z.array(price_changing_1.PriceChangingSchema),
});
