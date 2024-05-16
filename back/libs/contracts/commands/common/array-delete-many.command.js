"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayIdRequestCommand = void 0;
const zod_1 = require("zod");
const ArrayIdRequestSchema = zod_1.z.array(zod_1.z.string().uuid());
var ArrayIdRequestCommand;
(function (ArrayIdRequestCommand) {
    ArrayIdRequestCommand.RequestParamSchema = ArrayIdRequestSchema;
})(ArrayIdRequestCommand || (exports.ArrayIdRequestCommand = ArrayIdRequestCommand = {}));
