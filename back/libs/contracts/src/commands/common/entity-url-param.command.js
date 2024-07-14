"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityUrlParamCommand = void 0;
const zod_1 = require("zod");
const EntityIdRequestParamSchema = zod_1.z.string();
const EntityEmailRequestParamSchema = zod_1.z.string().email();
const EntityNumberRequestParamSchema = zod_1.z.number().nonnegative().finite();
var EntityUrlParamCommand;
(function (EntityUrlParamCommand) {
    EntityUrlParamCommand.RequestUuidParamSchema = EntityIdRequestParamSchema;
    EntityUrlParamCommand.RequestEmailParamSchema = EntityEmailRequestParamSchema;
    EntityUrlParamCommand.RequestNumberParamSchema = EntityNumberRequestParamSchema;
})(EntityUrlParamCommand || (exports.EntityUrlParamCommand = EntityUrlParamCommand = {}));
