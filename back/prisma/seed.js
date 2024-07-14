"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require(".prisma/client");
var client_2 = require("@prisma/client");
var fieldOfCategoryMaterialRegexGenerator_1 = require("../src/common/helpers/regex/fieldOfCategoryMaterialRegexGenerator");
var template_name_mapper_handler_1 = require("../src/common/helpers/handlers/template-name-mapper.handler");
var prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var ADMIN_ROLE, MANAGER_ROLE, WORKER_ROLE, CUSTOMER_ROLE, ADMIN_USER, WORKER_USER, CUSTOMER_USER, MANAGER_USER, MANAGER_WORKSPACE, MANAGER_HANDBOOK, MANAGER_ORGANIZATION, MANAGER_PROJECT, UPDATED_MANAGER_WORKSPACE, UPDATED_MANAGER_USER, UPDATED_WORKER_USER, UPDATED_CUSTOMER_USER, APP_SETTINGS, GLOBAL_CATEGORY_PEOPLE, GLOBAL_CATEGORY_MATERIALS, GLOBAL_CATEGORY_OVERHEAD, GLOBAL_CATEGORY_MECHANISMS, REGISTER_WITH_ROLE_KEY, RESOURCE_STATUS_DRAFT, RESOURCE_STATUS_CALCULATION, RESOURCE_STATUS_DEPARTURE_REQUIRED, RESOURCE_STATUS_FROM_CUSTOMER, RESOURCE_STATUS_DONE, APPROVE_STATUS_ONAPPROVAL, APPROVE_STATUS_REFUSUAL, APPROVE_STATUS_AGREED, RESPONSIBLE_PARTNER_PRODUCER_0, RESPONSIBLE_PARTNER_PRODUCER_1, RESPONSIBLE_PARTNER_PRODUCER_2, FIELD_UNIT_MEASUREMENT_0, FIELD_UNIT_MEASUREMENT_1, FIELD_UNIT_MEASUREMENT_2, FIELD_UNIT_MEASUREMENT_3, FIELD_UNIT_MEASUREMENT_4, FIELD_UNIT_MEASUREMENT_5, FIELD_UNIT_MEASUREMENT_6, FIELD_UNIT_MEASUREMENT_7, FIELD_UNIT_MEASUREMENT_8, FIELD_UNIT_MEASUREMENT_9, FIELD_UNIT_MEASUREMENT_10, FIELD_UNIT_MEASUREMENT_11, FIELD_UNIT_MEASUREMENT_12, FIELD_UNIT_MEASUREMENT_13, FIELD_UNIT_MEASUREMENT_14, FIELD_UNIT_MEASUREMENT_15, FIELD_UNIT_MEASUREMENT_16, FIELD_TYPE_0, FIELD_TYPE_1, FIELD_TYPE_2, CATEGORY_MATERIAL_0, CATEGORY_MATERIAL_1, CATEGORY_MATERIAL_2, CATEGORY_MATERIAL_3, CATEGORY_MATERIAL_4, CATEGORY_MATERIAL_5, CATEGORY_MATERIAL_6, CATEGORY_MATERIAL_7, CATEGORY_MATERIAL_8, FIELD_OF_CATEGORY_MATERIAL_0, FIELD_OF_CATEGORY_MATERIAL_1, FIELD_OF_CATEGORY_MATERIAL_2, FIELD_OF_CATEGORY_MATERIAL_3, FIELD_OF_CATEGORY_MATERIAL_4, FIELD_OF_CATEGORY_MATERIAL_5, FIELD_OF_CATEGORY_MATERIAL_6, FIELD_OF_CATEGORY_MATERIAL_7, FIELD_OF_CATEGORY_MATERIAL_8, FIELD_OF_CATEGORY_MATERIAL_9, FIELD_OF_CATEGORY_MATERIAL_10, FIELD_OF_CATEGORY_MATERIAL_11, UPDATED_FIELD_OF_CATEGORY_MATERIAL_0, UPDATED_FIELD_OF_CATEGORY_MATERIAL_1, UPDATED_FIELD_OF_CATEGORY_MATERIAL_2, UPDATED_FIELD_OF_CATEGORY_MATERIAL_3, UPDATED_FIELD_OF_CATEGORY_MATERIAL_4, UPDATED_FIELD_OF_CATEGORY_MATERIAL_5, UPDATED_FIELD_OF_CATEGORY_MATERIAL_6, UPDATED_FIELD_OF_CATEGORY_MATERIAL_7, UPDATED_FIELD_OF_CATEGORY_MATERIAL_8, UPDATED_FIELD_OF_CATEGORY_MATERIAL_9, UPDATED_FIELD_OF_CATEGORY_MATERIAL_10, UPDATED_FIELD_OF_CATEGORY_MATERIAL_11, CATEGORY_MATERIAL_COVER_UPDATED, CATEGORY_MATERIAL_HARDWARE_UPDATED, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_0, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_1, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_2, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_3, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_4, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_5, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_6, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_7, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_8, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_9, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_10, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_11, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_12, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_13, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_14, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_15, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_16, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_17, FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_18, MATERIAL_UNIT_0, MATERIAL_UNIT_1, MATERIAL_UNIT_2, CHARACTERISTICS_MATERIAL_OF_GLUHAR_0, CHARACTERISTICS_MATERIAL_OF_GLUHAR_1, CHARACTERISTICS_MATERIAL_OF_GLUHAR_2, CHARACTERISTICS_MATERIAL_OF_BOLT_0, CHARACTERISTICS_MATERIAL_OF_BOLT_1, CHARACTERISTICS_MATERIAL_OF_BOLT_2, CHARACTERISTICS_MATERIAL_OF_FANERA_0, CHARACTERISTICS_MATERIAL_OF_FANERA_1, CHARACTERISTICS_MATERIAL_OF_FANERA_2, CHARACTERISTICS_MATERIAL_OF_FANERA_3, CHARACTERISTICS_MATERIAL_OF_FANERA_4, CHARACTERISTICS_MATERIAL_OF_FANERA_5, CHARACTERISTICS_MATERIAL_OF_FANERA_6, CHARACTERISTICS_MATERIAL_OF_FANERA_7, CHARACTERISTICS_MATERIAL_OF_FANERA_8, newNameGluhar, UPDATED_MATERIAL_GLUHAR;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63, _64, _65, _66, _67, _68, _69, _70, _71, _72, _73, _74, _75, _76, _77, _78, _79, _80, _81, _82, _83, _84, _85, _86, _87, _88, _89, _90, _91, _92, _93, _94, _95, _96, _97, _98, _99, _100, _101;
        return __generator(this, function (_102) {
            switch (_102.label) {
                case 0: return [4 /*yield*/, ((_a = prisma === null || prisma === void 0 ? void 0 : prisma.role) === null || _a === void 0 ? void 0 : _a.create({
                        data: {
                            name: 'ADMIN',
                            description: 'Админ всего ПО (приложения)',
                        },
                    }))];
                case 1:
                    ADMIN_ROLE = _102.sent();
                    return [4 /*yield*/, ((_b = prisma === null || prisma === void 0 ? void 0 : prisma.role) === null || _b === void 0 ? void 0 : _b.create({
                            data: {
                                name: 'MANAGER',
                                description: 'Менеджер проекта, руководитель организации',
                            },
                        }))];
                case 2:
                    MANAGER_ROLE = _102.sent();
                    return [4 /*yield*/, ((_c = prisma === null || prisma === void 0 ? void 0 : prisma.role) === null || _c === void 0 ? void 0 : _c.create({
                            data: {
                                name: 'WORKER',
                                description: 'Сотрудник организации',
                            },
                        }))];
                case 3:
                    WORKER_ROLE = _102.sent();
                    return [4 /*yield*/, ((_d = prisma === null || prisma === void 0 ? void 0 : prisma.role) === null || _d === void 0 ? void 0 : _d.create({
                            data: {
                                name: 'CUSTOMER',
                                description: 'Заказчик, покупатель',
                            },
                        }))];
                case 4:
                    CUSTOMER_ROLE = _102.sent();
                    return [4 /*yield*/, ((_e = prisma === null || prisma === void 0 ? void 0 : prisma.user) === null || _e === void 0 ? void 0 : _e.create({
                            data: {
                                email: 'admin@mail.ru',
                                password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
                                roleUuid: ADMIN_ROLE.uuid,
                                firstName: 'Admin',
                                secondName: 'Starter',
                                phone: '+79999999999',
                                info: 'Standard information',
                            },
                        }))];
                case 5:
                    ADMIN_USER = _102.sent();
                    return [4 /*yield*/, ((_f = prisma === null || prisma === void 0 ? void 0 : prisma.user) === null || _f === void 0 ? void 0 : _f.create({
                            data: {
                                email: 'worker@mail.ru',
                                password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
                                roleUuid: WORKER_ROLE.uuid,
                                firstName: 'Worker',
                                secondName: 'Starter',
                                phone: '+79999999999',
                                info: 'Standard information',
                            },
                        }))];
                case 6:
                    WORKER_USER = _102.sent();
                    return [4 /*yield*/, ((_g = prisma === null || prisma === void 0 ? void 0 : prisma.user) === null || _g === void 0 ? void 0 : _g.create({
                            data: {
                                email: 'customer@mail.ru',
                                password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
                                roleUuid: CUSTOMER_ROLE.uuid,
                                firstName: 'Customer',
                                secondName: 'Starter',
                                phone: '+79999999999',
                                info: 'Standard information',
                            },
                        }))];
                case 7:
                    CUSTOMER_USER = _102.sent();
                    return [4 /*yield*/, ((_h = prisma === null || prisma === void 0 ? void 0 : prisma.user) === null || _h === void 0 ? void 0 : _h.create({
                            data: {
                                email: 'manager@mail.ru',
                                password: '$argon2id$v=19$m=65536,t=3,p=4$3bpIaorqAZ434ppom9guDA$AZn9O+A25nMhB0r+D1FoTZX/RS/vhFiGVlpZCer9+ps',
                                roleUuid: MANAGER_ROLE.uuid,
                                firstName: 'Manager',
                                secondName: 'Starter',
                                phone: '+79999999999',
                                info: 'Standard information',
                            },
                        }))];
                case 8:
                    MANAGER_USER = _102.sent();
                    return [4 /*yield*/, ((_j = prisma === null || prisma === void 0 ? void 0 : prisma.workspace) === null || _j === void 0 ? void 0 : _j.create({
                            data: {
                                name: 'Admin House Workspace',
                                description: 'Admin House Workspace - SaaS для эффективного контроля и составления сметной документации',
                                workspaceCreatorUuid: MANAGER_USER.uuid,
                            },
                        }))];
                case 9:
                    MANAGER_WORKSPACE = _102.sent();
                    return [4 /*yield*/, ((_k = prisma === null || prisma === void 0 ? void 0 : prisma.handbook) === null || _k === void 0 ? void 0 : _k.create({
                            data: {
                                name: 'Admin House Handbook',
                                description: 'Admin House Handbook - справочник ресурсов для эффективного контроля и составления сметной документации',
                                responsibleManagerUuid: MANAGER_USER.uuid,
                                workspaceUuid: MANAGER_WORKSPACE.uuid,
                            },
                        }))];
                case 10:
                    MANAGER_HANDBOOK = _102.sent();
                    return [4 /*yield*/, ((_l = prisma === null || prisma === void 0 ? void 0 : prisma.organization) === null || _l === void 0 ? void 0 : _l.create({
                            data: {
                                name: 'Admin House Organization',
                                description: 'Admin House Organization - организация, занимающаяся постройкой домов',
                                workspaceUuid: MANAGER_WORKSPACE.uuid,
                                organizationLeaderUuid: MANAGER_USER.uuid,
                            },
                        }))];
                case 11:
                    MANAGER_ORGANIZATION = _102.sent();
                    return [4 /*yield*/, ((_m = prisma === null || prisma === void 0 ? void 0 : prisma.project) === null || _m === void 0 ? void 0 : _m.create({
                            data: {
                                name: 'Admin House Project - дом №1',
                                description: 'Admin House Project - постройка частного дома 100м2 в Санкт-Петербурге',
                                responsibleManagerUuid: MANAGER_USER.uuid,
                                customerUuid: CUSTOMER_USER.uuid,
                                customerMail: CUSTOMER_USER.email,
                                organizationUuid: MANAGER_ORGANIZATION.uuid,
                            },
                        }))];
                case 12:
                    MANAGER_PROJECT = _102.sent();
                    return [4 /*yield*/, ((_o = prisma === null || prisma === void 0 ? void 0 : prisma.workspace) === null || _o === void 0 ? void 0 : _o.update({
                            where: {
                                uuid: MANAGER_WORKSPACE.uuid,
                            },
                            data: {
                                handbookOfWorkspaceUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 13:
                    UPDATED_MANAGER_WORKSPACE = _102.sent();
                    return [4 /*yield*/, ((_p = prisma === null || prisma === void 0 ? void 0 : prisma.user) === null || _p === void 0 ? void 0 : _p.update({
                            where: {
                                uuid: MANAGER_USER.uuid,
                            },
                            data: {
                                creatorOfWorkspaceUuid: MANAGER_WORKSPACE.uuid,
                                handbookManagerUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 14:
                    UPDATED_MANAGER_USER = _102.sent();
                    return [4 /*yield*/, ((_q = prisma === null || prisma === void 0 ? void 0 : prisma.user) === null || _q === void 0 ? void 0 : _q.update({
                            where: {
                                uuid: WORKER_USER.uuid,
                            },
                            data: {
                                memberOfWorkspaceUuid: MANAGER_WORKSPACE.uuid,
                                memberOfOrganizationUuid: MANAGER_ORGANIZATION.uuid,
                                memberOfProjectUuid: MANAGER_PROJECT.uuid,
                            },
                        }))];
                case 15:
                    UPDATED_WORKER_USER = _102.sent();
                    return [4 /*yield*/, ((_r = prisma === null || prisma === void 0 ? void 0 : prisma.user) === null || _r === void 0 ? void 0 : _r.update({
                            where: {
                                uuid: CUSTOMER_USER.uuid,
                            },
                            data: {
                                memberOfWorkspaceUuid: MANAGER_WORKSPACE.uuid,
                                memberOfOrganizationUuid: MANAGER_ORGANIZATION.uuid,
                                memberOfProjectUuid: MANAGER_PROJECT.uuid,
                            },
                        }))];
                case 16:
                    UPDATED_CUSTOMER_USER = _102.sent();
                    return [4 /*yield*/, ((_s = prisma === null || prisma === void 0 ? void 0 : prisma.appInfo) === null || _s === void 0 ? void 0 : _s.create({
                            data: {
                                name: 'Admin House - SaaS для эффективного контроля и составления сметной документации',
                                description: 'Настройки приложения Admin House',
                                comment: 'Описание приложения Admin House',
                                currency: 'RUB',
                                status: 'UP',
                                language: 'RUSSIAN',
                            },
                        }))];
                case 17:
                    APP_SETTINGS = _102.sent();
                    return [4 /*yield*/, ((_t = prisma === null || prisma === void 0 ? void 0 : prisma.globalCategoryMaterial) === null || _t === void 0 ? void 0 : _t.create({
                            data: {
                                name: 'PEOPLE',
                                nameRu: 'Люди',
                                comment: 'Рабочие на проекте',
                                color: '#CD5C5C',
                            },
                        }))];
                case 18:
                    GLOBAL_CATEGORY_PEOPLE = _102.sent();
                    return [4 /*yield*/, ((_u = prisma === null || prisma === void 0 ? void 0 : prisma.globalCategoryMaterial) === null || _u === void 0 ? void 0 : _u.create({
                            data: {
                                name: 'MATERIALS',
                                nameRu: 'Материалы',
                                comment: 'Материалы для стройки',
                                color: '#ADFF2F',
                            },
                        }))];
                case 19:
                    GLOBAL_CATEGORY_MATERIALS = _102.sent();
                    return [4 /*yield*/, ((_v = prisma === null || prisma === void 0 ? void 0 : prisma.globalCategoryMaterial) === null || _v === void 0 ? void 0 : _v.create({
                            data: {
                                name: 'OVERHEAD',
                                nameRu: 'Накладные',
                                comment: 'Накладные (документация)',
                                color: '#EE82EE',
                            },
                        }))];
                case 20:
                    GLOBAL_CATEGORY_OVERHEAD = _102.sent();
                    return [4 /*yield*/, ((_w = prisma === null || prisma === void 0 ? void 0 : prisma.globalCategoryMaterial) === null || _w === void 0 ? void 0 : _w.create({
                            data: {
                                name: 'MECHANISMS',
                                nameRu: 'Механизмы',
                                comment: 'Механизмы для постройки',
                                color: '#00BFFF',
                            },
                        }))];
                case 21:
                    GLOBAL_CATEGORY_MECHANISMS = _102.sent();
                    return [4 /*yield*/, ((_x = prisma === null || prisma === void 0 ? void 0 : prisma.registerWithRoleKey) === null || _x === void 0 ? void 0 : _x.create({
                            data: {
                                key: process.env.STRICT_ADMIN_KEY,
                            },
                        }))];
                case 22:
                    REGISTER_WITH_ROLE_KEY = _102.sent();
                    return [4 /*yield*/, ((_y = prisma === null || prisma === void 0 ? void 0 : prisma.statusResource) === null || _y === void 0 ? void 0 : _y.create({
                            data: {
                                name: 'Черновик',
                                comment: 'Статус ресурса - черновик',
                            },
                        }))];
                case 23:
                    RESOURCE_STATUS_DRAFT = _102.sent();
                    return [4 /*yield*/, ((_z = prisma === null || prisma === void 0 ? void 0 : prisma.statusResource) === null || _z === void 0 ? void 0 : _z.create({
                            data: {
                                name: 'Расчёт',
                                comment: 'Статус ресурса - расчёт',
                            },
                        }))];
                case 24:
                    RESOURCE_STATUS_CALCULATION = _102.sent();
                    return [4 /*yield*/, ((_0 = prisma === null || prisma === void 0 ? void 0 : prisma.statusResource) === null || _0 === void 0 ? void 0 : _0.create({
                            data: {
                                name: 'Требуется выезд',
                                comment: 'Статус ресурса - требуется выезд',
                            },
                        }))];
                case 25:
                    RESOURCE_STATUS_DEPARTURE_REQUIRED = _102.sent();
                    return [4 /*yield*/, ((_1 = prisma === null || prisma === void 0 ? void 0 : prisma.statusResource) === null || _1 === void 0 ? void 0 : _1.create({
                            data: {
                                name: 'С заказчика',
                                comment: 'Статус ресурса - с заказчика',
                            },
                        }))];
                case 26:
                    RESOURCE_STATUS_FROM_CUSTOMER = _102.sent();
                    return [4 /*yield*/, ((_2 = prisma === null || prisma === void 0 ? void 0 : prisma.statusResource) === null || _2 === void 0 ? void 0 : _2.create({
                            data: {
                                name: 'Готово',
                                comment: 'Статус ресурса - готово',
                            },
                        }))];
                case 27:
                    RESOURCE_STATUS_DONE = _102.sent();
                    return [4 /*yield*/, ((_3 = prisma === null || prisma === void 0 ? void 0 : prisma.statusApprove) === null || _3 === void 0 ? void 0 : _3.create({
                            data: {
                                name: client_2.EApproveStatuses.ONAPPROVAL,
                                nameRu: 'На согласовании',
                                comment: 'На согласовании с заказчиком',
                            },
                        }))];
                case 28:
                    APPROVE_STATUS_ONAPPROVAL = _102.sent();
                    return [4 /*yield*/, ((_4 = prisma === null || prisma === void 0 ? void 0 : prisma.statusApprove) === null || _4 === void 0 ? void 0 : _4.create({
                            data: {
                                name: client_2.EApproveStatuses.REFUSUAL,
                                nameRu: 'Отказано',
                                comment: 'Заказчик отказал в согласованиии сметы',
                            },
                        }))];
                case 29:
                    APPROVE_STATUS_REFUSUAL = _102.sent();
                    return [4 /*yield*/, ((_5 = prisma === null || prisma === void 0 ? void 0 : prisma.statusApprove) === null || _5 === void 0 ? void 0 : _5.create({
                            data: {
                                name: client_2.EApproveStatuses.AGREED,
                                nameRu: 'Согласовано',
                                comment: 'Заказчик одобрил смету',
                            },
                        }))];
                case 30:
                    APPROVE_STATUS_AGREED = _102.sent();
                    return [4 /*yield*/, ((_6 = prisma === null || prisma === void 0 ? void 0 : prisma.responsiblePartnerProducer) === null || _6 === void 0 ? void 0 : _6.create({
                            data: {
                                name: 'ООО Лучи',
                                comment: 'Наша собственная дочерняя компания - ООО Лучи',
                                info: 'Не будем искать подрядчика на стороне',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                email: 'luchi@mail.ru',
                                phone: '+79996054567',
                            },
                        }))];
                case 31:
                    RESPONSIBLE_PARTNER_PRODUCER_0 = _102.sent();
                    return [4 /*yield*/, ((_7 = prisma === null || prisma === void 0 ? void 0 : prisma.responsiblePartnerProducer) === null || _7 === void 0 ? void 0 : _7.create({
                            data: {
                                name: 'ООО СВЕЗА',
                                comment: 'СВЕЗА',
                                info: 'СВЕЗА',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                email: 'sveza@mail.ru',
                                phone: '+79996054569',
                            },
                        }))];
                case 32:
                    RESPONSIBLE_PARTNER_PRODUCER_1 = _102.sent();
                    return [4 /*yield*/, ((_8 = prisma === null || prisma === void 0 ? void 0 : prisma.responsiblePartnerProducer) === null || _8 === void 0 ? void 0 : _8.create({
                            data: {
                                name: 'Grand Line',
                                comment: 'Grand Line',
                                info: 'Grand Line',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                email: 'grandline@mail.ru',
                                phone: '+79996054569',
                            },
                        }))];
                case 33:
                    RESPONSIBLE_PARTNER_PRODUCER_2 = _102.sent();
                    return [4 /*yield*/, ((_9 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _9 === void 0 ? void 0 : _9.create({
                            data: {
                                name: 'м3',
                                comment: 'Метры кубические',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 34:
                    FIELD_UNIT_MEASUREMENT_0 = _102.sent();
                    return [4 /*yield*/, ((_10 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _10 === void 0 ? void 0 : _10.create({
                            data: {
                                name: 'м2',
                                comment: 'Метры квадратные',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 35:
                    FIELD_UNIT_MEASUREMENT_1 = _102.sent();
                    return [4 /*yield*/, ((_11 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _11 === void 0 ? void 0 : _11.create({
                            data: {
                                name: 'мм',
                                comment: 'Миллиметры',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 36:
                    FIELD_UNIT_MEASUREMENT_2 = _102.sent();
                    return [4 /*yield*/, ((_12 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _12 === void 0 ? void 0 : _12.create({
                            data: {
                                name: 'см',
                                comment: 'Сантиметры',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 37:
                    FIELD_UNIT_MEASUREMENT_3 = _102.sent();
                    return [4 /*yield*/, ((_13 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _13 === void 0 ? void 0 : _13.create({
                            data: {
                                name: 'пог. м',
                                comment: 'Погонные метры',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 38:
                    FIELD_UNIT_MEASUREMENT_4 = _102.sent();
                    return [4 /*yield*/, ((_14 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _14 === void 0 ? void 0 : _14.create({
                            data: {
                                name: 'м',
                                comment: 'Метры',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 39:
                    FIELD_UNIT_MEASUREMENT_5 = _102.sent();
                    return [4 /*yield*/, ((_15 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _15 === void 0 ? void 0 : _15.create({
                            data: {
                                name: 'кг',
                                comment: 'Килограммы',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 40:
                    FIELD_UNIT_MEASUREMENT_6 = _102.sent();
                    return [4 /*yield*/, ((_16 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _16 === void 0 ? void 0 : _16.create({
                            data: {
                                name: 'литр',
                                comment: 'Литры',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 41:
                    FIELD_UNIT_MEASUREMENT_7 = _102.sent();
                    return [4 /*yield*/, ((_17 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _17 === void 0 ? void 0 : _17.create({
                            data: {
                                name: 'бухта',
                                comment: 'Бухты',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 42:
                    FIELD_UNIT_MEASUREMENT_8 = _102.sent();
                    return [4 /*yield*/, ((_18 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _18 === void 0 ? void 0 : _18.create({
                            data: {
                                name: 'упаковка',
                                comment: 'Упаковки',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 43:
                    FIELD_UNIT_MEASUREMENT_9 = _102.sent();
                    return [4 /*yield*/, ((_19 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _19 === void 0 ? void 0 : _19.create({
                            data: {
                                name: 'шт.',
                                comment: 'Штуки',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 44:
                    FIELD_UNIT_MEASUREMENT_10 = _102.sent();
                    return [4 /*yield*/, ((_20 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _20 === void 0 ? void 0 : _20.create({
                            data: {
                                name: 'рулон',
                                comment: 'Рулоны',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 45:
                    FIELD_UNIT_MEASUREMENT_11 = _102.sent();
                    return [4 /*yield*/, ((_21 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _21 === void 0 ? void 0 : _21.create({
                            data: {
                                name: 'лист',
                                comment: 'Листы',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 46:
                    FIELD_UNIT_MEASUREMENT_12 = _102.sent();
                    return [4 /*yield*/, ((_22 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _22 === void 0 ? void 0 : _22.create({
                            data: {
                                name: 'месяц',
                                comment: 'Месяцы',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 47:
                    FIELD_UNIT_MEASUREMENT_13 = _102.sent();
                    return [4 /*yield*/, ((_23 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _23 === void 0 ? void 0 : _23.create({
                            data: {
                                name: 'чел.ч',
                                comment: 'Человеко-часы',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 48:
                    FIELD_UNIT_MEASUREMENT_14 = _102.sent();
                    return [4 /*yield*/, ((_24 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _24 === void 0 ? void 0 : _24.create({
                            data: {
                                name: 'чел.дн',
                                comment: 'Человеко-дни',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 49:
                    FIELD_UNIT_MEASUREMENT_15 = _102.sent();
                    return [4 /*yield*/, ((_25 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldUnitMeasurement) === null || _25 === void 0 ? void 0 : _25.create({
                            data: {
                                name: '-',
                                comment: 'Отсутствует единица измерения (не важно)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 50:
                    FIELD_UNIT_MEASUREMENT_16 = _102.sent();
                    return [4 /*yield*/, ((_26 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldType) === null || _26 === void 0 ? void 0 : _26.create({
                            data: {
                                name: 'Текст',
                                description: 'Текстовое поле',
                                jsType: 'string',
                            },
                        }))];
                case 51:
                    FIELD_TYPE_0 = _102.sent();
                    return [4 /*yield*/, ((_27 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldType) === null || _27 === void 0 ? void 0 : _27.create({
                            data: {
                                name: 'Число',
                                description: 'Числовое поле',
                                jsType: 'number',
                            },
                        }))];
                case 52:
                    FIELD_TYPE_1 = _102.sent();
                    return [4 /*yield*/, ((_28 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldType) === null || _28 === void 0 ? void 0 : _28.create({
                            data: {
                                name: 'Выпадающий список',
                                description: 'Поле - выбор из набора данных, выпадающий список',
                                jsType: 'array',
                            },
                        }))];
                case 53:
                    FIELD_TYPE_2 = _102.sent();
                    return [4 /*yield*/, ((_29 = prisma === null || prisma === void 0 ? void 0 : prisma.categoryMaterial) === null || _29 === void 0 ? void 0 : _29.create({
                            data: {
                                name: 'Листовые',
                                comment: 'Листовые материалы',
                                globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
                                templateName: '',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 54:
                    CATEGORY_MATERIAL_0 = _102.sent();
                    return [4 /*yield*/, ((_30 = prisma === null || prisma === void 0 ? void 0 : prisma.categoryMaterial) === null || _30 === void 0 ? void 0 : _30.create({
                            data: {
                                name: 'Теплоизоляция',
                                comment: 'Теплоизоляция',
                                globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
                                templateName: '',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 55:
                    CATEGORY_MATERIAL_1 = _102.sent();
                    return [4 /*yield*/, ((_31 = prisma === null || prisma === void 0 ? void 0 : prisma.categoryMaterial) === null || _31 === void 0 ? void 0 : _31.create({
                            data: {
                                name: 'Рулонные',
                                comment: 'Рулонные материалы',
                                globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
                                templateName: '',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 56:
                    CATEGORY_MATERIAL_2 = _102.sent();
                    return [4 /*yield*/, ((_32 = prisma === null || prisma === void 0 ? void 0 : prisma.categoryMaterial) === null || _32 === void 0 ? void 0 : _32.create({
                            data: {
                                name: 'Метизы',
                                comment: 'Метизы',
                                globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
                                templateName: '',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 57:
                    CATEGORY_MATERIAL_3 = _102.sent();
                    return [4 /*yield*/, ((_33 = prisma === null || prisma === void 0 ? void 0 : prisma.categoryMaterial) === null || _33 === void 0 ? void 0 : _33.create({
                            data: {
                                name: 'Фасонные элементы',
                                comment: 'Фасонные элементы',
                                globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
                                templateName: '',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 58:
                    CATEGORY_MATERIAL_4 = _102.sent();
                    return [4 /*yield*/, ((_34 = prisma === null || prisma === void 0 ? void 0 : prisma.categoryMaterial) === null || _34 === void 0 ? void 0 : _34.create({
                            data: {
                                name: 'Лес',
                                comment: 'Лес',
                                globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
                                templateName: '',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 59:
                    CATEGORY_MATERIAL_5 = _102.sent();
                    return [4 /*yield*/, ((_35 = prisma === null || prisma === void 0 ? void 0 : prisma.categoryMaterial) === null || _35 === void 0 ? void 0 : _35.create({
                            data: {
                                name: 'Другое',
                                comment: 'Другое',
                                globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
                                templateName: '',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 60:
                    CATEGORY_MATERIAL_6 = _102.sent();
                    return [4 /*yield*/, ((_36 = prisma === null || prisma === void 0 ? void 0 : prisma.categoryMaterial) === null || _36 === void 0 ? void 0 : _36.create({
                            data: {
                                name: 'Измерительные приборы',
                                comment: 'Измерительные приборы',
                                globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
                                templateName: '',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 61:
                    CATEGORY_MATERIAL_7 = _102.sent();
                    return [4 /*yield*/, ((_37 = prisma === null || prisma === void 0 ? void 0 : prisma.categoryMaterial) === null || _37 === void 0 ? void 0 : _37.create({
                            data: {
                                name: 'Шины',
                                comment: 'Шины',
                                globalCategoryMaterialUuid: GLOBAL_CATEGORY_MATERIALS.uuid,
                                templateName: '',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 62:
                    CATEGORY_MATERIAL_8 = _102.sent();
                    return [4 /*yield*/, ((_38 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _38 === void 0 ? void 0 : _38.create({
                            data: {
                                name: 'Диаметр метиза',
                                comment: 'Диаметр окружности метиза',
                                defaultValue: '5',
                                isRequired: true,
                                unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
                                fieldTypeUuid: FIELD_TYPE_1.uuid,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 63:
                    FIELD_OF_CATEGORY_MATERIAL_0 = _102.sent();
                    return [4 /*yield*/, ((_39 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _39 === void 0 ? void 0 : _39.create({
                            data: {
                                name: 'Длина метиза',
                                comment: 'Длина метиза',
                                isRequired: true,
                                unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
                                fieldTypeUuid: FIELD_TYPE_1.uuid,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 64:
                    FIELD_OF_CATEGORY_MATERIAL_1 = _102.sent();
                    return [4 /*yield*/, ((_40 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _40 === void 0 ? void 0 : _40.create({
                            data: {
                                name: 'Подтип метиза',
                                comment: 'Подтип метиза (список)',
                                isRequired: true,
                                unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
                                fieldTypeUuid: FIELD_TYPE_2.uuid,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 65:
                    FIELD_OF_CATEGORY_MATERIAL_2 = _102.sent();
                    return [4 /*yield*/, ((_41 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _41 === void 0 ? void 0 : _41.create({
                            data: {
                                name: 'Подтип листового материала',
                                comment: 'Подтип листового материала (список)',
                                isRequired: true,
                                unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
                                fieldTypeUuid: FIELD_TYPE_2.uuid,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 66:
                    FIELD_OF_CATEGORY_MATERIAL_3 = _102.sent();
                    return [4 /*yield*/, ((_42 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _42 === void 0 ? void 0 : _42.create({
                            data: {
                                name: 'Материал изготовления листового материала',
                                comment: 'Материал изготовления листового материала (список)',
                                isRequired: true,
                                unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
                                fieldTypeUuid: FIELD_TYPE_2.uuid,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 67:
                    FIELD_OF_CATEGORY_MATERIAL_4 = _102.sent();
                    return [4 /*yield*/, ((_43 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _43 === void 0 ? void 0 : _43.create({
                            data: {
                                name: 'Толщина листового материала',
                                comment: 'Толщина листового материала',
                                isRequired: true,
                                unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
                                fieldTypeUuid: FIELD_TYPE_1.uuid,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 68:
                    FIELD_OF_CATEGORY_MATERIAL_5 = _102.sent();
                    return [4 /*yield*/, ((_44 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _44 === void 0 ? void 0 : _44.create({
                            data: {
                                name: 'Ширина листового материала',
                                comment: 'Ширина листового материала',
                                isRequired: true,
                                unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
                                fieldTypeUuid: FIELD_TYPE_1.uuid,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 69:
                    FIELD_OF_CATEGORY_MATERIAL_6 = _102.sent();
                    return [4 /*yield*/, ((_45 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _45 === void 0 ? void 0 : _45.create({
                            data: {
                                name: 'Длина листового материала',
                                comment: 'Длина листового материала',
                                isRequired: true,
                                unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_2.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
                                fieldTypeUuid: FIELD_TYPE_1.uuid,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 70:
                    FIELD_OF_CATEGORY_MATERIAL_7 = _102.sent();
                    return [4 /*yield*/, ((_46 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _46 === void 0 ? void 0 : _46.create({
                            data: {
                                name: 'Сорт листового материала',
                                comment: 'Сорт листового материала (список)',
                                isRequired: true,
                                unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
                                fieldTypeUuid: FIELD_TYPE_2.uuid,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                            },
                        }))];
                case 71:
                    FIELD_OF_CATEGORY_MATERIAL_8 = _102.sent();
                    return [4 /*yield*/, ((_47 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _47 === void 0 ? void 0 : _47.create({
                            data: {
                                name: 'Марка листового материала',
                                comment: 'Марка листового материала (список)',
                                isRequired: true,
                                unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
                                fieldTypeUuid: FIELD_TYPE_2.uuid,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                lastChangeByUserUuid: MANAGER_USER.uuid,
                            },
                        }))];
                case 72:
                    FIELD_OF_CATEGORY_MATERIAL_9 = _102.sent();
                    return [4 /*yield*/, ((_48 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _48 === void 0 ? void 0 : _48.create({
                            data: {
                                name: 'ГОСТ листового материала',
                                comment: 'ГОСТ листового материала (ТУ или без требований) (список)',
                                isRequired: false,
                                unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
                                fieldTypeUuid: FIELD_TYPE_2.uuid,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                lastChangeByUserUuid: MANAGER_USER.uuid,
                            },
                        }))];
                case 73:
                    FIELD_OF_CATEGORY_MATERIAL_10 = _102.sent();
                    return [4 /*yield*/, ((_49 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _49 === void 0 ? void 0 : _49.create({
                            data: {
                                name: 'Вид шины',
                                comment: 'Вид шины (список)',
                                isRequired: false,
                                unitOfMeasurementUuid: FIELD_UNIT_MEASUREMENT_16.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_8.uuid,
                                fieldTypeUuid: FIELD_TYPE_2.uuid,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                lastChangeByUserUuid: MANAGER_USER.uuid,
                            },
                        }))];
                case 74:
                    FIELD_OF_CATEGORY_MATERIAL_11 = _102.sent();
                    return [4 /*yield*/, ((_50 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _50 === void 0 ? void 0 : _50.update({
                            where: {
                                uuid: FIELD_OF_CATEGORY_MATERIAL_0.uuid,
                            },
                            data: {
                                uniqueNameForTemplate: "{{#".concat((0, fieldOfCategoryMaterialRegexGenerator_1.regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator)(FIELD_OF_CATEGORY_MATERIAL_0.name), "_").concat(FIELD_OF_CATEGORY_MATERIAL_0.uuid, "_").concat(FIELD_OF_CATEGORY_MATERIAL_0.categoryMaterialUuid, "}}"),
                            },
                        }))];
                case 75:
                    UPDATED_FIELD_OF_CATEGORY_MATERIAL_0 = _102.sent();
                    return [4 /*yield*/, ((_51 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _51 === void 0 ? void 0 : _51.update({
                            where: {
                                uuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
                            },
                            data: {
                                uniqueNameForTemplate: "{{#".concat((0, fieldOfCategoryMaterialRegexGenerator_1.regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator)(FIELD_OF_CATEGORY_MATERIAL_1.name), "_").concat(FIELD_OF_CATEGORY_MATERIAL_1.uuid, "_").concat(FIELD_OF_CATEGORY_MATERIAL_1.categoryMaterialUuid, "}}"),
                            },
                        }))];
                case 76:
                    UPDATED_FIELD_OF_CATEGORY_MATERIAL_1 = _102.sent();
                    return [4 /*yield*/, ((_52 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _52 === void 0 ? void 0 : _52.update({
                            where: {
                                uuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
                            },
                            data: {
                                uniqueNameForTemplate: "{{#".concat((0, fieldOfCategoryMaterialRegexGenerator_1.regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator)(FIELD_OF_CATEGORY_MATERIAL_2.name), "_").concat(FIELD_OF_CATEGORY_MATERIAL_2.uuid, "_").concat(FIELD_OF_CATEGORY_MATERIAL_2.categoryMaterialUuid, "}}"),
                            },
                        }))];
                case 77:
                    UPDATED_FIELD_OF_CATEGORY_MATERIAL_2 = _102.sent();
                    return [4 /*yield*/, ((_53 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _53 === void 0 ? void 0 : _53.update({
                            where: {
                                uuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
                            },
                            data: {
                                uniqueNameForTemplate: "{{#".concat((0, fieldOfCategoryMaterialRegexGenerator_1.regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator)(FIELD_OF_CATEGORY_MATERIAL_3.name), "_").concat(FIELD_OF_CATEGORY_MATERIAL_3.uuid, "_").concat(FIELD_OF_CATEGORY_MATERIAL_3.categoryMaterialUuid, "}}"),
                            },
                        }))];
                case 78:
                    UPDATED_FIELD_OF_CATEGORY_MATERIAL_3 = _102.sent();
                    return [4 /*yield*/, ((_54 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _54 === void 0 ? void 0 : _54.update({
                            where: {
                                uuid: FIELD_OF_CATEGORY_MATERIAL_4.uuid,
                            },
                            data: {
                                uniqueNameForTemplate: "{{#".concat((0, fieldOfCategoryMaterialRegexGenerator_1.regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator)(FIELD_OF_CATEGORY_MATERIAL_4.name), "_").concat(FIELD_OF_CATEGORY_MATERIAL_4.uuid, "_").concat(FIELD_OF_CATEGORY_MATERIAL_4.categoryMaterialUuid, "}}"),
                            },
                        }))];
                case 79:
                    UPDATED_FIELD_OF_CATEGORY_MATERIAL_4 = _102.sent();
                    return [4 /*yield*/, ((_55 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _55 === void 0 ? void 0 : _55.update({
                            where: {
                                uuid: FIELD_OF_CATEGORY_MATERIAL_5.uuid,
                            },
                            data: {
                                uniqueNameForTemplate: "{{#".concat((0, fieldOfCategoryMaterialRegexGenerator_1.regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator)(FIELD_OF_CATEGORY_MATERIAL_5.name), "_").concat(FIELD_OF_CATEGORY_MATERIAL_5.uuid, "_").concat(FIELD_OF_CATEGORY_MATERIAL_5.categoryMaterialUuid, "}}"),
                            },
                        }))];
                case 80:
                    UPDATED_FIELD_OF_CATEGORY_MATERIAL_5 = _102.sent();
                    return [4 /*yield*/, ((_56 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _56 === void 0 ? void 0 : _56.update({
                            where: {
                                uuid: FIELD_OF_CATEGORY_MATERIAL_6.uuid,
                            },
                            data: {
                                uniqueNameForTemplate: "{{#".concat((0, fieldOfCategoryMaterialRegexGenerator_1.regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator)(FIELD_OF_CATEGORY_MATERIAL_6.name), "_").concat(FIELD_OF_CATEGORY_MATERIAL_6.uuid, "_").concat(FIELD_OF_CATEGORY_MATERIAL_6.categoryMaterialUuid, "}}"),
                            },
                        }))];
                case 81:
                    UPDATED_FIELD_OF_CATEGORY_MATERIAL_6 = _102.sent();
                    return [4 /*yield*/, ((_57 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _57 === void 0 ? void 0 : _57.update({
                            where: {
                                uuid: FIELD_OF_CATEGORY_MATERIAL_7.uuid,
                            },
                            data: {
                                uniqueNameForTemplate: "{{#".concat((0, fieldOfCategoryMaterialRegexGenerator_1.regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator)(FIELD_OF_CATEGORY_MATERIAL_7.name), "_").concat(FIELD_OF_CATEGORY_MATERIAL_7.uuid, "_").concat(FIELD_OF_CATEGORY_MATERIAL_7.categoryMaterialUuid, "}}"),
                            },
                        }))];
                case 82:
                    UPDATED_FIELD_OF_CATEGORY_MATERIAL_7 = _102.sent();
                    return [4 /*yield*/, ((_58 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _58 === void 0 ? void 0 : _58.update({
                            where: {
                                uuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
                            },
                            data: {
                                uniqueNameForTemplate: "{{#".concat((0, fieldOfCategoryMaterialRegexGenerator_1.regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator)(FIELD_OF_CATEGORY_MATERIAL_8.name), "_").concat(FIELD_OF_CATEGORY_MATERIAL_8.uuid, "_").concat(FIELD_OF_CATEGORY_MATERIAL_8.categoryMaterialUuid, "}}"),
                            },
                        }))];
                case 83:
                    UPDATED_FIELD_OF_CATEGORY_MATERIAL_8 = _102.sent();
                    return [4 /*yield*/, ((_59 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _59 === void 0 ? void 0 : _59.update({
                            where: {
                                uuid: FIELD_OF_CATEGORY_MATERIAL_9.uuid,
                            },
                            data: {
                                uniqueNameForTemplate: "{{#".concat((0, fieldOfCategoryMaterialRegexGenerator_1.regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator)(FIELD_OF_CATEGORY_MATERIAL_9.name), "_").concat(FIELD_OF_CATEGORY_MATERIAL_9.uuid, "_").concat(FIELD_OF_CATEGORY_MATERIAL_9.categoryMaterialUuid, "}}"),
                            },
                        }))];
                case 84:
                    UPDATED_FIELD_OF_CATEGORY_MATERIAL_9 = _102.sent();
                    return [4 /*yield*/, ((_60 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _60 === void 0 ? void 0 : _60.update({
                            where: {
                                uuid: FIELD_OF_CATEGORY_MATERIAL_10.uuid,
                            },
                            data: {
                                uniqueNameForTemplate: "{{#".concat((0, fieldOfCategoryMaterialRegexGenerator_1.regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator)(FIELD_OF_CATEGORY_MATERIAL_10.name), "_").concat(FIELD_OF_CATEGORY_MATERIAL_10.uuid, "_").concat(FIELD_OF_CATEGORY_MATERIAL_10.categoryMaterialUuid, "}}"),
                            },
                        }))];
                case 85:
                    UPDATED_FIELD_OF_CATEGORY_MATERIAL_10 = _102.sent();
                    return [4 /*yield*/, ((_61 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldOfCategoryMaterial) === null || _61 === void 0 ? void 0 : _61.update({
                            where: {
                                uuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
                            },
                            data: {
                                //DOC - заменяем в названии все "_" и " " на "-" (а также делаем lowercase) с помощью регулярки. Формат (FIELD_OF_CATEGORY_MATERIAL: {{#название-поля-категории_uuid-поля-категории-материала_uuid-категории-материала_данного_поля
                                //DOC - превращаем в такой шаблон {{#подтип-метиза_ef792f21-a262-4e5a-90ea-1b23007e7812_ee02ad1b-b113-4048-a4cc-e30ac0244e5e}} {{#диаметр-метиза_abb883fb-7837-47e6-b092-c2a8228432b7_ee02ad1b-b113-4048-a4cc-e30ac0244e5e}}×{{#длина-метиза_53f359d8-3889-421a-9149-a2c341e06b46_ee02ad1b-b113-4048-a4cc-e30ac0244e5e}}'
                                uniqueNameForTemplate: "{{#".concat((0, fieldOfCategoryMaterialRegexGenerator_1.regexUniqueNameForTemplateFieldOfCategoryMaterialGenerator)(FIELD_OF_CATEGORY_MATERIAL_11.name), "_").concat(FIELD_OF_CATEGORY_MATERIAL_11.uuid, "_").concat(FIELD_OF_CATEGORY_MATERIAL_11.categoryMaterialUuid, "}}"),
                            },
                        }))];
                case 86:
                    UPDATED_FIELD_OF_CATEGORY_MATERIAL_11 = _102.sent();
                    return [4 /*yield*/, ((_62 = prisma === null || prisma === void 0 ? void 0 : prisma.categoryMaterial) === null || _62 === void 0 ? void 0 : _62.update({
                            where: {
                                uuid: CATEGORY_MATERIAL_0.uuid,
                            },
                            data: {
                                templateName: "".concat(UPDATED_FIELD_OF_CATEGORY_MATERIAL_3 === null || UPDATED_FIELD_OF_CATEGORY_MATERIAL_3 === void 0 ? void 0 : UPDATED_FIELD_OF_CATEGORY_MATERIAL_3.uniqueNameForTemplate, " ").concat(UPDATED_FIELD_OF_CATEGORY_MATERIAL_4 === null || UPDATED_FIELD_OF_CATEGORY_MATERIAL_4 === void 0 ? void 0 : UPDATED_FIELD_OF_CATEGORY_MATERIAL_4.uniqueNameForTemplate, " ").concat(UPDATED_FIELD_OF_CATEGORY_MATERIAL_9 === null || UPDATED_FIELD_OF_CATEGORY_MATERIAL_9 === void 0 ? void 0 : UPDATED_FIELD_OF_CATEGORY_MATERIAL_9.uniqueNameForTemplate, " ").concat(UPDATED_FIELD_OF_CATEGORY_MATERIAL_5 === null || UPDATED_FIELD_OF_CATEGORY_MATERIAL_5 === void 0 ? void 0 : UPDATED_FIELD_OF_CATEGORY_MATERIAL_5.uniqueNameForTemplate, "\u00D7").concat(UPDATED_FIELD_OF_CATEGORY_MATERIAL_6 === null || UPDATED_FIELD_OF_CATEGORY_MATERIAL_6 === void 0 ? void 0 : UPDATED_FIELD_OF_CATEGORY_MATERIAL_6.uniqueNameForTemplate, "\u00D7").concat(UPDATED_FIELD_OF_CATEGORY_MATERIAL_7 === null || UPDATED_FIELD_OF_CATEGORY_MATERIAL_7 === void 0 ? void 0 : UPDATED_FIELD_OF_CATEGORY_MATERIAL_7.uniqueNameForTemplate, " ").concat(UPDATED_FIELD_OF_CATEGORY_MATERIAL_8 === null || UPDATED_FIELD_OF_CATEGORY_MATERIAL_8 === void 0 ? void 0 : UPDATED_FIELD_OF_CATEGORY_MATERIAL_8.uniqueNameForTemplate),
                            },
                        }))];
                case 87:
                    CATEGORY_MATERIAL_COVER_UPDATED = _102.sent();
                    return [4 /*yield*/, ((_63 = prisma === null || prisma === void 0 ? void 0 : prisma.categoryMaterial) === null || _63 === void 0 ? void 0 : _63.update({
                            where: {
                                uuid: CATEGORY_MATERIAL_3.uuid,
                            },
                            data: {
                                templateName: "".concat(UPDATED_FIELD_OF_CATEGORY_MATERIAL_2 === null || UPDATED_FIELD_OF_CATEGORY_MATERIAL_2 === void 0 ? void 0 : UPDATED_FIELD_OF_CATEGORY_MATERIAL_2.uniqueNameForTemplate, " ").concat(UPDATED_FIELD_OF_CATEGORY_MATERIAL_0 === null || UPDATED_FIELD_OF_CATEGORY_MATERIAL_0 === void 0 ? void 0 : UPDATED_FIELD_OF_CATEGORY_MATERIAL_0.uniqueNameForTemplate, "\u00D7").concat(UPDATED_FIELD_OF_CATEGORY_MATERIAL_1 === null || UPDATED_FIELD_OF_CATEGORY_MATERIAL_1 === void 0 ? void 0 : UPDATED_FIELD_OF_CATEGORY_MATERIAL_1.uniqueNameForTemplate),
                            },
                        }))];
                case 88:
                    CATEGORY_MATERIAL_HARDWARE_UPDATED = _102.sent();
                    return [4 /*yield*/, ((_64 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _64 === void 0 ? void 0 : _64.create({
                            data: {
                                value: 'Саморез',
                                description: 'Саморез (метизы), подтип',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
                            },
                        }))];
                case 89:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_0 = _102.sent();
                    return [4 /*yield*/, ((_65 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _65 === void 0 ? void 0 : _65.create({
                            data: {
                                value: 'Шуруп',
                                description: 'Шуруп (метизы), подтип',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
                            },
                        }))];
                case 90:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_1 = _102.sent();
                    return [4 /*yield*/, ((_66 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _66 === void 0 ? void 0 : _66.create({
                            data: {
                                value: 'Винт',
                                description: 'Винт (метизы), подтип',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
                            },
                        }))];
                case 91:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_2 = _102.sent();
                    return [4 /*yield*/, ((_67 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _67 === void 0 ? void 0 : _67.create({
                            data: {
                                value: 'Болт сантехнический',
                                description: 'Болт сантехнический (метизы), подтип',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
                            },
                        }))];
                case 92:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_3 = _102.sent();
                    return [4 /*yield*/, ((_68 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _68 === void 0 ? void 0 : _68.create({
                            data: {
                                value: 'Фанера',
                                description: 'Фанера (листовые, подтип)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
                            },
                        }))];
                case 93:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_4 = _102.sent();
                    return [4 /*yield*/, ((_69 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _69 === void 0 ? void 0 : _69.create({
                            data: {
                                value: 'OSB',
                                description: 'OSB (листовые, подтип)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
                            },
                        }))];
                case 94:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_5 = _102.sent();
                    return [4 /*yield*/, ((_70 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _70 === void 0 ? void 0 : _70.create({
                            data: {
                                value: 'Хвойная',
                                description: 'Хвойная (листовые, материал)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
                            },
                        }))];
                case 95:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_6 = _102.sent();
                    return [4 /*yield*/, ((_71 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _71 === void 0 ? void 0 : _71.create({
                            data: {
                                value: 'Берёзовая',
                                description: 'Берёзовая (листовые, материал)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
                            },
                        }))];
                case 96:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_7 = _102.sent();
                    return [4 /*yield*/, ((_72 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _72 === void 0 ? void 0 : _72.create({
                            data: {
                                value: '4/4',
                                description: '4/4 (листовые, сорт)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
                            },
                        }))];
                case 97:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_8 = _102.sent();
                    return [4 /*yield*/, ((_73 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _73 === void 0 ? void 0 : _73.create({
                            data: {
                                value: '3/4',
                                description: '3/4 (листовые, сорт)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
                            },
                        }))];
                case 98:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_9 = _102.sent();
                    return [4 /*yield*/, ((_74 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _74 === void 0 ? void 0 : _74.create({
                            data: {
                                value: '3/3',
                                description: '3/3 (листовые, сорт)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
                            },
                        }))];
                case 99:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_10 = _102.sent();
                    return [4 /*yield*/, ((_75 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _75 === void 0 ? void 0 : _75.create({
                            data: {
                                value: '2ш/3',
                                description: '2ш/3 (листовые, сорт)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
                            },
                        }))];
                case 100:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_11 = _102.sent();
                    return [4 /*yield*/, ((_76 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _76 === void 0 ? void 0 : _76.create({
                            data: {
                                value: 'ФК',
                                description: 'ФК (листовые, марка)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
                            },
                        }))];
                case 101:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_12 = _102.sent();
                    return [4 /*yield*/, ((_77 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _77 === void 0 ? void 0 : _77.create({
                            data: {
                                value: 'ФСФ',
                                description: 'ФСФ (листовые, марка)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
                            },
                        }))];
                case 102:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_13 = _102.sent();
                    return [4 /*yield*/, ((_78 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _78 === void 0 ? void 0 : _78.create({
                            data: {
                                value: 'ЛАК',
                                description: 'ЛАК (листовые, марка)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
                            },
                        }))];
                case 103:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_14 = _102.sent();
                    return [4 /*yield*/, ((_79 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _79 === void 0 ? void 0 : _79.create({
                            data: {
                                value: 'ГОСТ',
                                description: 'ГОСТ (листовые, ГОСТ)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_10.uuid,
                            },
                        }))];
                case 104:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_15 = _102.sent();
                    return [4 /*yield*/, ((_80 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _80 === void 0 ? void 0 : _80.create({
                            data: {
                                value: 'ТУ',
                                description: 'ТУ (листовые, ГОСТ)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_10.uuid,
                            },
                        }))];
                case 105:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_16 = _102.sent();
                    return [4 /*yield*/, ((_81 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _81 === void 0 ? void 0 : _81.create({
                            data: {
                                value: 'Зимняя',
                                description: 'Зимняя (шины, вид)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
                            },
                        }))];
                case 106:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_17 = _102.sent();
                    return [4 /*yield*/, ((_82 = prisma === null || prisma === void 0 ? void 0 : prisma.fieldVariantsForSelectorFieldType) === null || _82 === void 0 ? void 0 : _82.create({
                            data: {
                                value: 'Летняя',
                                description: 'Летняя (шины, вид)',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_11.uuid,
                            },
                        }))];
                case 107:
                    FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_18 = _102.sent();
                    return [4 /*yield*/, ((_83 = prisma === null || prisma === void 0 ? void 0 : prisma.material) === null || _83 === void 0 ? void 0 : _83.create({
                            data: {
                                name: 'Саморез 6×70 (черновик)',
                                comment: 'Это те винты, которыми мы крепим доски обвязки к фундаменту',
                                price: 4.13,
                                namePublic: 'Глухарь',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
                                unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
                                responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_1.uuid,
                            },
                        }))];
                case 108:
                    MATERIAL_UNIT_0 = _102.sent();
                    return [4 /*yield*/, ((_84 = prisma === null || prisma === void 0 ? void 0 : prisma.material) === null || _84 === void 0 ? void 0 : _84.create({
                            data: {
                                name: 'Фанера Берёзовая ФСФ 18×1220×2440 4/4 (черновик)',
                                comment: 'Это ...',
                                price: 1770,
                                namePublic: 'Фанера стандартная',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_0.uuid,
                                unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_12.uuid,
                                responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_2.uuid,
                            },
                        }))];
                case 109:
                    MATERIAL_UNIT_1 = _102.sent();
                    return [4 /*yield*/, ((_85 = prisma === null || prisma === void 0 ? void 0 : prisma.material) === null || _85 === void 0 ? void 0 : _85.create({
                            data: {
                                name: 'Болт сантехнический 10×70 (черновик)',
                                comment: 'Это ...',
                                price: 0.83,
                                namePublic: 'Болт обычный',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                categoryMaterialUuid: CATEGORY_MATERIAL_3.uuid,
                                unitMeasurementUuid: FIELD_UNIT_MEASUREMENT_10.uuid,
                                responsiblePartnerUuid: RESPONSIBLE_PARTNER_PRODUCER_0.uuid,
                            },
                        }))];
                case 110:
                    MATERIAL_UNIT_2 = _102.sent();
                    return [4 /*yield*/, ((_86 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _86 === void 0 ? void 0 : _86.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_0.name,
                                materialUuid: MATERIAL_UNIT_0.uuid,
                                value: '6',
                                comment: 'там нестабильный диаметр, надо проверять',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_0.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_0.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_0.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_0.unitOfMeasurementUuid,
                            },
                        }))];
                case 111:
                    CHARACTERISTICS_MATERIAL_OF_GLUHAR_0 = _102.sent();
                    return [4 /*yield*/, ((_87 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _87 === void 0 ? void 0 : _87.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_1.name,
                                materialUuid: MATERIAL_UNIT_0.uuid,
                                value: '30',
                                comment: 'no comments',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_1.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_1.unitOfMeasurementUuid,
                            },
                        }))];
                case 112:
                    CHARACTERISTICS_MATERIAL_OF_GLUHAR_1 = _102.sent();
                    return [4 /*yield*/, ((_88 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _88 === void 0 ? void 0 : _88.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_2.name,
                                materialUuid: MATERIAL_UNIT_0.uuid,
                                value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_0.value,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_2.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_2.unitOfMeasurementUuid,
                            },
                        }))];
                case 113:
                    CHARACTERISTICS_MATERIAL_OF_GLUHAR_2 = _102.sent();
                    return [4 /*yield*/, ((_89 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _89 === void 0 ? void 0 : _89.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_0.name,
                                materialUuid: MATERIAL_UNIT_2.uuid,
                                value: '10',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_0.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_0.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_0.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_0.unitOfMeasurementUuid,
                            },
                        }))];
                case 114:
                    CHARACTERISTICS_MATERIAL_OF_BOLT_0 = _102.sent();
                    return [4 /*yield*/, ((_90 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _90 === void 0 ? void 0 : _90.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_1.name,
                                materialUuid: MATERIAL_UNIT_2.uuid,
                                value: '70',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_1.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_1.unitOfMeasurementUuid,
                            },
                        }))];
                case 115:
                    CHARACTERISTICS_MATERIAL_OF_BOLT_1 = _102.sent();
                    return [4 /*yield*/, ((_91 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _91 === void 0 ? void 0 : _91.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_2.name,
                                materialUuid: MATERIAL_UNIT_2.uuid,
                                value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_3.value,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_2.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_2.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_2.unitOfMeasurementUuid,
                            },
                        }))];
                case 116:
                    CHARACTERISTICS_MATERIAL_OF_BOLT_2 = _102.sent();
                    return [4 /*yield*/, ((_92 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _92 === void 0 ? void 0 : _92.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_3.name,
                                materialUuid: MATERIAL_UNIT_1.uuid,
                                value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_4.value,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_3.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_3.unitOfMeasurementUuid,
                            },
                        }))];
                case 117:
                    CHARACTERISTICS_MATERIAL_OF_FANERA_0 = _102.sent();
                    return [4 /*yield*/, ((_93 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _93 === void 0 ? void 0 : _93.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_3.name,
                                materialUuid: MATERIAL_UNIT_1.uuid,
                                value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_4.value,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_3.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_3.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_3.unitOfMeasurementUuid,
                            },
                        }))];
                case 118:
                    CHARACTERISTICS_MATERIAL_OF_FANERA_1 = _102.sent();
                    return [4 /*yield*/, ((_94 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _94 === void 0 ? void 0 : _94.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_4.name,
                                materialUuid: MATERIAL_UNIT_1.uuid,
                                value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_7.value,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_1.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_1.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_1.unitOfMeasurementUuid,
                            },
                        }))];
                case 119:
                    CHARACTERISTICS_MATERIAL_OF_FANERA_2 = _102.sent();
                    return [4 /*yield*/, ((_95 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _95 === void 0 ? void 0 : _95.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_5.name,
                                materialUuid: MATERIAL_UNIT_1.uuid,
                                value: '18',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_5.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_5.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_5.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_5.unitOfMeasurementUuid,
                            },
                        }))];
                case 120:
                    CHARACTERISTICS_MATERIAL_OF_FANERA_3 = _102.sent();
                    return [4 /*yield*/, ((_96 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _96 === void 0 ? void 0 : _96.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_6.name,
                                materialUuid: MATERIAL_UNIT_1.uuid,
                                value: '1220',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_6.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_6.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_6.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_6.unitOfMeasurementUuid,
                            },
                        }))];
                case 121:
                    CHARACTERISTICS_MATERIAL_OF_FANERA_4 = _102.sent();
                    return [4 /*yield*/, ((_97 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _97 === void 0 ? void 0 : _97.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_7.name,
                                materialUuid: MATERIAL_UNIT_1.uuid,
                                value: '2440',
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_7.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_7.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_7.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_7.unitOfMeasurementUuid,
                            },
                        }))];
                case 122:
                    CHARACTERISTICS_MATERIAL_OF_FANERA_5 = _102.sent();
                    return [4 /*yield*/, ((_98 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _98 === void 0 ? void 0 : _98.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_8.name,
                                materialUuid: MATERIAL_UNIT_1.uuid,
                                value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_8.value,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_8.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_8.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_8.unitOfMeasurementUuid,
                            },
                        }))];
                case 123:
                    CHARACTERISTICS_MATERIAL_OF_FANERA_6 = _102.sent();
                    return [4 /*yield*/, ((_99 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _99 === void 0 ? void 0 : _99.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_9.name,
                                materialUuid: MATERIAL_UNIT_1.uuid,
                                value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_13.value,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_9.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_9.fieldTypeUuid,
                                // categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_9.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_9.unitOfMeasurementUuid,
                            },
                        }))];
                case 124:
                    CHARACTERISTICS_MATERIAL_OF_FANERA_7 = _102.sent();
                    return [4 /*yield*/, ((_100 = prisma === null || prisma === void 0 ? void 0 : prisma.characteristicsMaterial) === null || _100 === void 0 ? void 0 : _100.create({
                            data: {
                                name: FIELD_OF_CATEGORY_MATERIAL_9.name,
                                materialUuid: MATERIAL_UNIT_1.uuid,
                                value: FIELD_VARIANTS_FOR_SELECTOR_FIELD_TYPE_13.value,
                                handbookUuid: MANAGER_HANDBOOK.uuid,
                                fieldOfCategoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_9.uuid,
                                fieldTypeUuid: FIELD_OF_CATEGORY_MATERIAL_9.fieldTypeUuid,
                                //categoryMaterialUuid: FIELD_OF_CATEGORY_MATERIAL_9.categoryMaterialUuid,
                                fieldUnitMeasurementUuid: FIELD_OF_CATEGORY_MATERIAL_9.unitOfMeasurementUuid,
                            },
                        }))];
                case 125:
                    CHARACTERISTICS_MATERIAL_OF_FANERA_8 = _102.sent();
                    return [4 /*yield*/, (0, template_name_mapper_handler_1.templateNameMapper)(CATEGORY_MATERIAL_HARDWARE_UPDATED, MATERIAL_UNIT_0, prisma)];
                case 126:
                    newNameGluhar = _102.sent();
                    return [4 /*yield*/, ((_101 = prisma === null || prisma === void 0 ? void 0 : prisma.material) === null || _101 === void 0 ? void 0 : _101.update({
                            where: {
                                uuid: MATERIAL_UNIT_0.uuid,
                            },
                            data: {
                                name: newNameGluhar,
                            },
                        }))];
                case 127:
                    UPDATED_MATERIAL_GLUHAR = _102.sent();
                    //endregion
                    console.log('UPDATED_MATERIAL_GLUHAR', UPDATED_MATERIAL_GLUHAR);
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
