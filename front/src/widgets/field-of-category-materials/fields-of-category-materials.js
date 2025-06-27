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
var deep_equal_and_in_1 = require("@/utils/helpers/deep-equal-and-in");
var alert_dialog_1 = require("@/shared/dialogs/alert-dialog/alert-dialog");
var react_1 = require("react");
var templater_creator_1 = require("@/utils/helpers/templater-creator");
var deep_equal_in_tablekeys_1 = require("@/utils/helpers/deep-equal-in-tablekeys");
var dialog_texts_1 = require("@/utils/const/dialog-texts");
var is_entity_field_type_type_guard_1 = require("@/utils/type-guards/is-entity-field-type.type-guard");
var editable_columns_1 = require("@/widgets/field-of-category-materials/editable-columns");
var required_columns_1 = require("@/widgets/field-of-category-materials/required-columns");
var new_field_of_category_material_id_const_1 = require("@/widgets/field-of-category-materials/new-field-of-category-material-id.const");
var field_category_columns_schema_enum_1 = require("@/utils/tables-schemas/field-category/field-category-columns-schema.enum");
var fields_of_category_materials_create_handler_1 = require("@/utils/table-handlers/fields-of-category-materials/fields-of-category-materials-create.handler");
var fields_of_category_materials_update_handler_1 = require("@/utils/table-handlers/fields-of-category-materials/fields-of-category-materials-update.handler");
var fields_of_category_materials_delete_handler_1 = require("@/utils/table-handlers/fields-of-category-materials/fields-of-category-materials-delete.handler");
var Box_1 = require("@mui/material/Box");
var Button_1 = require("@mui/material/Button");
var Add_1 = require("@mui/icons-material/Add");
var Container_1 = require("@mui/material/Container");
var locales_1 = require("@mui/x-data-grid/locales");
var material_1 = require("@mui/material");
var Typography_1 = require("@mui/material/Typography");
var Block_1 = require("@mui/icons-material/Block");
var Check_1 = require("@mui/icons-material/Check");
var DeleteOutlined_1 = require("@mui/icons-material/DeleteOutlined");
var RestartAlt_1 = require("@mui/icons-material/RestartAlt");
var x_data_grid_1 = require("@mui/x-data-grid");
var is_entity_field_unit_measurement_type_guard_1 = require("src/utils/type-guards/is-entity-field-unit-measurement.type-guard");
var custom_breadcrumbs_1 = require("src/shared/breadcrumbs/custom-breadcrumbs");
var workspace_store_1 = require("src/store/workspace/workspace.store");
var NoRowsOverlay_1 = require("src/shared/no-rows-overlay/NoRowsOverlay");
var create_field_unit_measurement_action_1 = require("src/api/actions/field-unit-measurement/create-field-unit-measurement.action");
var delete_field_unit_measurement_action_1 = require("src/api/actions/field-unit-measurement/delete-field-unit-measurement.action");
var create_field_variant_in_field_of_category_material_action_1 = require("src/api/actions/field-variants/create-field-variant-in-field-of-category-material.action");
var delete_field_variant_in_field_of_category_material_action_1 = require("src/api/actions/field-variants/delete-field-variant-in-field-of-category-material.action");
var datagrid_materials_cell_characteristic_1 = require("src/shared/mui-data-grid/datagrid-materials-cell-characteristic/datagrid-materials-cell-characteristic");
var datagrid_materials_cell_unit_measurement_1 = require("src/shared/mui-data-grid/datagrid-materials-cell-unit-measurement/datagrid-materials-cell-unit-measurement");
var table_initial_state_1 = require("./table-initial-state");
function FieldsOfCategoryMaterials(_a) {
    var _b;
    var _this = this;
    var _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
    var fieldsOfCategoryMaterialsInfo = _a.fieldsOfCategoryMaterialsInfo;
    var settings = (0, settings_1.useSettingsContext)();
    var isDeleteFieldCategoryDialogOpen = (0, use_boolean_1.useBoolean)();
    var isChangeTypeFieldOfCategoryDialogOpen = (0, use_boolean_1.useBoolean)();
    var isChangingFieldVariantsForFieldOfCategoryDialogOpen = (0, use_boolean_1.useBoolean)();
    var startLink = process.env.NEXT_PUBLIC_FRONT_ADDRESS;
    var _14 = (0, react_1.useState)(null), fieldTypeToChange = _14[0], setFieldTypeToChange = _14[1];
    var _15 = (0, react_1.useState)(null), cellValueBeforeEdit = _15[0], setCellValueBeforeEdit = _15[1];
    var _16 = (0, react_1.useState)({
        pageSize: 10,
        page: 0,
    }), paginationModel = _16[0], setPaginationModel = _16[1];
    var fieldOfCategoryMaterialsStartDataEntity = fieldsOfCategoryMaterialsInfo.map(function (elem) { return (__assign(__assign({}, elem), { isNew: false })); });
    var _17 = (0, react_1.useState)(fieldOfCategoryMaterialsStartDataEntity), rows = _17[0], setRows = _17[1];
    var _18 = (0, react_1.useState)(false), isCreateRowMode = _18[0], setIsCreateRowMode = _18[1];
    var _19 = (0, react_1.useState)({}), rowModesModel = _19[0], setRowModesModel = _19[1];
    var workspaceInfo = (0, workspace_store_1.useWorkspaceInfoStore)().workspaceInfo;
    var fullWorkspaceInfo = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.currentWorkspaceInfo;
    var fullHandbookInfo = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.currentHandbookInfo;
    var allCategoryMaterialsOfHandbook = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.allCategoryMaterialsOfHandbook;
    var allUnitMeasurementsOfHandbook = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.allFieldsUnitMeasurementsOfHandbook;
    var allTypesOfFieldOfHandbook = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.allFieldTypes;
    var allFieldVariantsOfHandbook = ((workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.allFieldsVariantsOfHandbook) ||
        []);
    var workspaceId = fullWorkspaceInfo === null || fullWorkspaceInfo === void 0 ? void 0 : fullWorkspaceInfo.uuid;
    var handbookId = fullHandbookInfo === null || fullHandbookInfo === void 0 ? void 0 : fullHandbookInfo.uuid;
    var apiRef = (0, x_data_grid_1.useGridApiRef)();
    var _20 = (0, react_1.useState)(apiRef.current.state), gridStateBeforeCreate = _20[0], setGridStateBeforeCreate = _20[1];
    var _21 = (0, react_1.useState)(), columnVisibilityModel = _21[0], setColumnVisibilityModel = _21[1];
    var _22 = (0, react_1.useState)(), fieldsOfCategoryMaterialsDataGridInitialState = _22[0], setFieldsOfCategoryMaterialsMaterialsDataGridInitialState = _22[1];
    var _23 = (0, react_1.useState)([]), rowSelectionModel = _23[0], setRowSelectionModel = _23[1];
    var saveFieldsOfCategoryMaterialsDataGridState = (0, react_1.useCallback)(function () {
        var _a;
        if (((_a = apiRef === null || apiRef === void 0 ? void 0 : apiRef.current) === null || _a === void 0 ? void 0 : _a.exportState) && localStorage) {
            var currentState = apiRef.current.exportState();
            localStorage.setItem("fieldsOfCategoryMaterialsIn".concat(handbookId, "HandbookDataGridState"), JSON.stringify(currentState));
        }
    }, [apiRef]);
    (0, react_1.useEffect)(function () {
        var fieldOfCategoryMaterialsStartDataEntityUpdated = fieldsOfCategoryMaterialsInfo.map(function (elem) { return (__assign(__assign({}, elem), { isNew: false })); });
        setRows(fieldOfCategoryMaterialsStartDataEntityUpdated);
    }, [fieldsOfCategoryMaterialsInfo]);
    (0, react_1.useLayoutEffect)(function () {
        var stateFromLocalStorage = localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem('fieldsOfCategoryMaterialsDataGridState');
        setFieldsOfCategoryMaterialsMaterialsDataGridInitialState(stateFromLocalStorage ? JSON.parse(stateFromLocalStorage) : {});
        // handle refresh and navigating away/refreshing
        window.addEventListener('beforeunload', saveFieldsOfCategoryMaterialsDataGridState);
        return function () {
            // in case of an SPA remove the event-listener
            window.removeEventListener('beforeunload', saveFieldsOfCategoryMaterialsDataGridState);
            saveFieldsOfCategoryMaterialsDataGridState();
        };
    }, [saveFieldsOfCategoryMaterialsDataGridState]);
    var addRequiredColumnsToTable = function (requiredCreateColumns) {
        var tableStateAtStart = apiRef.current.state;
        setGridStateBeforeCreate(tableStateAtStart);
        var initialColumnVisibilityModel = tableStateAtStart === null || tableStateAtStart === void 0 ? void 0 : tableStateAtStart.columns.columnVisibilityModel;
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
        var handleClickAddFieldOfCategoryMaterial = function () {
            var _a;
            addRequiredColumnsToTable(required_columns_1.FieldOfCategoryMaterialRequiredCreateColumns);
            var currentState = apiRef.current.exportState();
            var filterState = (_a = currentState.filter) === null || _a === void 0 ? void 0 : _a.filterModel;
            filterState === null || filterState === void 0 ? void 0 : filterState.items.forEach(function (elem) {
                apiRef.current.deleteFilterItem(elem);
            });
            setRows(function (oldRows) {
                var _a;
                var _b, _c, _d, _e;
                var newRow = (_a = {},
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.uuid] = new_field_of_category_material_id_const_1.NewFieldOfCategoryMaterialId,
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.numInOrder] = 0,
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.name] = 'Наименование поля',
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.comment] = 'Описание поля',
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.fieldType] = allTypesOfFieldOfHandbook.find(function (typeOfField) { return typeOfField.jsType === 'string'; }) ||
                        allTypesOfFieldOfHandbook[0],
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.fieldVariantsForSelectorFieldType] = [],
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.fieldTypeUuid] = ((_b = allTypesOfFieldOfHandbook.find(function (typeOfField) { return typeOfField.jsType === 'string'; })) === null || _b === void 0 ? void 0 : _b.uuid) || ((_c = allTypesOfFieldOfHandbook[0]) === null || _c === void 0 ? void 0 : _c.uuid),
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.defaultValue] = '',
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.isRequired] = true,
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.unitOfMeasurement] = (allUnitMeasurementsOfHandbook === null || allUnitMeasurementsOfHandbook === void 0 ? void 0 : allUnitMeasurementsOfHandbook.find(function (unit) { return unit.isDefault; })) ||
                        allUnitMeasurementsOfHandbook[0],
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.unitOfMeasurementUuid] = ((_d = allUnitMeasurementsOfHandbook === null || allUnitMeasurementsOfHandbook === void 0 ? void 0 : allUnitMeasurementsOfHandbook.find(function (unit) { return unit.isDefault; })) === null || _d === void 0 ? void 0 : _d.uuid) ||
                        ((_e = allUnitMeasurementsOfHandbook[0]) === null || _e === void 0 ? void 0 : _e.uuid),
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.categoriesMaterial] = [],
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.updatedAt] = new Date(),
                    _a[field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.characteristicsMaterial] = [],
                    _a.isNew = true,
                    _a);
                return __spreadArray([newRow], oldRows, true);
            });
            setIsCreateRowMode(function (prevMode) { return !prevMode; });
            setRowModesModel(function (oldModel) {
                var _a;
                return (__assign((_a = {}, _a[new_field_of_category_material_id_const_1.NewFieldOfCategoryMaterialId] = { mode: x_data_grid_1.GridRowModes.Edit, fieldToFocus: 'name' }, _a), oldModel));
            });
            var currentRowsIds = apiRef.current.getAllRowIds();
            currentRowsIds.forEach(function (rowId) {
                apiRef.current.selectRow(rowId, false, true);
            });
        };
        var isCreateRowButtonVisible = function () {
            var newRow = apiRef.current.getRowWithUpdatedValues(new_field_of_category_material_id_const_1.NewFieldOfCategoryMaterialId, 'ignore');
            // if (
            //   newRow?.name &&
            //   typeof newRow?.categoryMaterial &&
            //   newRow?.unitMeasurement &&
            //   (newRow?.price || newRow?.price === 0)
            // ) {
            return true;
            // }
            // return false;
        };
        var isResetSettingsVisible = function () {
            var _a;
            var curTableState = apiRef.current.state;
            var initialState = table_initial_state_1.columnsInitialState;
            var isEqColumns = !(0, deep_equal_and_in_1.deepEqualAndIn)(curTableState, initialState);
            var columnsCurrent = apiRef.current.state.columns.lookup;
            var columnsInitial = (_a = table_initial_state_1.columnsInitialState.columns) === null || _a === void 0 ? void 0 : _a.dimensions;
            var isEqWidths = (0, deep_equal_in_tablekeys_1.deepEqualAndInTableKeys)(columnsCurrent, columnsInitial);
            return isEqColumns || isEqWidths;
        };
        var handleClickResetSettingsTable = function () {
            apiRef.current.restoreState(table_initial_state_1.columnsInitialState);
            localStorage.setItem('fieldsOfCategoryMaterialsDataGridState', JSON.stringify(table_initial_state_1.columnsInitialState));
        };
        var isDeleteRowVisible = function () {
            var rowsIdToDelete = rowSelectionModel;
            return rowsIdToDelete.length > 0;
        };
        return (<x_data_grid_1.GridToolbarContainer sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Box_1.default>
          <Button_1.default color="primary" disabled={isCreateRowMode} startIcon={<Add_1.default />} onClick={handleClickAddFieldOfCategoryMaterial}>
            Создать поле
          </Button_1.default>

          {isDeleteRowVisible() && (<Button_1.default color="error" startIcon={<DeleteOutlined_1.default />} onClick={handleDeleteRowClick}>
              Удалить
            </Button_1.default>)}

          {isCreateRowMode && (<Button_1.default color="primary" startIcon={<Check_1.default />} disabled={!isCreateRowButtonVisible()} onClick={handleSaveClick}>
              Подтвердить
            </Button_1.default>)}

          {isCreateRowMode && (<Button_1.default color="warning" startIcon={<Block_1.default />} onClick={handleCancelCreatingNewRowClick}>
              Отменить создание поля
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
        isDeleteFieldCategoryDialogOpen.onTrue();
    };
    var handleCancelCreatingNewRowClick = function (event) {
        var startTableState = gridStateBeforeCreate;
        var oldColumnVisibilityModel = startTableState.columns.columnVisibilityModel;
        if (typeof startTableState === 'object' && Object.keys(startTableState).length !== 0) {
            apiRef.current.restoreState(startTableState);
            apiRef.current.setColumnVisibilityModel(oldColumnVisibilityModel);
        }
        allowHideRequiredColumns(required_columns_1.FieldOfCategoryMaterialRequiredCreateColumns, apiRef.current.state);
        handleCancelCreatingClick(new_field_of_category_material_id_const_1.NewFieldOfCategoryMaterialId);
    };
    var handleCancelCreatingClick = function (id) {
        var _a;
        setRowModesModel(__assign(__assign({}, rowModesModel), (_a = {}, _a[id] = { mode: x_data_grid_1.GridRowModes.View, ignoreModifications: true }, _a)));
        var editedRow = rows.find(function (row) { return row.uuid === id; });
        if (editedRow === null || editedRow === void 0 ? void 0 : editedRow.isNew) {
            setRows(rows.filter(function (row) { return row.uuid !== id; }));
        }
        setIsCreateRowMode(function (prevValue) { return !prevValue; });
    };
    // const handleClickAddNewVariantForDefaultValueForVariantsOfFieldOfCategoryMaterials = () => {
    //   isChangingFieldVariantsForFieldOfCategoryDialogOpen.onTrue();
    // };
    // const handleCellEdit = async (
    //   rowCurrentState: GridValidRowModel,
    //   handbookInfo: HandbookGetCommand.ResponseEntity,
    //   params: GridCellEditStopParams,
    //   event: MuiEvent
    // ) => {
    //   const workspaceId = handbookInfo.workspaceUuid;
    //   const handbookId = handbookInfo.uuid;
    //   const allFieldTypes = workspaceInfo?.allFieldTypes;
    //
    //   const updateFieldOfCategoryDto: Partial<TFieldsOfCategoryMaterialTableEntity> = {
    //     [params.field]: rowCurrentState[params.field],
    //   };
    //
    //   if (params.field === 'fieldType') {
    //     updateFieldOfCategoryDto = { ...updateFieldOfCategoryDto, defaultValue: null };
    //   }
    //
    //   const updatedRow = (await fieldsOfCategoryMaterialsUpdateHandler(
    //     updateFieldOfCategoryDto as TFieldsOfCategoryMaterialTableEntity,
    //     workspaceId as string,
    //     handbookId,
    //     params.row.uuid,
    //     allFieldTypes
    //   )) as FieldOfCategoryMaterialUpdateCommand.ResponseEntity;
    //
    //   setValueOfDefaultValueForSelect('');
    //
    //   if (params.reason !== GridCellEditStopReasons.shiftTabKeyDown) {
    //     event.defaultMuiPrevented = true;
    //   }
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
        var rowCurrentState, updateFieldOfCategoryDto, oldFieldOfCategory, oldFieldTypeName, newFieldTypeName, newUnitMeasurementId, updatedRow;
        var _a;
        var _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    rowCurrentState = apiRef.current.getRowWithUpdatedValues(params.id, params.field);
                    if (!(params.field === field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.fieldType)) return [3 /*break*/, 1];
                    oldFieldOfCategory = fieldsOfCategoryMaterialsInfo.find(function (row) { return row.uuid === params.id; });
                    oldFieldTypeName = (_b = oldFieldOfCategory === null || oldFieldOfCategory === void 0 ? void 0 : oldFieldOfCategory.fieldType) === null || _b === void 0 ? void 0 : _b.name;
                    newFieldTypeName = rowCurrentState[params.field];
                    if (oldFieldTypeName !== newFieldTypeName) {
                        setFieldTypeToChange({
                            idOfFieldOfCategoryRow: params.id,
                            oldFieldOfCategory: oldFieldOfCategory,
                            updatedFieldOfCategory: rowCurrentState,
                            params: params,
                            oldFieldTypeName: oldFieldTypeName,
                            newFieldTypeName: newFieldTypeName,
                            workspaceFullInfo: {
                                allFieldTypes: allTypesOfFieldOfHandbook,
                                workspaceId: workspaceId,
                                handbookId: handbookId,
                            },
                        });
                        isChangeTypeFieldOfCategoryDialogOpen.onTrue();
                    }
                    return [3 /*break*/, 5];
                case 1:
                    if (!(params.field === field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.defaultValue &&
                        params.value === '')) return [3 /*break*/, 2];
                    isChangingFieldVariantsForFieldOfCategoryDialogOpen.onTrue();
                    return [3 /*break*/, 5];
                case 2:
                    if (!(params.field === field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.unitOfMeasurement)) return [3 /*break*/, 3];
                    newUnitMeasurementId = (_c = allUnitMeasurementsOfHandbook === null || allUnitMeasurementsOfHandbook === void 0 ? void 0 : allUnitMeasurementsOfHandbook.find(function (unitMeasurement) { return unitMeasurement.name === rowCurrentState[params.field]; })) === null || _c === void 0 ? void 0 : _c.uuid;
                    updateFieldOfCategoryDto = { unitOfMeasurementUuid: newUnitMeasurementId };
                    return [3 /*break*/, 5];
                case 3:
                    updateFieldOfCategoryDto = (_a = {},
                        _a[params.field] = rowCurrentState[params.field],
                        _a);
                    return [4 /*yield*/, (0, fields_of_category_materials_update_handler_1.fieldsOfCategoryMaterialsUpdateHandler)(updateFieldOfCategoryDto, workspaceId, handbookId, (_d = params.row) === null || _d === void 0 ? void 0 : _d.uuid, allTypesOfFieldOfHandbook)];
                case 4:
                    updatedRow = (_e.sent());
                    _e.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleCellEditStart = function (params, event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setCellValueBeforeEdit({ id: params.id, value: params.value });
            return [2 /*return*/];
        });
    }); };
    var handleSaveClick = function () { return __awaiter(_this, void 0, void 0, function () {
        var id, isNewRow, finalRow, newRowLocally;
        var _a;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    id = new_field_of_category_material_id_const_1.NewFieldOfCategoryMaterialId;
                    isNewRow = (_b = apiRef.current.getRow(id)) === null || _b === void 0 ? void 0 : _b.isNew;
                    if (!isNewRow) return [3 /*break*/, 2];
                    newRowLocally = apiRef.current.getRowWithUpdatedValues(id, 'ignore');
                    return [4 /*yield*/, (0, fields_of_category_materials_create_handler_1.fieldOfCategoryMaterialCreateHandler)(newRowLocally, workspaceId, handbookId)];
                case 1:
                    finalRow = (_c.sent());
                    return [3 /*break*/, 3];
                case 2: throw new Error('isNewRow = false, problem with creating a new row');
                case 3:
                    setRowModesModel(__assign(__assign({}, rowModesModel), (_a = {}, _a[id] = { mode: x_data_grid_1.GridRowModes.View, ignoreModifications: true }, _a)));
                    setIsCreateRowMode(function (prevValue) { return !prevValue; });
                    setRows(function (oldRows) {
                        var updatedRow = __assign(__assign({}, finalRow), { isNew: false });
                        return oldRows.map(function (row) { return (row.uuid === id ? updatedRow : row); });
                    });
                    return [2 /*return*/];
            }
        });
    }); };
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
    var allFieldsOfCategoryMaterialsTableColumns = [
        {
            field: field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.uuid,
            headerName: 'id',
            width: (_e = (_d = (_c = fieldsOfCategoryMaterialsDataGridInitialState === null || fieldsOfCategoryMaterialsDataGridInitialState === void 0 ? void 0 : fieldsOfCategoryMaterialsDataGridInitialState.columns) === null || _c === void 0 ? void 0 : _c.dimensions) === null || _d === void 0 ? void 0 : _d.uuid) === null || _e === void 0 ? void 0 : _e.width,
            sortable: false,
            filterable: false,
            resizable: false,
            align: 'left',
            headerAlign: 'left',
            disableColumnMenu: true,
            disableReorder: true,
        },
        {
            field: field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.numInOrder,
            headerName: 'Номер п/п',
            minWidth: 90,
            width: (_h = (_g = (_f = fieldsOfCategoryMaterialsDataGridInitialState === null || fieldsOfCategoryMaterialsDataGridInitialState === void 0 ? void 0 : fieldsOfCategoryMaterialsDataGridInitialState.columns) === null || _f === void 0 ? void 0 : _f.dimensions) === null || _g === void 0 ? void 0 : _g.numInOrder) === null || _h === void 0 ? void 0 : _h.width,
            align: 'left',
            headerAlign: 'left',
        },
        {
            field: field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.name,
            headerName: 'Наименование',
            minWidth: 220,
            width: (_l = (_k = (_j = fieldsOfCategoryMaterialsDataGridInitialState === null || fieldsOfCategoryMaterialsDataGridInitialState === void 0 ? void 0 : fieldsOfCategoryMaterialsDataGridInitialState.columns) === null || _j === void 0 ? void 0 : _j.dimensions) === null || _k === void 0 ? void 0 : _k.name) === null || _l === void 0 ? void 0 : _l.width,
            flex: 1,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            hideable: false,
            hideSortIcons: true,
            sortable: false,
        },
        {
            field: field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.fieldType,
            headerName: 'Тип поля',
            minWidth: 170,
            width: (_p = (_o = (_m = fieldsOfCategoryMaterialsDataGridInitialState === null || fieldsOfCategoryMaterialsDataGridInitialState === void 0 ? void 0 : fieldsOfCategoryMaterialsDataGridInitialState.columns) === null || _m === void 0 ? void 0 : _m.dimensions) === null || _o === void 0 ? void 0 : _o.fieldType) === null || _p === void 0 ? void 0 : _p.width,
            align: 'left',
            headerAlign: 'left',
            editable: true,
            type: 'singleSelect',
            valueOptions: function (params) {
                var fieldTypeNames = allTypesOfFieldOfHandbook && allTypesOfFieldOfHandbook.map(function (elem) { return elem.name; });
                return fieldTypeNames;
            },
            valueGetter: function (value, row) {
                return (0, is_entity_field_type_type_guard_1.isEntityFieldTypeTypeGuard)(value) ? value.name : value;
            },
        },
        {
            field: field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.comment,
            headerName: 'Описание',
            minWidth: 190,
            width: (_s = (_r = (_q = fieldsOfCategoryMaterialsDataGridInitialState === null || fieldsOfCategoryMaterialsDataGridInitialState === void 0 ? void 0 : fieldsOfCategoryMaterialsDataGridInitialState.columns) === null || _q === void 0 ? void 0 : _q.dimensions) === null || _r === void 0 ? void 0 : _r.comment) === null || _s === void 0 ? void 0 : _s.width,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.isRequired,
            headerName: 'Обязательность заполнения',
            minWidth: 140,
            width: (_v = (_u = (_t = fieldsOfCategoryMaterialsDataGridInitialState === null || fieldsOfCategoryMaterialsDataGridInitialState === void 0 ? void 0 : fieldsOfCategoryMaterialsDataGridInitialState.columns) === null || _t === void 0 ? void 0 : _t.dimensions) === null || _u === void 0 ? void 0 : _u.isRequired) === null || _v === void 0 ? void 0 : _v.width,
            type: 'boolean',
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.defaultValue,
            headerName: 'Значение по умолчанию',
            align: 'left',
            headerAlign: 'left',
            minWidth: 100,
            width: (_y = (_x = (_w = fieldsOfCategoryMaterialsDataGridInitialState === null || fieldsOfCategoryMaterialsDataGridInitialState === void 0 ? void 0 : fieldsOfCategoryMaterialsDataGridInitialState.columns) === null || _w === void 0 ? void 0 : _w.dimensions) === null || _x === void 0 ? void 0 : _x.defaultValue) === null || _y === void 0 ? void 0 : _y.width,
            editable: true,
            renderEditCell: function (params) {
                var _a, _b, _c, _d, _e, _f;
                var isSelect = ((_b = (_a = params.row) === null || _a === void 0 ? void 0 : _a.fieldType) === null || _b === void 0 ? void 0 : _b.jsType) === 'array';
                var isOnlyDigits = ((_d = (_c = params.row) === null || _c === void 0 ? void 0 : _c.fieldType) === null || _d === void 0 ? void 0 : _d.jsType) === 'number';
                var optionsForSelect = (_f = (_e = params.row) === null || _e === void 0 ? void 0 : _e.fieldVariantsForSelectorFieldType) === null || _f === void 0 ? void 0 : _f.map(function (fieldVariant) { return fieldVariant; });
                return (<datagrid_materials_cell_characteristic_1.DataGridCellCharacteristic id={params.id} field={params.field} isSelect={isSelect} optionsForSelect={optionsForSelect} defaultValue={params === null || params === void 0 ? void 0 : params.value} isOnlyDigits={isOnlyDigits} allFieldVariantsOfHandbook={allFieldVariantsOfHandbook} fieldCategoryId={params.row.uuid} handleClickAddNewFieldVariants={handleClickAddNewFieldVariants}/>);
            },
        },
        {
            field: field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.unitOfMeasurement,
            headerName: 'Ед. изм.',
            align: 'left',
            headerAlign: 'left',
            minWidth: 100,
            width: (_1 = (_0 = (_z = fieldsOfCategoryMaterialsDataGridInitialState === null || fieldsOfCategoryMaterialsDataGridInitialState === void 0 ? void 0 : fieldsOfCategoryMaterialsDataGridInitialState.columns) === null || _z === void 0 ? void 0 : _z.dimensions) === null || _0 === void 0 ? void 0 : _0.unitOfMeasurement) === null || _1 === void 0 ? void 0 : _1.width,
            editable: true,
            type: 'singleSelect',
            valueOptions: function (params) {
                var fieldUnitMeasurementNames = allUnitMeasurementsOfHandbook && allUnitMeasurementsOfHandbook.map(function (elem) { return elem.name; });
                return fieldUnitMeasurementNames;
            },
            renderEditCell: function (params) {
                var optionsForSelect = allUnitMeasurementsOfHandbook;
                return (<datagrid_materials_cell_unit_measurement_1.DataGridCellUnitMeasurement id={params.id} field={params.field} optionsForSelect={optionsForSelect} defaultValue={params === null || params === void 0 ? void 0 : params.value} handleClickAddNewUnitMeasurement={handleClickAddNewUnitMeasurement} handleClickDeleteUnitMeasurement={handleClickDeleteUnitMeasurement}/>);
            },
            valueGetter: function (value, row) {
                return (0, is_entity_field_unit_measurement_type_guard_1.isEntityFieldUnitMeasurementTG)(value) ? value.name : value;
            },
        },
        {
            field: field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.categoriesMaterial,
            headerName: 'Используется в категориях',
            minWidth: 190,
            width: (_4 = (_3 = (_2 = fieldsOfCategoryMaterialsDataGridInitialState === null || fieldsOfCategoryMaterialsDataGridInitialState === void 0 ? void 0 : fieldsOfCategoryMaterialsDataGridInitialState.columns) === null || _2 === void 0 ? void 0 : _2.dimensions) === null || _3 === void 0 ? void 0 : _3.categoriesMaterial) === null || _4 === void 0 ? void 0 : _4.width,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            valueGetter: function (categories, row) {
                var categoriesNames = categories === null || categories === void 0 ? void 0 : categories.map(function (category) { return category === null || category === void 0 ? void 0 : category.name; });
                return (categoriesNames === null || categoriesNames === void 0 ? void 0 : categoriesNames.join(', ')) || 'не представлено';
            },
        },
        {
            field: field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.categoriesMaterialsTemplatesIncludesThisField,
            headerName: 'Используется в наименовании категорий',
            minWidth: 190,
            width: (_7 = (_6 = (_5 = fieldsOfCategoryMaterialsDataGridInitialState === null || fieldsOfCategoryMaterialsDataGridInitialState === void 0 ? void 0 : fieldsOfCategoryMaterialsDataGridInitialState.columns) === null || _5 === void 0 ? void 0 : _5.dimensions) === null || _6 === void 0 ? void 0 : _6.categoriesMaterialsTemplatesIncludesThisField) === null || _7 === void 0 ? void 0 : _7.width,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            valueGetter: function (categoriesMaterialsTemplatesIncludesThisField, row) {
                var categoriesNames = categoriesMaterialsTemplatesIncludesThisField === null || categoriesMaterialsTemplatesIncludesThisField === void 0 ? void 0 : categoriesMaterialsTemplatesIncludesThisField.map(function (category) { return category.name; });
                return (categoriesNames === null || categoriesNames === void 0 ? void 0 : categoriesNames.join(', ')) || 'не представлено';
            },
        },
        {
            field: field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.characteristicsMaterial,
            headerName: 'Количество привязанных характеристик',
            minWidth: 210,
            width: (_10 = (_9 = (_8 = fieldsOfCategoryMaterialsDataGridInitialState === null || fieldsOfCategoryMaterialsDataGridInitialState === void 0 ? void 0 : fieldsOfCategoryMaterialsDataGridInitialState.columns) === null || _8 === void 0 ? void 0 : _8.dimensions) === null || _9 === void 0 ? void 0 : _9.characteristicsMaterial) === null || _10 === void 0 ? void 0 : _10.width,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            hideable: true,
            hideSortIcons: true,
            sortable: false,
            valueGetter: function (value, row) {
                var characteristicsMaterialLength = row.characteristicsMaterial.length;
                return characteristicsMaterialLength || 'не создано';
            },
        },
        {
            field: field_category_columns_schema_enum_1.FieldOfCategoryMaterialColumnSchema.updatedAt,
            valueGetter: function (value, row) {
                var formattedDate = (0, moment_1.default)(row.updatedAt).locale('ru').format('DD.MM.YYYY HH:mm:ss');
                return formattedDate;
            },
            headerName: 'Дата изменения',
            minWidth: 150,
            width: (_13 = (_12 = (_11 = fieldsOfCategoryMaterialsDataGridInitialState === null || fieldsOfCategoryMaterialsDataGridInitialState === void 0 ? void 0 : fieldsOfCategoryMaterialsDataGridInitialState.columns) === null || _11 === void 0 ? void 0 : _11.dimensions) === null || _12 === void 0 ? void 0 : _12.updatedAt) === null || _13 === void 0 ? void 0 : _13.width,
            align: 'left',
            headerAlign: 'left',
            editable: false,
            hideable: true,
            hideSortIcons: true,
            sortable: false,
        },
    ];
    var handleClickYesDeleteFieldCategoryDialog = function () { return __awaiter(_this, void 0, void 0, function () {
        var rowIdToDelete, rowInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rowIdToDelete = rowSelectionModel[0];
                    rowInfo = apiRef.current.getRow(rowIdToDelete);
                    return [4 /*yield*/, (0, fields_of_category_materials_delete_handler_1.fieldsOfCategoryMaterialsDeleteHandler)(workspaceId, handbookId, rowInfo.uuid)];
                case 1:
                    _a.sent();
                    setRows(rows.filter(function (row) { return row.uuid !== rowIdToDelete; }));
                    return [2 /*return*/];
            }
        });
    }); };
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
    var handleClickYesChangeTypeFieldOfCategory = function (event) { return __awaiter(_this, void 0, void 0, function () {
        var newFieldType, updateFieldOfCategoryDto, updatedRow;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    newFieldType = fieldTypeToChange === null || fieldTypeToChange === void 0 ? void 0 : fieldTypeToChange.workspaceFullInfo.allFieldTypes.find(function (elem) { return elem.name === (fieldTypeToChange === null || fieldTypeToChange === void 0 ? void 0 : fieldTypeToChange.newFieldTypeName); });
                    updateFieldOfCategoryDto = {
                        fieldTypeUuid: (newFieldType === null || newFieldType === void 0 ? void 0 : newFieldType.uuid) || ((_a = fieldTypeToChange === null || fieldTypeToChange === void 0 ? void 0 : fieldTypeToChange.updatedFieldOfCategory) === null || _a === void 0 ? void 0 : _a.fieldTypeUuid),
                        defaultValue: null,
                    };
                    return [4 /*yield*/, (0, fields_of_category_materials_update_handler_1.fieldsOfCategoryMaterialsUpdateHandler)(updateFieldOfCategoryDto, fieldTypeToChange === null || fieldTypeToChange === void 0 ? void 0 : fieldTypeToChange.workspaceFullInfo.workspaceId, fieldTypeToChange === null || fieldTypeToChange === void 0 ? void 0 : fieldTypeToChange.workspaceFullInfo.handbookId, fieldTypeToChange === null || fieldTypeToChange === void 0 ? void 0 : fieldTypeToChange.idOfFieldOfCategoryRow, (_b = fieldTypeToChange === null || fieldTypeToChange === void 0 ? void 0 : fieldTypeToChange.workspaceFullInfo) === null || _b === void 0 ? void 0 : _b.allFieldTypes)];
                case 1:
                    updatedRow = (_c.sent());
                    return [2 /*return*/];
            }
        });
    }); };
    var onClickYesDeleteFieldCategoryDialog = function (event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, handleClickYesDeleteFieldCategoryDialog()];
                case 1:
                    _a.sent();
                    isDeleteFieldCategoryDialogOpen.onFalse();
                    return [2 /*return*/];
            }
        });
    }); };
    var onClickYesChangeTypeFieldOfCategoryDialog = function (event) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, handleClickYesChangeTypeFieldOfCategory(event)];
                case 1:
                    _a.sent();
                    isChangeTypeFieldOfCategoryDialogOpen.onFalse();
                    setFieldTypeToChange(null);
                    setCellValueBeforeEdit(null);
                    return [2 /*return*/];
            }
        });
    }); };
    var onClickNoChangeTypeFieldOfCategoryDialog = function (event) {
        setRows(function (oldRows) {
            return oldRows.map(function (row) {
                if (cellValueBeforeEdit && row.uuid === cellValueBeforeEdit.id) {
                    row.fieldType = cellValueBeforeEdit === null || cellValueBeforeEdit === void 0 ? void 0 : cellValueBeforeEdit.value;
                    return row;
                }
                return row;
            });
        });
        setFieldTypeToChange(null);
        setCellValueBeforeEdit(null);
    };
    return (<>
      <Container_1.default maxWidth="xl">
        {fieldsOfCategoryMaterialsDataGridInitialState ? (<>
            <Typography_1.default variant="h4"> Справочник полей для категорий</Typography_1.default>
            <custom_breadcrumbs_1.default 
        // heading="Carousel"
        sx={{
                paddingRight: 3,
                marginBottom: 2,
                marginTop: 1,
                width: '100%',
                maxWidth: 'xl',
            }} concreteCrumbs={[
                {
                    name: 'Дашборд',
                    href: "https://alibaba.hhos.ru/dashboard",
                },
                { name: 'Поля категорий' },
            ]}/>

            <Box_1.default sx={{ width: '100%' }}>
              <x_data_grid_1.DataGrid apiRef={apiRef} localeText={__assign({ columnsManagementReset: 'Сбросить', columnsManagementShowHideAllText: 'Показать/скрыть все' }, locales_1.ruRU.components.MuiDataGrid.defaultProps.localeText)} initialState={__assign(__assign({}, table_initial_state_1.columnsInitialState), fieldsOfCategoryMaterialsDataGridInitialState)} rows={rows} columns={__spreadArray([
                __assign(__assign({}, x_data_grid_1.GRID_CHECKBOX_SELECTION_COL_DEF), { hideable: false, headerName: 'Выбор строки', cellClassName: 'MuiDataGrid-cellCheckbox', headerClassName: 'MuiDataGrid-columnHeaderCheckbox' })
            ], allFieldsOfCategoryMaterialsTableColumns, true)} getRowId={function (row) { return row.uuid; }} loading={!workspaceInfo || !fieldsOfCategoryMaterialsInfo || !rows} editMode={isCreateRowMode ? 'row' : 'cell'} pageSizeOptions={[5, 10, 20, 50, 100]} paginationModel={paginationModel} onPaginationModelChange={function (paginationModelGrid) {
                return setPaginationModel(paginationModelGrid);
            }} rowModesModel={rowModesModel} onRowModesModelChange={handleRowModesModelChange} isCellEditable={function (params) {
                var _a, _b, _c, _d;
                if (isCreateRowMode) {
                    return (_a = params === null || params === void 0 ? void 0 : params.row) === null || _a === void 0 ? void 0 : _a.isNew;
                }
                if (params.field === 'isRequired') {
                    return ((_c = (_b = params.row) === null || _b === void 0 ? void 0 : _b.categoriesMaterialsTemplatesIncludesThisField) === null || _c === void 0 ? void 0 : _c.length) === 0;
                }
                var isCellInEditableColumn = editable_columns_1.FieldOfCategoryMaterialEditableColumns.includes(params.field);
                var isNewRow = (_d = params.row) === null || _d === void 0 ? void 0 : _d.isNew;
                return isNewRow || (isCellInEditableColumn && !isCreateRowMode);
            }} 
        // slots={{ toolbar: GridToolbar }}
        slots={{
                noRowsOverlay: NoRowsOverlay_1.CustomNoRowsOverlay,
                noResultsOverlay: NoRowsOverlay_1.CustomNoResultsOverlay,
                toolbar: editToolbar,
            }} slotProps={{
                toolbar: { setRows: setRows, setRowModesModel: setRowModesModel },
            }} autoHeight getRowHeight={function () { return 'auto'; }} isRowSelectable={function (params) { return !isCreateRowMode; }} onRowSelectionModelChange={function (newRowSelectionModel) {
                setRowSelectionModel(newRowSelectionModel);
            }} rowSelectionModel={rowSelectionModel} sx={_b = {},
                _b["& .".concat(x_data_grid_1.gridClasses.cell)] = {
                    border: 'none',
                    minHeight: '50px',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                },
                _b['& .MuiDataGrid-cell--editable'] = {
                    bgcolor: function (theme) {
                        return theme.palette.mode === 'light' ? "#DBDBDE35" : "rgba(9, 9, 9, 0.11)";
                    },
                },
                _b} disableRowSelectionOnClick checkboxSelection disableMultipleRowSelection columnVisibilityModel={columnVisibilityModel} onColumnVisibilityModelChange={function (newModel) {
                setColumnVisibilityModel(newModel);
            }} onCellEditStop={handleCellEditStop} onRowEditStop={handleRowEditStop} onCellEditStart={handleCellEditStart}/>
            </Box_1.default>
          </>) : (<material_1.CircularProgress sx={{ position: 'absolute', top: '50%', left: '50%' }}/>)}
      </Container_1.default>

      {isDeleteFieldCategoryDialogOpen && (<alert_dialog_1.default isDialogOpen={isDeleteFieldCategoryDialogOpen} onClickYes={onClickYesDeleteFieldCategoryDialog} titleDialog={dialog_texts_1.DeleteFieldDialogTexts.titleDialog} textDialog={(0, templater_creator_1.templaterCreatorTexts)(dialog_texts_1.DeleteFieldDialogTexts.textDialog, rowSelectionModel[0])}/>)}

      <alert_dialog_1.default isDialogOpen={isChangeTypeFieldOfCategoryDialogOpen} onClickYes={onClickYesChangeTypeFieldOfCategoryDialog} titleDialog={dialog_texts_1.ChangeTypeFieldDialogTexts.titleDialog} textDialog={(0, templater_creator_1.templaterCreatorTexts)(dialog_texts_1.ChangeTypeFieldDialogTexts.textDialog, [
            fieldTypeToChange === null || fieldTypeToChange === void 0 ? void 0 : fieldTypeToChange.idOfFieldOfCategoryRow,
            fieldTypeToChange === null || fieldTypeToChange === void 0 ? void 0 : fieldTypeToChange.oldFieldTypeName,
            fieldTypeToChange === null || fieldTypeToChange === void 0 ? void 0 : fieldTypeToChange.newFieldTypeName,
        ])} onClickNo={onClickNoChangeTypeFieldOfCategoryDialog}/>
    </>);
}
exports.default = FieldsOfCategoryMaterials;
