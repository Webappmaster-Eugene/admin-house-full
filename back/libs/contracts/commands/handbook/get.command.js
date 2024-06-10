"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandbookGetCommand = void 0;
const zod_1 = require("zod");
const models_1 = require("../../models");
const models_2 = require("../../models");
const HandbookGetResponseEntitySchema = models_1.HandbookSchema.pick({
    name: true,
    description: true,
    canCustomerView: true,
    uuid: true,
    responsibleManagerUuid: true,
    workspaceUuid: true,
    lastChangeByUserUuid: true,
});
const HandbookGetResponseSchema = zod_1.z
    .object({
    data: HandbookGetResponseEntitySchema,
})
    .merge(models_2.ResponseClientSchema);
var HandbookGetCommand;
(function (HandbookGetCommand) {
    HandbookGetCommand.ResponseSchema = HandbookGetResponseSchema;
    HandbookGetCommand.ResponseEntitySchema = HandbookGetResponseEntitySchema;
})(HandbookGetCommand || (exports.HandbookGetCommand = HandbookGetCommand = {}));
