"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceChangingRelatedEntitiesSchema = void 0;
const zod_1 = require("zod");
const material_1 = require("../material");
exports.PriceChangingRelatedEntitiesSchema = zod_1.z.object({
    material: material_1.MaterialBusinessValueSchema,
});
