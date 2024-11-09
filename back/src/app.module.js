"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var roles_module_1 = require("./modules/roles/roles.module");
var core_1 = require("@nestjs/core");
var user_interceptor_1 = require("./common/interceptors/user.interceptor");
var nestjs_zod_1 = require("nestjs-zod");
var user_module_1 = require("./modules/user/user.module");
var handbook_module_1 = require("./modules/handbook/handbook.module");
var organization_module_1 = require("./modules/organization/organization.module");
var auth_module_1 = require("./modules/auth/auth.module");
var project_module_1 = require("./modules/project/project.module");
var database_1 = require("./modules/common/database");
var workspace_module_1 = require("./modules/workspace/workspace.module");
var app_info_module_1 = require("./modules/app-info/app-info.module");
var cache_manager_1 = require("@nestjs/cache-manager");
var global_category_material_module_1 = require("./modules/global-category-material/global-category-material.module");
var winston_module_1 = require("nest-winston/dist/winston.module");
var logger_config_1 = require("logger/logger-config");
var category_material_module_1 = require("./modules/category-material/category-material.module");
var status_resource_module_1 = require("./modules/status-resource/status-resource.module");
var material_module_1 = require("./modules/material/material.module");
var field_variants_for_selector_field_type_module_1 = require("./modules/field-variants-for-selector-field-type/field-variants-for-selector-field-type.module");
var field_unit_measurement_module_1 = require("./modules/field-unit-measurement/field-unit-measurement.module");
var field_type_module_1 = require("./modules/field-type/field-type.module");
var field_of_category_material_module_1 = require("./modules/field-of-category-material/field-of-category-material.module");
var price_changing_module_1 = require("./modules/price-changing/price-changing.module");
var responsible_partner_producer_module_1 = require("./modules/responsible-partner-producer/responsible-partner-producer.module");
var characteristics_material_module_1 = require("./modules/characteristics-material/characteristics-material.module");
var cache_manager_redis_yet_1 = require("cache-manager-redis-yet");
var tech_log_changes_module_1 = require("./modules/tech/tech-log-changes/tech-log-changes.module");
var s3_minio_module_1 = require("./modules/s3-minio/s3-minio.module");
// import { AutomapperModule } from '@numart/automapper/nestjs';
// import { classes } from '@numart/automapper/classes';
var status_approve_module_1 = require("./modules/status-approve/status-approve.module");
var logger = new logger_config_1.LoggerConfig();
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    envFilePath: ".".concat(process.env.NODE_ENV, ".env"),
                    isGlobal: true,
                    // validate: config => validateConfig(config),
                }),
                database_1.DatabaseModule,
                winston_module_1.WinstonModule.forRoot(logger.configureLogger()),
                // AutomapperModule.forRoot({
                //   strategyInitializer: classes(),
                // }),
                cache_manager_1.CacheModule.registerAsync({
                    isGlobal: true,
                    useFactory: function () { return __awaiter(void 0, void 0, void 0, function () {
                        var store, error_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, (0, cache_manager_redis_yet_1.redisStore)({
                                            ttl: 10, // seconds
                                            socket: {
                                                // DOC данные подключения redis для прода
                                                host: 'redis',
                                                port: 6379,
                                                // DOC данные подключения redis для dev
                                                //host: process.env.REDIS_HOST ? process.env.HOST : 'redis',
                                                //port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
                                            },
                                        })];
                                case 1:
                                    store = _a.sent();
                                    // Проверяем подключение к Redis
                                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            reject('Redis отключен или недоступен');
                                        })];
                                case 2:
                                    // Проверяем подключение к Redis
                                    _a.sent();
                                    return [2 /*return*/, { store: store }];
                                case 3:
                                    error_1 = _a.sent();
                                    console.warn('Redis not available, falling back to in-memory cache', error_1);
                                    return [2 /*return*/, {
                                            store: undefined, // Указываем, что store не доступен
                                        }];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); },
                    // useFactory: async () => ({
                    //   store: await redisStore({
                    //     ttl: 10, // seconds
                    //     socket: {
                    //       // DOC данные подключения redis для прода
                    //       // host: 'redis',
                    //       // port: 6379,
                    //
                    //       // DOC данные подключения redis для dev
                    //       host: process.env.REDIS_HOST ? process.env.HOST : 'redis',
                    //       port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
                    //     },
                    //   }),
                    // }),
                }),
                // ServeStaticModule.forRoot({
                //   rootPath: path.resolve(__dirname, './static'),
                // }),
                s3_minio_module_1.S3MinioModule,
                auth_module_1.AuthModule,
                app_info_module_1.AppInfoModule,
                roles_module_1.RolesModule,
                user_module_1.UserModule,
                workspace_module_1.WorkspaceModule,
                handbook_module_1.HandbookModule,
                organization_module_1.OrganizationModule,
                project_module_1.ProjectModule,
                global_category_material_module_1.GlobalCategoryMaterialModule,
                category_material_module_1.CategoryMaterialModule,
                price_changing_module_1.PriceChangingModule,
                material_module_1.MaterialModule,
                field_variants_for_selector_field_type_module_1.FieldVariantsForSelectorFieldTypeModule,
                field_unit_measurement_module_1.FieldUnitMeasurementModule,
                field_type_module_1.FieldTypeModule,
                field_of_category_material_module_1.FieldOfCategoryMaterialModule,
                characteristics_material_module_1.CharacteristicsMaterialModule,
                responsible_partner_producer_module_1.ResponsiblePartnerProducerModule,
                status_resource_module_1.StatusResourceModule,
                status_approve_module_1.StatusApproveModule,
                tech_log_changes_module_1.TechLogChangesModule,
            ],
            controllers: [],
            providers: [
                {
                    provide: core_1.APP_INTERCEPTOR,
                    useClass: user_interceptor_1.UserInterceptor,
                },
                { provide: core_1.APP_INTERCEPTOR, useClass: nestjs_zod_1.ZodSerializerInterceptor },
                // {
                //   provide: APP_GUARD,
                //   useClass: AuthGuard,
                // },
                {
                    provide: core_1.APP_PIPE,
                    useClass: nestjs_zod_1.ZodValidationPipe,
                },
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
