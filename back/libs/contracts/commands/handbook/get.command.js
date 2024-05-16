"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const HandbookGetResponseSchema = zod_1.z
    .object({
    data: models_1.HandbookSchema.omit({
        createdAt: true,
        updatedAt: true,
    }),
})
    .merge(models_2.ResponseClientSchema);
var HandbookGetCommand;
(function (HandbookGetCommand) {
    HandbookGetCommand.ResponseSchema = HandbookGetResponseSchema;
})(HandbookGetCommand || (exports.HandbookGetCommand = HandbookGetCommand = {}));
