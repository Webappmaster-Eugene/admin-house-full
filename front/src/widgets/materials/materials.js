'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = require("moment");
var use_boolean_1 = require("@/utils/hooks/use-boolean");
var settings_1 = require("@/shared/settings");
var alert_dialog_1 = require("@/shared/dialogs/alert-dialog/alert-dialog");
var react_1 = require("react");
var templater_creator_1 = require("@/utils/helpers/templater-creator");
var new_material_id_const_1 = require("@/widgets/materials/new-material-id.const");
var editable_columns_1 = require("@/widgets/materials/editable-columns");
var required_columns_1 = require("@/widgets/materials/required-columns");
var Box_1 = require("@mui/material/Box");
var Button_1 = require("@mui/material/Button");
var Add_1 = require("@mui/icons-material/Add");
var Container_1 = require("@mui/material/Container");
var locales_1 = require("@mui/x-data-grid/locales");
var material_1 = require("@mui/material");
var Typography_1 = require("@mui/material/Typography");
var Block_1 = require("@mui/icons-material/Block");
var Check_1 = require("@mui/icons-material/Check");
var RestartAlt_1 = require("@mui/icons-material/RestartAlt");
var DeleteOutlined_1 = require("@mui/icons-material/DeleteOutlined");
var x_data_grid_1 = require("@mui/x-data-grid");
var intl_1 = require("src/utils/helpers/intl");
var uuid_regex_1 = require("src/utils/regex/uuid.regex");
var deep_equal_and_in_1 = require("src/utils/helpers/deep-equal-and-in");
var dialog_texts_1 = require("src/utils/const/dialog-texts");
var entity_activity_status_enum_1 = require("src/utils/const/entity-activity-status.enum");
var deep_equal_in_tablekeys_1 = require("src/utils/helpers/deep-equal-in-tablekeys");
var is_error_field_type_guard_1 = require("src/utils/type-guards/is-error-field.type-guard");
var material_delete_handler_1 = require("src/utils/table-handlers/materials/material-delete.handler");
var material_create_handler_1 = require("src/utils/table-handlers/materials/material-create.handler");
var material_columns_schema_enum_1 = require("src/utils/tables-schemas/material/material-columns-schema.enum");
var is_entity_category_material_type_guard_1 = require("src/utils/type-guards/is-entity-category-material.type-guard");
var is_entity_responsible_partner_type_guard_1 = require("src/utils/type-guards/is-entity-responsible-partner.type-guard");
var is_entity_field_unit_measurement_type_guard_1 = require("src/utils/type-guards/is-entity-field-unit-measurement.type-guard");
var custom_breadcrumbs_1 = require("src/shared/breadcrumbs/custom-breadcrumbs");
var workspace_store_1 = require("src/store/workspace/workspace.store");
var table_initial_state_1 = require("src/widgets/materials/table-initial-state");
var update_material_action_1 = require("src/api/actions/material/update-material.action");
var create_category_form_1 = require("src/shared/popups/create-category-form/create-category-form");
var update_material_category_action_1 = require("src/api/actions/material/update-material-category.action");
var NoRowsOverlay_1 = require("src/shared/no-rows-overlay/NoRowsOverlay");
var get_concrete_material_in_handbook_action_1 = require("src/api/actions/material/get-concrete-material-in-handbook.action");
var create_field_unit_measurement_action_1 = require("src/api/actions/field-unit-measurement/create-field-unit-measurement.action");
var delete_field_unit_measurement_action_1 = require("src/api/actions/field-unit-measurement/delete-field-unit-measurement.action");
var delete_characteristic_of_material_action_1 = require("src/api/actions/characteristics/delete-characteristic-of-material.action");
var create_characteristic_of_material_action_1 = require("src/api/actions/characteristics/create-characteristic-of-material.action");
var datagrid_materials_cell_category_1 = require("src/shared/mui-data-grid/datagrid-materials-cell-category/datagrid-materials-cell-category");
var create_field_variant_in_field_of_category_material_action_1 = require("src/api/actions/field-variants/create-field-variant-in-field-of-category-material.action");
var delete_field_variant_in_field_of_category_material_action_1 = require("src/api/actions/field-variants/delete-field-variant-in-field-of-category-material.action");
var get_all_field_unit_measurements_of_handbook_action_1 = require("src/api/actions/field-unit-measurement/get-all-field-unit-measurements-of-handbook.action");
var datagrid_materials_cell_characteristic_1 = require("src/shared/mui-data-grid/datagrid-materials-cell-characteristic/datagrid-materials-cell-characteristic");
var datagrid_materials_cell_unit_measurement_1 = require("src/shared/mui-data-grid/datagrid-materials-cell-unit-measurement/datagrid-materials-cell-unit-measurement");
var datagrid_materials_cell_name_with_icon_export_1 = require("src/shared/mui-data-grid/datagrid-materials-cell-name/components/datagrid-materials-cell-name/datagrid-materials-cell-name-with-icon.export");
function Materials(_a) {
    var _b;
    var _this = this;
    var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
    var materialsInfo = _a.materialsInfo, additionalFields = _a.additionalFields, currentCategory = _a.currentCategory;
    var settings = (0, settings_1.useSettingsContext)();
    var isDialogOpen = (0, use_boolean_1.useBoolean)();
    var isDialogCreateNewCategoryOpen = (0, use_boolean_1.useBoolean)();
    var _11 = (0, react_1.useState)({
        pageSize: 10,
        page: 0,
    }), paginationModel = _11[0], setPaginationModel = _11[1];
    var allMaterialsEntity = materialsInfo.map(function (elem) {
        var _a;
        var materialToRow = __assign(__assign({}, elem), { isNew: false });
        if (elem && (elem === null || elem === void 0 ? void 0 : elem.characteristicsMaterial)) {
            // @ts-ignore
            var characteristicsOfCurrentMaterial = (_a = elem === null || elem === void 0 ? void 0 : elem.characteristicsMaterial) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, curValue) {
                // @ts-ignore
                acc[curValue === null || curValue === void 0 ? void 0 : curValue.fieldOfCategoryMaterialUuid] = curValue;
                return acc;
            }, {});
            if (characteristicsOfCurrentMaterial) {
                materialToRow = __assign(__assign({}, materialToRow), characteristicsOfCurrentMaterial);
            }
        }
        return materialToRow;
    });
    var startLink = process.env.NEXT_PUBLIC_FRONT_ADDRESS;
    var _12 = (0, react_1.useState)(allMaterialsEntity), rows = _12[0], setRows = _12[1];
    var _13 = (0, react_1.useState)(false), isCreateRowMode = _13[0], setIsCreateRowMode = _13[1];
    var _14 = (0, react_1.useState)({}), rowModesModel = _14[0], setRowModesModel = _14[1];
    var workspaceInfo = (0, workspace_store_1.useWorkspaceInfoStore)().workspaceInfo;
    (0, react_1.useEffect)(function () {
        var allMaterialsInfoUpdatedEntity = materialsInfo.map(function (elem) {
            var _a;
            var materialToRow = __assign(__assign({}, elem), { isNew: false });
            if (elem && (elem === null || elem === void 0 ? void 0 : elem.characteristicsMaterial)) {
                // @ts-ignore
                var characteristicsOfCurrentMaterial = (_a = elem === null || elem === void 0 ? void 0 : elem.characteristicsMaterial) === null || _a === void 0 ? void 0 : _a.reduce(function (acc, curValue) {
                    // @ts-ignore
                    acc[curValue === null || curValue === void 0 ? void 0 : curValue.fieldOfCategoryMaterialUuid] = curValue;
                    return acc;
                }, {});
                if (characteristicsOfCurrentMaterial) {
                    materialToRow = __assign(__assign({}, materialToRow), characteristicsOfCurrentMaterial);
                }
            }
            return materialToRow;
        });
        setRows(allMaterialsInfoUpdatedEntity);
    }, [materialsInfo, additionalFields]);
    var handbookInfo = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.currentHandbookInfo;
    var responsiblePartners = handbookInfo === null || handbookInfo === void 0 ? void 0 : handbookInfo.responsiblePartnerProducers;
    var allFieldsOfCategoryMaterialInHandbook = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.allFieldsOfCategoryMaterialsOfHandbook;
    var allFieldTypesInWorkspace = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.allFieldTypes;
    var allCategoryMaterialsInHandbook = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.allCategoryMaterialsOfHandbook;
    var allUnitMeasurementsInHandbook = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.allFieldsUnitMeasurementsOfHandbook;
    var allFieldVariantsOfHandbook = ((workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.allFieldsVariantsOfHandbook) ||
        []);
    var allGlobalCategories = ((workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.allGlobalCategories) ||
        []);
    var workspaceId = handbookInfo === null || handbookInfo === void 0 ? void 0 : handbookInfo.workspaceUuid;
    var handbookId = handbookInfo === null || handbookInfo === void 0 ? void 0 : handbookInfo.uuid;
    var handleClickAddNewFieldVariants = function (fieldOfCategoryMaterialId_1, fieldVariantForSelectorFieldTypeId_1, createFieldVariantOfCategoryDto_1) {
        var args_1 = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            args_1[_i - 3] = arguments[_i];
        }
        return __awaiter(_this, __spreadArray([fieldOfCategoryMaterialId_1, fieldVariantForSelectorFieldTypeId_1, createFieldVariantOfCategoryDto_1], args_1, true), void 0, function (fieldOfCategoryMaterialId, fieldVariantForSelectorFieldTypeId, createFieldVariantOfCategoryDto, typeAction) {
            var newField, deletedField;
            if (typeAction === void 0) { typeAction = 'add'; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeAction === 'add' && createFieldVariantOfCategoryDto)) return [3 /*break*/, 2];
                        return [4 /*yield*/, (0, create_field_variant_in_field_of_category_material_action_1.createFieldVariantOfFieldOfCategory)(workspaceId, handbookId, fieldOfCategoryMaterialId, createFieldVariantOfCategoryDto)];
                    case 1:
                        newField = _a.sent();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(typeAction === 'delete' && fieldVariantForSelectorFieldTypeId)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, delete_field_variant_in_field_of_category_material_action_1.deleteFieldVariantOfFieldOfCategory)(workspaceId, handbookId, fieldOfCategoryMaterialId, fieldVariantForSelectorFieldTypeId)];
                    case 3:
                        deletedField = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        console.log("\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u0437\u0430\u043F\u0440\u043E\u0441\u0435: ".concat(fieldOfCategoryMaterialId, "\n       ").concat(fieldVariantForSelectorFieldTypeId, "\n        ").concat(createFieldVariantOfCategoryDto, "\n        ").concat(typeAction));
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    var handleClickAddNewCategory = function () {
        isDialogCreateNewCategoryOpen.onTrue();
    };
    var handleCreateCategoryPopupClose = function () {
        isDialogCreateNewCategoryOpen.onFalse();
    };
    var fieldsOfCurrentCategoryToTable = [];
    if (additionalFields) {
        fieldsOfCurrentCategoryToTable = additionalFields.map(function (fieldOfCurrentCategory) {
            var fieldTypeOfCellInColumnInTable = allFieldTypesInWorkspace === null || allFieldTypesInWorkspace === void 0 ? void 0 : allFieldTypesInWorkspace.find(function (field) { return field.uuid === (fieldOfCurrentCategory === null || fieldOfCurrentCategory === void 0 ? void 0 : fieldOfCurrentCategory.fieldTypeUuid); });
            return {
                field: fieldOfCurrentCategory.uuid,
                headerName: fieldOfCurrentCategory.name,
                minWidth: 90,
                align: 'left',
                filterable: false,
                hideable: false,
                sortable: false,
                disableColumnMenu: true,
                disableReorder: true,
                headerAlign: 'left',
                type: (fieldTypeOfCellInColumnInTable === null || fieldTypeOfCellInColumnInTable === void 0 ? void 0 : fieldTypeOfCellInColumnInTable.jsType) === 'array' ? 'singleSelect' : 'string',
                editable: true,
                valueGetter: function (value, row) { return value === null || value === void 0 ? void 0 : value.value; },
                valueOptions: function (params) {
                    var _a;
                    var fieldVariantsForSelectorFieldTypeOfField = (_a = allFieldsOfCategoryMaterialInHandbook === null || allFieldsOfCategoryMaterialInHandbook === void 0 ? void 0 : allFieldsOfCategoryMaterialInHandbook.find(function (field) { return field.uuid === params.field; })) === null || _a === void 0 ? void 0 : _a.fieldVariantsForSelectorFieldType;
                    return fieldVariantsForSelectorFieldTypeOfField === null || fieldVariantsForSelectorFieldTypeOfField === void 0 ? void 0 : fieldVariantsForSelectorFieldTypeOfField.map(function (field) { return field.value; });
                },
                renderEditCell: function (params) {
                    var _a, _b;
                    var currentFieldOfCategoryMaterialInRow = allFieldsOfCategoryMaterialInHandbook === null || allFieldsOfCategoryMaterialInHandbook === void 0 ? void 0 : allFieldsOfCategoryMaterialInHandbook.find(function (field) { return field.uuid === params.field; });
                    var isSelect = ((_a = currentFieldOfCategoryMaterialInRow === null || currentFieldOfCategoryMaterialInRow === void 0 ? void 0 : currentFieldOfCategoryMaterialInRow.fieldType) === null || _a === void 0 ? void 0 : _a.jsType) === 'array';
                    var isOnlyDigits = ((_b = currentFieldOfCategoryMaterialInRow === null || currentFieldOfCategoryMaterialInRow === void 0 ? void 0 : currentFieldOfCategoryMaterialInRow.fieldType) === null || _b === void 0 ? void 0 : _b.jsType) === 'number';
                    var fieldVariantsForSelectorFieldType = currentFieldOfCategoryMaterialInRow === null || currentFieldOfCategoryMaterialInRow === void 0 ? void 0 : currentFieldOfCategoryMaterialInRow.fieldVariantsForSelectorFieldType;
                    var optionsForSelect = fieldVariantsForSelectorFieldType === null || fieldVariantsForSelectorFieldType === void 0 ? void 0 : fieldVariantsForSelectorFieldType.map(function (fieldVariant) { return fieldVariant; });
                    return (<datagrid_materials_cell_characteristic_1.DataGridCellCharacteristic id={params.id} field={params.field} isSelect={isSelect} optionsForSelect={optionsForSelect} defaultValue={params === null || params === void 0 ? void 0 : params.value} isOnlyDigits={isOnlyDigits} allFieldVariantsOfHandbook={allFieldVariantsOfHandbook} fieldCategoryId={params.field} handleClickAddNewFieldVariants={handleClickAddNewFieldVariants}/>);
                },
            };
        });
    }
    var apiRef = (0, x_data_grid_1.useGridApiRef)();
    var _15 = (0, react_1.useState)(apiRef.current.state), gridStateBeforeCreate = _15[0], setGridStateBeforeCreate = _15[1];
    var _16 = (0, react_1.useState)(), columnVisibilityModel = _16[0], setColumnVisibilityModel = _16[1];
    var _17 = (0, react_1.useState)(), materialsDataGridInitialState = _17[0], setMaterialsDataGridInitialState = _17[1];
    var _18 = (0, react_1.useState)([]), rowSelectionModel = _18[0], setRowSelectionModel = _18[1];
    var saveMaterialsDataGridState = (0, react_1.useCallback)(function () {
        var _a;
        if ((_a = apiRef === null || apiRef === void 0 ? void 0 : apiRef.current) === null || _a === void 0 ? void 0 : _a.exportState) {
            var currentState = apiRef.current.exportState();
            if (currentCategory) {
                localStorage.setItem("allMaterialsIn".concat(currentCategory.uuid, "CategoryIn").concat(handbookId, "HandbookDataGridState"), JSON.stringify(currentState));
            }
            else {
                localStorage.setItem("allMaterialsIn".concat(handbookId, "HandbookDataGridState"), JSON.stringify(currentState));
            }
        }
    }, [apiRef]);
    (0, react_1.useLayoutEffect)(function () {
        var stateFromLocalStorage = localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem('materialsDataGridState');
        setMaterialsDataGridInitialState(stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : {});
        // handle refresh and navigating away/refreshing
        window.addEventListener('beforeunload', saveMaterialsDataGridState);
        return function () {
            // in case of an SPA remove the event-listener
            window.removeEventListener('beforeunload', saveMaterialsDataGridState);
            saveMaterialsDataGridState();
        };
    }, [saveMaterialsDataGridState]);
    var addRequiredColumnsToTable = function (requiredCreateColumns) {
        var tableStateAtStart = apiRef.current.state;
        setGridStateBeforeCreate(tableStateAtStart);
        var initialColumnVisibilityModel = tableStateAtStart === null || tableStateAtStart === void 0 ? void 0 : tableStateAtStart.columns.columnVisibilityModel;
        // const allColumnsOfTable = apiRef.current.getAllColumns();
        var visibleColumns = apiRef.current.getVisibleColumns().map(function (column) { return column.field; });
        var isSubArray = requiredCreateColumns.every(function (arrElem) { return visibleColumns.includes(arrElem); });
        if (!isSubArray) {
            var startValue = {};
            var newColumnVisibilityModel = requiredCreateColumns.reduce(function (acc, curValue) {
                acc[curValue] = true;
                return acc;
            }, startValue);
            var finalNewColumnVisibilityModel = __assign(__assign({}, initialColumnVisibilityModel), newColumnVisibilityModel);
            apiRef.current.setColumnVisibilityModel(finalNewColumnVisibilityModel);
        }
        restrictHideRequiredColumns(requiredCreateColumns, tableStateAtStart);
    };
    // DOC сделать hideable=false для всех обязательных столбцов
    var restrictHideRequiredColumns = function (requiredCreateColumns, tableStateAtStart) {
        requiredCreateColumns.forEach(function (column) {
            var requiredFieldInTable = tableStateAtStart.columns.lookup[column];
            requiredFieldInTable.hideable = false;
        });
    };
    // DOC сделать hideable=true для всех обязательных столбцов
    var allowHideRequiredColumns = function (requiredCreateColumns, tableStateCurrent) {
        requiredCreateColumns.forEach(function (column) {
            var requiredFieldInTable = tableStateCurrent.columns.lookup[column];
            requiredFieldInTable.hideable = true;
        });
    };
    var editToolbar = function () {
        var handleClickAddMaterial = function () {
            var _a;
            addRequiredColumnsToTable(required_columns_1.MaterialRequiredCreateColumns);
            var currentState = apiRef.current.exportState();
            var filterState = (_a = currentState.filter) === null || _a === void 0 ? void 0 : _a.filterModel;
            filterState === null || filterState === void 0 ? void 0 : filterState.items.forEach(function (elem) {
                apiRef.current.deleteFilterItem(elem);
            });
            var currentCategoryToDefaultChange = currentCategory ||
                allCategoryMaterialsInHandbook.filter(function (categoryMaterial) { return categoryMaterial.name === 'Общая'; })[0];
            setRows(function (oldRows) {
                var _a;
                var _b;
                var newRow = (_a = {},
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.uuid] = new_material_id_const_1.NewMaterialId,
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.numInOrder] = 0,
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.name] = 'Наименование материала',
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.namePublic] = 'Сокр. наименование',
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.comment] = 'Описание нового материала',
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.price] = 0,
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.sourceInfo] = 'Укажите источник',
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.responsiblePartner] = responsiblePartners[0],
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.categoryMaterial] = currentCategoryToDefaultChange,
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.unitMeasurement] = allUnitMeasurementsInHandbook.filter(function (unitMeasurement) { return unitMeasurement.name === 'отсутствует'; })[0],
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.unitMeasurementUuid] = (_b = allUnitMeasurementsInHandbook.filter(function (unitMeasurement) { return unitMeasurement.name === 'отсутствует'; })[0]) === null || _b === void 0 ? void 0 : _b.uuid,
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.priceChanges] = [],
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.characteristicsMaterial] = [],
                    _a[material_columns_schema_enum_1.MaterialColumnSchema.updatedAt] = new Date(),
                    _a.isNew = true,
                    _a);
                if (additionalFields && (additionalFields === null || additionalFields === void 0 ? void 0 : additionalFields.length) !== 0) {
                    additionalFields.forEach(function (field, index) {
                        var fieldId = field.uuid;
                        if (field === null || field === void 0 ? void 0 : field.defaultValue) {
                            newRow[fieldId] = { uuid: index, value: field === null || field === void 0 ? void 0 : field.defaultValue };
                        }
                    });
                }
                return __spreadArray([newRow], oldRows, true);
            });
            setIsCreateRowMode(function (prevMode) { return !prevMode; });
            setRowModesModel(function (oldModel) {
                var _a;
                return (__assign((_a = {}, _a[new_material_id_const_1.NewMaterialId] = { mode: x_data_grid_1.GridRowModes.Edit, fieldToFocus: 'name' }, _a), oldModel));
            });
            var currentRowsIds = apiRef.current.getAllRowIds();
            currentRowsIds.forEach(function (rowId) {
                apiRef.current.selectRow(rowId, false, true);
            });
            var currentRowsState = apiRef.current.state;
            console.log(currentRowsState);
            // currentRowsModels.forEach((rowModel) => {
            //   console.log(rowModel);
            //   // apiRef.current.selectRow(rowId, false, true);
            // });
        };
        var isCreateRowButtonVisible = function () {
            var newRow = apiRef.current.getRowWithUpdatedValues(new_material_id_const_1.NewMaterialId, 'ignore');
            if ((newRow === null || newRow === void 0 ? void 0 : newRow.name) &&
                typeof (newRow === null || newRow === void 0 ? void 0 : newRow.categoryMaterial) &&
                (newRow === null || newRow === void 0 ? void 0 : newRow.unitMeasurement) &&
                ((newRow === null || newRow === void 0 ? void 0 : newRow.price) || (newRow === null || newRow === void 0 ? void 0 : newRow.price) === 0)) {
                return true;
            }
            return false;
        };
        var isResetSettingsVisible = function () {
            var _a;
            var curTableState = apiRef.current.state;
            var initialState = table_initial_state_1.columnsInitialState;
            var isNotEqWithDefaultColumns = !(0, deep_equal_and_in_1.deepEqualAndIn)(curTableState, initialState);
            var columnsCurrent = apiRef.current.state.columns.lookup;
            var columnsInitial = (_a = table_initial_state_1.columnsInitialState.columns) === null || _a === void 0 ? void 0 : _a.dimensions;
            var isNotEqWithDefaultWidthsOfColumns = (0, deep_equal_in_tablekeys_1.deepEqualAndInTableKeys)(columnsCurrent, columnsInitial);
            return isNotEqWithDefaultColumns || isNotEqWithDefaultWidthsOfColumns;
        };
        var handleClickResetSettingsTable = function () {
            localStorage.setItem('materialsDataGridState', JSON.stringify(table_initial_state_1.columnsInitialState));
            apiRef.current.restoreState(table_initial_state_1.columnsInitialState);
        };
        var isDeleteRowVisible = function () {
            var rowsIdToDelete = rowSelectionModel;
            return rowsIdToDelete.length > 0;
        };
        return (<x_data_grid_1.GridToolbarContainer sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Box_1.default>
          <Button_1.default color="primary" disabled={isCreateRowMode} startIcon={<Add_1.default />} onClick={handleClickAddMaterial}>
            Добавить материал
          </Button_1.default>

          {isDeleteRowVisible() && (<Button_1.default color="error" startIcon={<DeleteOutlined_1.default />} onClick={handleDeleteRowClick}>
              Удалить
            </Button_1.default>)}

          {isCreateRowMode && (<Button_1.default color="primary" startIcon={<Check_1.default />} disabled={!isCreateRowButtonVisible()} onClick={handleSaveClick}>
              Подтвердить
            </Button_1.default>)}

          {isCreateRowMode && (<Button_1.default color="warning" startIcon={<Block_1.default />} onClick={handleCancelRowClick}>
              Отменить создание материала
            </Button_1.default>)}

          {isResetSettingsVisible() && !isCreateRowMode && (<Button_1.default color="warning" startIcon={<RestartAlt_1.default />} onClick={handleClickResetSettingsTable}>
              Вернуться к исходным настройкам
            </Button_1.default>)}
        </Box_1.default>

        <x_data_grid_1.GridToolbarContainer>
          <x_data_grid_1.GridToolbarColumnsButton />
          <x_data_grid_1.GridToolbarFilterButton />
          <Box_1.default sx={{ flexGrow: 1 }}/>
          <x_data_grid_1.GridToolbarExport slotProps={{
                tooltip: { title: 'Выгрузить данные' },
                button: { variant: 'outlined' },
            }}/>
        </x_data_grid_1.GridToolbarContainer>
      </x_data_grid_1.GridToolbarContainer>);
    };
    var handleDeleteRowClick = function (event) {
        isDialogOpen.onTrue();
    };
    var handleCancelRowClick = function (event) {
        var startTableState = gridStateBeforeCreate;
        var oldColumnVisibilityModel = startTableState.columns.columnVisibilityModel;
        if (typeof startTableState === 'object' && Object.keys(startTableState).length !== 0) {
            apiRef.current.restoreState(startTableState);
            apiRef.current.setColumnVisibilityModel(oldColumnVisibilityModel);
        }
        allowHideRequiredColumns(required_columns_1.MaterialRequiredCreateColumns, apiRef.current.state);
        handleCancelClick(new_material_id_const_1.NewMaterialId);
    };
    var handleCancelClick = function (id) {
        var _a;
        setRowModesModel(__assign(__assign({}, rowModesModel), (_a = {}, _a[id] = { mode: x_data_grid_1.GridRowModes.View, ignoreModifications: true }, _a)));
        var editedRow = rows.find(function (row) { return row.uuid === id; });
        if (editedRow === null || editedRow === void 0 ? void 0 : editedRow.isNew) {
            setRows(rows.filter(function (row) { return row.uuid !== id; }));
        }
        setIsCreateRowMode(function (prevValue) { return !prevValue; });
    };
    // const handleEditClick = (id: GridRowId) => () => {
    //   setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    // };
    var handleRowEditStop = function (params, event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (params.reason === x_data_grid_1.GridRowEditStopReasons.rowFocusOut) {
                event.defaultMuiPrevented = true;
            }
            return [2 /*return*/];
        });
    }); };
    var handleCellEditStop = function (params, event) { return __awaiter(_this, void 0, void 0, function () {
        var rowCurrentState, updateValueDto, newUnitMeasurementId, categoryMaterialId, materialId, characteristicId, fieldCategoryMaterialId, createCharacteristicMaterialDto, newCharacteristic, newCategoryId, updateCategoryOfMaterialDto, materialWithUpdatedCategoryRow, updatedRow;
        var _a;
        var _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    rowCurrentState = apiRef.current.getRowWithUpdatedValues(params.id, params.field);
                    updateValueDto = {};
                    if (!(params.field === material_columns_schema_enum_1.MaterialColumnSchema.unitMeasurement)) return [3 /*break*/, 1];
                    newUnitMeasurementId = (_b = allUnitMeasurementsInHandbook === null || allUnitMeasurementsInHandbook === void 0 ? void 0 : allUnitMeasurementsInHandbook.find(function (unitMeasurement) { return unitMeasurement.name === rowCurrentState[params.field]; })) === null || _b === void 0 ? void 0 : _b.uuid;
                    updateValueDto = { unitMeasurementUuid: newUnitMeasurementId };
                    return [3 /*break*/, 9];
                case 1:
                    if (!uuid_regex_1.UuidRegexForTest.test(params.field)) return [3 /*break*/, 5];
                    categoryMaterialId = (_c = params.row) === null || _c === void 0 ? void 0 : _c.categoryMaterialUuid;
                    materialId = (_d = params.row) === null || _d === void 0 ? void 0 : _d.uuid;
                    characteristicId = (_e = params.row[params.field]) === null || _e === void 0 ? void 0 : _e.uuid;
                    fieldCategoryMaterialId = params === null || params === void 0 ? void 0 : params.field;
                    createCharacteristicMaterialDto = {
                        value: rowCurrentState[params.field],
                        characteristicsMaterialStatus: entity_activity_status_enum_1.EntityActivityStatus.ACTIVE,
                    };
                    // apiRef.current.setEditCellValue({
                    //   id: params.id,
                    //   field: params.field,
                    //   value: rowCurrentState[params.field],
                    //   debounceMs: 200,
                    // });
                    setRows(function (prevValue) {
                        return prevValue.map(function (elem) {
                            var _a;
                            if (elem.uuid === params.id) {
                                var characteristic = (_a = elem.characteristicsMaterial) === null || _a === void 0 ? void 0 : _a.find(function (element) { return element.fieldOfCategoryMaterialUuid === params.field; });
                                if (characteristic) {
                                    characteristic.value = rowCurrentState[params.field];
                                }
                            }
                            return elem;
                        });
                    });
                    if (!characteristicId) return [3 /*break*/, 3];
                    return [4 /*yield*/, (0, delete_characteristic_of_material_action_1.deleteCharacteristicOfMaterial)(workspaceId, handbookId, categoryMaterialId, materialId, characteristicId)];
                case 2:
                    _g.sent();
                    _g.label = 3;
                case 3: return [4 /*yield*/, (0, create_characteristic_of_material_action_1.createCharacteristicOfMaterial)(workspaceId, handbookId, categoryMaterialId, materialId, fieldCategoryMaterialId, createCharacteristicMaterialDto)];
                case 4:
                    newCharacteristic = _g.sent();
                    return [3 /*break*/, 9];
                case 5:
                    if (!(params.field === material_columns_schema_enum_1.MaterialColumnSchema.categoryMaterial &&
                        allCategoryMaterialsInHandbook)) return [3 /*break*/, 8];
                    newCategoryId = (_f = allCategoryMaterialsInHandbook === null || allCategoryMaterialsInHandbook === void 0 ? void 0 : allCategoryMaterialsInHandbook.find(function (categoryMaterial) { return categoryMaterial.name === rowCurrentState[params.field]; })) === null || _f === void 0 ? void 0 : _f.uuid;
                    if (!newCategoryId) return [3 /*break*/, 7];
                    updateCategoryOfMaterialDto = {
                        categoryMaterialUuid: newCategoryId,
                    };
                    return [4 /*yield*/, (0, update_material_category_action_1.updateMaterialCategory)(workspaceId, handbookId, params.row.categoryMaterialUuid, params.row.uuid, updateCategoryOfMaterialDto)];
                case 6:
                    materialWithUpdatedCategoryRow = (_g.sent());
                    console.log(materialWithUpdatedCategoryRow);
                    _g.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    updateValueDto = (_a = {},
                        _a[params.field] = rowCurrentState[params.field],
                        _a);
                    _g.label = 9;
                case 9:
                    if (!Object.keys(updateValueDto).length) return [3 /*break*/, 11];
                    return [4 /*yield*/, (0, update_material_action_1.updateMaterial)(workspaceId, handbookId, params.row.categoryMaterialUuid, params.row.uuid, updateValueDto)];
                case 10:
                    updatedRow = (_g.sent());
                    _g.label = 11;
                case 11:
                    if (params.reason !== x_data_grid_1.GridCellEditStopReasons.shiftTabKeyDown) {
                        event.defaultMuiPrevented = true;
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSaveClick = function () { return __awaiter(_this, void 0, void 0, function () {
        var id, isNewRow, finalRow, newRowLocally, allCharacteristicsForMaterial, finalRowWithChangesAndCharacteristics;
        var _a;
        var _this = this;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    id = new_material_id_const_1.NewMaterialId;
                    isNewRow = (_b = apiRef.current.getRow(id)) === null || _b === void 0 ? void 0 : _b.isNew;
                    if (!isNewRow) return [3 /*break*/, 2];
                    newRowLocally = apiRef.current.getRowWithUpdatedValues(id, 'ignore');
                    return [4 /*yield*/, (0, material_create_handler_1.materialCreateHandler)(newRowLocally, workspaceId, handbookId, responsiblePartners, allCategoryMaterialsInHandbook, allUnitMeasurementsInHandbook)];
                case 1:
                    finalRow = (_c.sent());
                    allCharacteristicsForMaterial = Object.entries(newRowLocally).map(function (_a) { return __awaiter(_this, [_a], void 0, function (_b) {
                        var createCharacteristicMaterialDto, newMaterialCharacteristic;
                        var key = _b[0], value = _b[1];
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    if (!(uuid_regex_1.UuidRegexForTest.test(key) && value)) return [3 /*break*/, 2];
                                    createCharacteristicMaterialDto = {
                                        value: value,
                                        characteristicsMaterialStatus: entity_activity_status_enum_1.EntityActivityStatus.ACTIVE,
                                    };
                                    return [4 /*yield*/, (0, create_characteristic_of_material_action_1.createCharacteristicOfMaterial)(workspaceId, handbookId, finalRow.categoryMaterialUuid, finalRow.uuid, key, createCharacteristicMaterialDto)];
                                case 1:
                                    newMaterialCharacteristic = (_c.sent());
                                    return [2 /*return*/, newMaterialCharacteristic];
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 3];
                case 2: throw new Error('isNewRow = false, problem with creating a new row');
                case 3: return [4 /*yield*/, (0, get_concrete_material_in_handbook_action_1.getConcreteMaterialInHandbook)(workspaceId, handbookId, finalRow.categoryMaterialUuid, finalRow.uuid)];
                case 4:
                    finalRowWithChangesAndCharacteristics = (_c.sent());
                    setRowModesModel(__assign(__assign({}, rowModesModel), (_a = {}, _a[id] = { mode: x_data_grid_1.GridRowModes.View, ignoreModifications: true }, _a)));
                    setIsCreateRowMode(function (prevValue) { return !prevValue; });
                    setRows(function (oldRows) {
                        var updatedRow = __assign(__assign({}, finalRowWithChangesAndCharacteristics), { isNew: false });
                        return oldRows.map(function (row) { return (row.uuid === id ? updatedRow : row); });
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    // const handleDeleteClick = (id: GridRowId) => async () => {
    //   const handbookInfo = workspaceInfo?.currentHandbookInfo as HandbookGetCommand.ResponseEntity;
    //   handbookInfo?.responsiblePartnerProducers as ResponsiblePartnerProducerGetAllCommand.ResponseEntity;
    //   const categoryMaterials =
    //     workspaceInfo?.allCategoryMaterialsOfHandbook as CategoryMaterialGetAllCommand.ResponseEntity;
    //   const workspaceId = handbookInfo.workspaceUuid;
    //   const handbookId = handbookInfo.uuid;
    //   const rowLocally = apiRef.current.getRow(id);
    //   await fieldsOfCategoryMaterialsDeleteHandler(rowLocally, workspaceId as string, handbookId, categoryMaterials);
    //   setRows(rows.filter((row) => row.uuid !== id));
    // };
    // const processRowUpdate = (newRow: TMaterialTableEntity) => {
    //   const updatedRow = { ...newRow, isNew: false };
    //   setRows(rows.map((row) => (row.uuid === newRow.uuid ? updatedRow : row)));
    //   return updatedRow;
    // };
    // const handleProcessRowUpdateError = (error: Error) => {
    //   console.error('error while update row in table of materials', error);
    // };
    var handleRowModesModelChange = function (newRowModesModel) {
        setRowModesModel(newRowModesModel);
    };
    var handleClickAddNewUnitMeasurement = function (createNewUnitMeasurementDto) { return __awaiter(_this, void 0, void 0, function () {
        var newFieldUnitMeasurement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, create_field_unit_measurement_action_1.createFieldUnitMeasurement)(workspaceId, handbookId, createNewUnitMeasurementDto)];
                case 1:
                    newFieldUnitMeasurement = (_a.sent());
                    return [2 /*return*/, newFieldUnitMeasurement];
            }
        });
    }); };
    var handleClickDeleteUnitMeasurement = function (unitMeasurementId) { return __awaiter(_this, void 0, void 0, function () {
        var oldFieldUnitMeasurement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, delete_field_unit_measurement_action_1.deleteFieldUnitMeasurement)(workspaceId, handbookId, unitMeasurementId)];
                case 1:
                    oldFieldUnitMeasurement = (_a.sent());
                    return [2 /*return*/, oldFieldUnitMeasurement];
            }
        });
    }); };
    var allMaterialsTableColumns = [
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.uuid,
            headerName: 'id',
            width: 130,
            sortable: false,
            filterable: false,
            resizable: false,
            align: 'left',
            headerAlign: 'left',
            disableColumnMenu: true,
            disableReorder: true,
        },
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.numInOrder,
            headerName: 'Номер п/п',
            minWidth: 90,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.name,
            headerName: 'Наименование',
            minWidth: 220,
            width: (_e = (_d = (_c = materialsDataGridInitialState === null || materialsDataGridInitialState === void 0 ? void 0 : materialsDataGridInitialState.columns) === null || _c === void 0 ? void 0 : _c.dimensions) === null || _d === void 0 ? void 0 : _d.name) === null || _e === void 0 ? void 0 : _e.width,
            flex: 1,
            // width: materialsDataGridInitialState?.columns?.dimensions?.name?.width,
            // flex: materialsDataGridInitialState?.columns?.dimensions?.name?.width ? undefined : 1,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            hideable: false,
            hideSortIcons: true,
            // resizable: true,
            sortable: false,
            renderCell: function (params) {
                return (0, datagrid_materials_cell_name_with_icon_export_1.renderCellExpandWithIcon)(params, allCategoryMaterialsInHandbook);
            },
        },
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.namePublic,
            headerName: 'Сокращенно',
            minWidth: 170,
            width: (_h = (_g = (_f = materialsDataGridInitialState === null || materialsDataGridInitialState === void 0 ? void 0 : materialsDataGridInitialState.columns) === null || _f === void 0 ? void 0 : _f.dimensions) === null || _g === void 0 ? void 0 : _g.namePublic) === null || _h === void 0 ? void 0 : _h.width,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            // renderHeader: (params) => (
            //   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            //     {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
            //   </Box>
            // ),
        },
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.comment,
            headerName: 'Описание',
            minWidth: 50,
            width: (_l = (_k = (_j = materialsDataGridInitialState === null || materialsDataGridInitialState === void 0 ? void 0 : materialsDataGridInitialState.columns) === null || _j === void 0 ? void 0 : _j.dimensions) === null || _k === void 0 ? void 0 : _k.comment) === null || _l === void 0 ? void 0 : _l.width,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            // renderHeader: (params) => (
            //   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            //     {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
            //   </Box>
            // ),
        },
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.price,
            valueFormatter: function (value) { return (0, intl_1.toRubles)(Number(value)); },
            headerName: 'Цена',
            minWidth: 50,
            width: (_p = (_o = (_m = materialsDataGridInitialState === null || materialsDataGridInitialState === void 0 ? void 0 : materialsDataGridInitialState.columns) === null || _m === void 0 ? void 0 : _m.dimensions) === null || _o === void 0 ? void 0 : _o.price) === null || _p === void 0 ? void 0 : _p.width,
            type: 'number',
            align: 'left',
            headerAlign: 'left',
            editable: true,
            // renderHeader: (params) => (
            //   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            //     {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
            //   </Box>
            // ),
        },
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.sourceInfo,
            // flex: 1,
            headerName: 'Источник цены',
            valueGetter: function (value, row) {
                var finishValue = 'Источник не указан';
                if (value) {
                    finishValue = value;
                }
                return finishValue;
            },
            minWidth: 50,
            width: (_s = (_r = (_q = materialsDataGridInitialState === null || materialsDataGridInitialState === void 0 ? void 0 : materialsDataGridInitialState.columns) === null || _q === void 0 ? void 0 : _q.dimensions) === null || _r === void 0 ? void 0 : _r.sourceInfo) === null || _s === void 0 ? void 0 : _s.width,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            // renderHeader: (params) => (
            //   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            //     {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
            //   </Box>
            // ),
        },
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.responsiblePartner,
            type: 'singleSelect',
            valueOptions: function (params) {
                var responsiblePartnerNames = responsiblePartners && responsiblePartners.map(function (elem) { return elem.name; });
                return responsiblePartnerNames;
            },
            valueGetter: function (value, row) {
                return (0, is_entity_responsible_partner_type_guard_1.isEntityResponsiblePartnerTG)(value) ? value.name : value;
            },
            headerName: 'Поставщик',
            minWidth: 50,
            width: (_v = (_u = (_t = materialsDataGridInitialState === null || materialsDataGridInitialState === void 0 ? void 0 : materialsDataGridInitialState.columns) === null || _t === void 0 ? void 0 : _t.dimensions) === null || _u === void 0 ? void 0 : _u.responsiblePartner) === null || _v === void 0 ? void 0 : _v.width,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            // renderHeader: (params) => (
            //   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            //     {params.colDef.headerName} <EditIcon sx={{ width: 18, height: 18, mb: 0.5 }} />
            //   </Box>
            // ),
        },
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.categoryMaterial,
            headerName: 'Категория',
            align: 'left',
            headerAlign: 'left',
            minWidth: 50,
            width: (_y = (_x = (_w = materialsDataGridInitialState === null || materialsDataGridInitialState === void 0 ? void 0 : materialsDataGridInitialState.columns) === null || _w === void 0 ? void 0 : _w.dimensions) === null || _x === void 0 ? void 0 : _x.categoryMaterial) === null || _y === void 0 ? void 0 : _y.width,
            editable: !currentCategory,
            sortable: !currentCategory,
            filterable: !currentCategory,
            type: 'singleSelect',
            valueOptions: function (params) {
                var categoryNames = allCategoryMaterialsInHandbook && allCategoryMaterialsInHandbook.map(function (elem) { return elem.name; });
                return categoryNames;
            },
            renderEditCell: function (params) {
                var optionsForSelect = allCategoryMaterialsInHandbook;
                var isSelect = true;
                return (<datagrid_materials_cell_category_1.DataGridCellCategory id={params.id} field={params.field} isSelect={isSelect} optionsForSelect={optionsForSelect} defaultValue={params === null || params === void 0 ? void 0 : params.value} handleClickAddNewCategory={handleClickAddNewCategory}/>);
            },
            valueGetter: function (value, row) {
                return (0, is_entity_category_material_type_guard_1.isEntityCategoryMaterialTG)(value) ? value.name : value;
            },
        },
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.unitMeasurement,
            headerName: 'Ед. изм.',
            align: 'left',
            headerAlign: 'left',
            minWidth: 50,
            width: (_1 = (_0 = (_z = materialsDataGridInitialState === null || materialsDataGridInitialState === void 0 ? void 0 : materialsDataGridInitialState.columns) === null || _z === void 0 ? void 0 : _z.dimensions) === null || _0 === void 0 ? void 0 : _0.unitMeasurement) === null || _1 === void 0 ? void 0 : _1.width,
            editable: true,
            type: 'singleSelect',
            valueOptions: function (params) {
                var fieldUnitMeasurementNames = allUnitMeasurementsInHandbook &&
                    (allUnitMeasurementsInHandbook === null || allUnitMeasurementsInHandbook === void 0 ? void 0 : allUnitMeasurementsInHandbook.map(function (elem) { return elem.name; }));
                return fieldUnitMeasurementNames;
            },
            renderEditCell: function (params) {
                var optionsForSelect = allUnitMeasurementsInHandbook;
                return (<datagrid_materials_cell_unit_measurement_1.DataGridCellUnitMeasurement id={params.id} field={params.field} optionsForSelect={optionsForSelect} defaultValue={params === null || params === void 0 ? void 0 : params.value} handleClickAddNewUnitMeasurement={handleClickAddNewUnitMeasurement} handleClickDeleteUnitMeasurement={handleClickDeleteUnitMeasurement}/>);
            },
            valueGetter: function (value, row) {
                return (0, is_entity_field_unit_measurement_type_guard_1.isEntityFieldUnitMeasurementTG)(value) ? value.name : value;
            },
        },
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.priceChanges,
            valueGetter: function (value, row) {
                var prices = row.priceChanges;
                var finishValue = 'Изменений цены не было';
                if (prices && prices.length > 0) {
                    finishValue = '';
                    var counter_1 = 1;
                    finishValue = prices.reduce(function (acc, curValue) {
                        acc += "".concat(counter_1, ") \u0421\u0442\u0430\u0440\u0430\u044F \u0446\u0435\u043D\u0430: ").concat(curValue.oldPrice, ", \u043D\u043E\u0432\u0430\u044F \u0446\u0435\u043D\u0430: ").concat(curValue.newPrice, " \u043E\u0442 ").concat(curValue.createdAt);
                        acc += (curValue === null || curValue === void 0 ? void 0 : curValue.source) ? " \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A - ".concat(curValue.source, "; ") : '; ';
                        counter_1 += 1;
                        return acc;
                    }, finishValue);
                }
                return finishValue;
            },
            headerName: 'Изменения цены',
            minWidth: 50,
            width: (_4 = (_3 = (_2 = materialsDataGridInitialState === null || materialsDataGridInitialState === void 0 ? void 0 : materialsDataGridInitialState.columns) === null || _2 === void 0 ? void 0 : _2.dimensions) === null || _3 === void 0 ? void 0 : _3.priceChanges) === null || _4 === void 0 ? void 0 : _4.width,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.characteristicsMaterial,
            valueGetter: function (value, row) {
                var characteristicsMaterial = row.characteristicsMaterial;
                var finishValue = 'Характеристики отсутствуют';
                if (characteristicsMaterial && characteristicsMaterial.length > 0) {
                    finishValue = '';
                    var counter_2 = 1;
                    finishValue = characteristicsMaterial.reduce(function (acc, curValue) {
                        var _a;
                        var thisCharateristicFieldOfCategoryMaterial = allFieldsOfCategoryMaterialInHandbook.find(function (elem) { return elem.uuid === curValue.fieldOfCategoryMaterialUuid; });
                        var thisCharateristicUnitMeasurementName;
                        if (get_all_field_unit_measurements_of_handbook_action_1.getAllFieldUnitMeasurementsOfHandbook &&
                            !(0, is_error_field_type_guard_1.isErrorFieldTypeGuard)(get_all_field_unit_measurements_of_handbook_action_1.getAllFieldUnitMeasurementsOfHandbook)) {
                            thisCharateristicUnitMeasurementName = (_a = thisCharateristicFieldOfCategoryMaterial === null || thisCharateristicFieldOfCategoryMaterial === void 0 ? void 0 : thisCharateristicFieldOfCategoryMaterial.unitOfMeasurement) === null || _a === void 0 ? void 0 : _a.name;
                            acc += "".concat(counter_2, ") ").concat(thisCharateristicFieldOfCategoryMaterial === null || thisCharateristicFieldOfCategoryMaterial === void 0 ? void 0 : thisCharateristicFieldOfCategoryMaterial.name, " = ").concat(curValue.value).concat(thisCharateristicUnitMeasurementName && thisCharateristicUnitMeasurementName !== '-' ? " (".concat(thisCharateristicUnitMeasurementName, "); ") : '; ');
                        }
                        counter_2 += 1;
                        return acc;
                    }, finishValue);
                }
                return finishValue;
            },
            headerName: 'Характеристики',
            align: 'left',
            headerAlign: 'left',
            minWidth: 50,
            width: (_7 = (_6 = (_5 = materialsDataGridInitialState === null || materialsDataGridInitialState === void 0 ? void 0 : materialsDataGridInitialState.columns) === null || _5 === void 0 ? void 0 : _5.dimensions) === null || _6 === void 0 ? void 0 : _6.characteristicsMaterial) === null || _7 === void 0 ? void 0 : _7.width,
        },
        {
            field: material_columns_schema_enum_1.MaterialColumnSchema.updatedAt,
            // type: 'dateTime',
            valueGetter: function (value, row) {
                var finishValue = (0, moment_1.default)(row.updatedAt).locale('ru').format('DD.MM.YYYY HH:mm:ss');
                return finishValue;
            },
            resizable: false,
            headerName: 'Дата обновления',
            minWidth: 50,
            width: (_10 = (_9 = (_8 = materialsDataGridInitialState === null || materialsDataGridInitialState === void 0 ? void 0 : materialsDataGridInitialState.columns) === null || _8 === void 0 ? void 0 : _8.dimensions) === null || _9 === void 0 ? void 0 : _9.updatedAt) === null || _10 === void 0 ? void 0 : _10.width,
        },
    ];
    if (additionalFields &&
        fieldsOfCurrentCategoryToTable &&
        Array.isArray(fieldsOfCurrentCategoryToTable)) {
        // const fieldsOfCurrentCategoryToTable
        allMaterialsTableColumns.push.apply(allMaterialsTableColumns, fieldsOfCurrentCategoryToTable);
    }
    var handleClickDialogYesDeleteRow = function () { return __awaiter(_this, void 0, void 0, function () {
        var rowIdToDelete, rowInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rowIdToDelete = rowSelectionModel[0];
                    rowInfo = apiRef.current.getRow(rowIdToDelete);
                    return [4 /*yield*/, (0, material_delete_handler_1.materialDeleteHandler)(rowInfo, workspaceId, handbookId, allCategoryMaterialsInHandbook)];
                case 1:
                    _a.sent();
                    setRows(rows.filter(function (row) { return row.uuid !== rowIdToDelete; }));
                    return [2 /*return*/];
            }
        });
    }); };
    var onClickYesDialog = function (event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, handleClickDialogYesDeleteRow()];
                case 1:
                    _a.sent();
                    isDialogOpen.onFalse();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<>
      <Container_1.default maxWidth="xl">
        {materialsDataGridInitialState ? (<>
            <Typography_1.default variant="h4">
              {!currentCategory
                ? 'Справочник материалов'
                : "\u0421\u043F\u0440\u0430\u0432\u043E\u0447\u043D\u0438\u043A \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432 \u0438\u0437 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438 ".concat(currentCategory === null || currentCategory === void 0 ? void 0 : currentCategory.name)}
            </Typography_1.default>

            {allCategoryMaterialsInHandbook && (<custom_breadcrumbs_1.default 
            // heading="Carousel"
            sx={{
                    paddingRight: 3,
                    marginBottom: 2,
                    marginTop: 1,
                    width: '100%',
                    maxWidth: 'xl',
                }} allEntitiesForBreadcrumbs={allCategoryMaterialsInHandbook} concreteCrumbs={currentCategory
                    ? [
                        {
                            name: 'Дашборд',
                            href: "https://alibaba.hhos.ru/dashboard",
                        },
                        { name: 'Материалы', href: "https://alibaba.hhos.ru/dashboard/materials" },
                        {
                            name: currentCategory.name,
                            href: "https://alibaba.hhos.ru/dashboard/materials/".concat(currentCategory.uuid),
                        },
                    ]
                    : [
                        {
                            name: 'Дашборд',
                            href: "https://alibaba.hhos.ru/dashboard",
                        },
                        { name: 'Материалы' },
                    ]}/>)}

            <Box_1.default sx={{ width: '100%' }}>
              <x_data_grid_1.DataGrid apiRef={apiRef} localeText={__assign({ columnsManagementReset: 'Сбросить', columnsManagementShowHideAllText: 'Показать/скрыть все' }, locales_1.ruRU.components.MuiDataGrid.defaultProps.localeText)} initialState={__assign(__assign({}, table_initial_state_1.columnsInitialState), materialsDataGridInitialState)} rows={rows} columns={__spreadArray([
                __assign(__assign({}, x_data_grid_1.GRID_CHECKBOX_SELECTION_COL_DEF), { hideable: false, headerName: 'Выбор строки', cellClassName: 'MuiDataGrid-cellCheckbox', headerClassName: 'MuiDataGrid-columnHeaderCheckbox' })
            ], allMaterialsTableColumns, true)} getRowId={function (row) { return row.uuid; }} loading={!workspaceInfo} editMode={isCreateRowMode ? 'row' : 'cell'} pageSizeOptions={[5, 10, 20, 50, 100]} paginationModel={paginationModel} onPaginationModelChange={function (paginationModelGrid) {
                return setPaginationModel(paginationModelGrid);
            }} rowModesModel={rowModesModel} onRowModesModelChange={handleRowModesModelChange} 
        // onRowEditStop={handleRowEditStop}
        // processRowUpdate={processRowUpdate}
        // onProcessRowUpdateError={handleProcessRowUpdateError}
        isCellEditable={function (params) {
                var _a, _b, _c, _d, _e;
                if (isCreateRowMode) {
                    return (_a = params === null || params === void 0 ? void 0 : params.row) === null || _a === void 0 ? void 0 : _a.isNew;
                }
                var isCellInEditableColumn = editable_columns_1.MaterialEditableColumns.includes(params.field) ||
                    uuid_regex_1.UuidRegexForTest.test(params.field);
                if (params.field === 'name' && ((_b = params.row) === null || _b === void 0 ? void 0 : _b.categoryMaterial.templateName)) {
                    var allNeedFieldsUuidsInCategoryMaterialTemplateName = (_d = (_c = allCategoryMaterialsInHandbook
                        .find(function (item) {
                        return item.uuid === params.row.categoryMaterialUuid;
                    })) === null || _c === void 0 ? void 0 : _c.fieldsOfCategoryMaterialsInTemplate) === null || _d === void 0 ? void 0 : _d.map(function (item) { return item.uuid; });
                    var allFieldUuidsInCharacteristicsOfMaterial_1 = params.row.characteristicsMaterial.map(function (item) {
                        return item.fieldOfCategoryMaterialUuid;
                    });
                    var havingSomeTemplateCharacteristic = allNeedFieldsUuidsInCategoryMaterialTemplateName === null || allNeedFieldsUuidsInCategoryMaterialTemplateName === void 0 ? void 0 : allNeedFieldsUuidsInCategoryMaterialTemplateName.some(function (elem) {
                        return allFieldUuidsInCharacteristicsOfMaterial_1 === null || allFieldUuidsInCharacteristicsOfMaterial_1 === void 0 ? void 0 : allFieldUuidsInCharacteristicsOfMaterial_1.includes(elem);
                    });
                    var havingAllTemplateCharacteristics = allNeedFieldsUuidsInCategoryMaterialTemplateName === null || allNeedFieldsUuidsInCategoryMaterialTemplateName === void 0 ? void 0 : allNeedFieldsUuidsInCategoryMaterialTemplateName.every(function (elem) {
                        return allFieldUuidsInCharacteristicsOfMaterial_1 === null || allFieldUuidsInCharacteristicsOfMaterial_1 === void 0 ? void 0 : allFieldUuidsInCharacteristicsOfMaterial_1.includes(elem);
                    });
                    if (havingAllTemplateCharacteristics || havingSomeTemplateCharacteristic) {
                        isCellInEditableColumn = false;
                    }
                }
                var isNewRow = (_e = params.row) === null || _e === void 0 ? void 0 : _e.isNew;
                return isNewRow || isCellInEditableColumn;
            }} 
        // slots={{ toolbar: GridToolbar }}
        slots={{
                noRowsOverlay: NoRowsOverlay_1.CustomNoRowsOverlay,
                noResultsOverlay: NoRowsOverlay_1.CustomNoResultsOverlay,
                toolbar: editToolbar,
            }} slotProps={{
                toolbar: { setRows: setRows, setRowModesModel: setRowModesModel },
            }} autoHeight getRowHeight={function () { return 'auto'; }} 
        // getRowSpacing={(params) => ({
        //   top: params.isFirstVisible ? 0 : 5,
        //   bottom: params.isLastVisible ? 0 : 5,
        // })}
        isRowSelectable={function (params) {
                if (!isCreateRowMode) {
                    return true;
                }
                return false;
            }} onRowSelectionModelChange={function (newRowSelectionModel) {
                setRowSelectionModel(newRowSelectionModel);
            }} 
        // onCellClick={handleCellClick}
        rowSelectionModel={rowSelectionModel} 
        // autosizeOptions={{
        //   columns: [MaterialColumnSchema.name],
        //   includeOutliers: true,
        //   includeHeaders: true,
        // }}
        sx={_b = {},
                _b["& .".concat(x_data_grid_1.gridClasses.main)] = {
                //   #element::-webkit-scrollbar-track {
                // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
                // border-radius: 10px;
                // background-color: #f9f9fd;
                // }
                },
                _b["& .".concat(x_data_grid_1.gridClasses.cell)] = {
                    border: 'none',
                    minHeight: '50px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                },
                // [`& .${gridClasses.cellOffsetLeft}`]: {
                //   // minWidth: '100%',
                //   backgroundColor: (theme) =>
                //     theme.palette.mode === 'light' ? grey[800] : grey[900],
                //   width: '100%',
                // },
                _b["& .".concat(x_data_grid_1.gridClasses.main)] = {
                // bgcolor: `${grey[50]}`,
                },
                // [`& .${gridClasses.row}`]: {
                //   borderBottom: `0.5px solid ${grey[50]}`,
                // },
                _b['& .MuiDataGrid-cell--editable'] = {
                    bgcolor: function (theme) {
                        return theme.palette.mode === 'light' ? "#DBDBDE24" : "rgba(9, 9, 9, 0.11)";
                    },
                },
                _b} disableRowSelectionOnClick checkboxSelection disableMultipleRowSelection columnVisibilityModel={columnVisibilityModel} onColumnVisibilityModelChange={function (newModel) {
                setColumnVisibilityModel(newModel);
            }} onCellEditStop={handleCellEditStop} onRowEditStop={handleRowEditStop}/>
            </Box_1.default>
          </>) : (<material_1.CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }}/>)}
      </Container_1.default>

      {isDialogOpen && (<alert_dialog_1.default isDialogOpen={isDialogOpen} onClickYes={onClickYesDialog} titleDialog={dialog_texts_1.DeleteMaterialDialogTexts.titleDialog} textDialog={(0, templater_creator_1.templaterCreatorTexts)(dialog_texts_1.DeleteMaterialDialogTexts.textDialog, rowSelectionModel[0])}/>)}
      {workspaceInfo && (<create_category_form_1.default isOpenCreateCategoryPopup={isDialogCreateNewCategoryOpen.value} allGlobalCategories={allGlobalCategories} onCloseCreateCategoryPopup={handleCreateCategoryPopupClose} allFields={allFieldsOfCategoryMaterialInHandbook}/>)}
    </>);
}
exports.default = Materials;
