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
Object.defineProperty(exports, "__esModule", { value: true });
var notistack_1 = require("notistack");
var react_1 = require("react");
var category_table_1 = require("@/widgets/categories/category-materials/category-table/category-table");
var category_filters_1 = require("@/widgets/categories/category-materials/category-filters/category-filters");
var category_grid_view_1 = require("@/widgets/categories/category-materials/category-grid/category-grid-view");
var delete_one_category_material_action_1 = require("@/api/actions/category-material/delete-one-category-material.action");
var Stack_1 = require("@mui/material/Stack");
var Button_1 = require("@mui/material/Button");
var Container_1 = require("@mui/material/Container");
var Typography_1 = require("@mui/material/Typography");
var IconButton_1 = require("@mui/material/IconButton");
var ToggleButton_1 = require("@mui/material/ToggleButton");
var ToggleButtonGroup_1 = require("@mui/material/ToggleButtonGroup");
var use_boolean_1 = require("src/utils/hooks/use-boolean");
var iconify_1 = require("src/shared/iconify");
var empty_content_1 = require("src/shared/empty-content");
var custom_dialog_1 = require("src/shared/custom-dialog");
var table_1 = require("src/shared/table");
var custom_breadcrumbs_1 = require("src/shared/breadcrumbs/custom-breadcrumbs");
var workspace_store_1 = require("src/store/workspace/workspace.store");
var consts_1 = require("src/widgets/categories/category-materials/consts");
var edit_category_form_1 = require("src/shared/popups/edit-category-form/edit-category-form");
var create_category_form_1 = require("src/shared/popups/create-category-form/create-category-form");
var apply_filter_handler_1 = require("src/widgets/categories/category-materials/helpers/apply-filter.handler");
var delete_many_category_material_action_1 = require("src/api/actions/category-material/delete-many-category-material.action");
var file_manager_filters_result_1 = require("../unused-components/file-manager-filters-result");
function CategoryMaterials(_a) {
    var _this = this;
    var materials = _a.materials, allCategoriesInWorkspace = _a.allCategoriesInWorkspace;
    var enqueueSnackbar = (0, notistack_1.useSnackbar)().enqueueSnackbar;
    var startLink = process.env.NEXT_PUBLIC_FRONT_ADDRESS;
    var _b = (0, react_1.useState)(undefined), categoryToChange = _b[0], setCategoryToChange = _b[1];
    var workspaceInfo = (0, workspace_store_1.useWorkspaceInfoStore)(function (state) { return state; }).workspaceInfo;
    var currentWorkspaceInfo = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.currentWorkspaceInfo;
    var currentHandbookInfo = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.currentHandbookInfo;
    var allFields = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.allFieldsOfCategoryMaterialsOfHandbook;
    var allGlobalCategories = workspaceInfo === null || workspaceInfo === void 0 ? void 0 : workspaceInfo.allGlobalCategories;
    var table = (0, table_1.useTable)({ defaultRowsPerPage: 10 });
    var isDeletingManyCategoriesPopupOpened = (0, use_boolean_1.useBoolean)();
    var isCreatingNewCategoryPopupOpened = (0, use_boolean_1.useBoolean)();
    var isChangingCategoryPopupOpened = (0, use_boolean_1.useBoolean)();
    var _c = (0, react_1.useState)('list'), view = _c[0], setView = _c[1];
    var _d = (0, react_1.useState)(allCategoriesInWorkspace), tableData = _d[0], setTableData = _d[1];
    (0, react_1.useEffect)(function () {
        setTableData(allCategoriesInWorkspace);
    }, [allCategoriesInWorkspace]);
    var _e = (0, react_1.useState)(consts_1.defaultFilters), filters = _e[0], setFilters = _e[1];
    var dataFiltered = (0, apply_filter_handler_1.applyFilterHandler)({
        inputData: tableData,
        comparator: (0, table_1.getComparator)(table.order, table.orderBy),
        filters: filters,
    });
    var dataInPage = dataFiltered === null || dataFiltered === void 0 ? void 0 : dataFiltered.slice(table.page * table.rowsPerPage, table.page * table.rowsPerPage + table.rowsPerPage);
    var canReset = !!filters.name;
    var notFound = (!(dataFiltered === null || dataFiltered === void 0 ? void 0 : dataFiltered.length) && canReset) || !(dataFiltered === null || dataFiltered === void 0 ? void 0 : dataFiltered.length);
    var handleChangeView = function (event, newView) {
        if (newView !== null) {
            setView(newView);
        }
    };
    var handleChangingCategoryPopupClose = function () {
        setCategoryToChange(undefined);
        isChangingCategoryPopupOpened.onFalse();
    };
    var handleCreateCategoryPopupClose = function () {
        setCategoryToChange(undefined);
        isCreatingNewCategoryPopupOpened.onFalse();
    };
    var handleChangeCategory = function (event, newCategoryInfoToChange) {
        setCategoryToChange(newCategoryInfoToChange);
        isChangingCategoryPopupOpened.onTrue();
    };
    var handleFilters = (0, react_1.useCallback)(function (name, value) {
        table.onResetPage();
        setFilters(function (prevState) {
            var _a;
            return (__assign(__assign({}, prevState), (_a = {}, _a[name] = value, _a)));
        });
    }, [table]);
    var handleResetFilters = (0, react_1.useCallback)(function () {
        setFilters(consts_1.defaultFilters);
    }, []);
    var handleDeleteOneCategory = function (id) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // const allRowsWithoutDeleted = tableData.filter((row) => row.uuid !== id);
                return [4 /*yield*/, (0, delete_one_category_material_action_1.deleteOneCategoryMaterial)(currentWorkspaceInfo === null || currentWorkspaceInfo === void 0 ? void 0 : currentWorkspaceInfo.uuid, currentHandbookInfo === null || currentHandbookInfo === void 0 ? void 0 : currentHandbookInfo.uuid, id)];
                case 1:
                    // const allRowsWithoutDeleted = tableData.filter((row) => row.uuid !== id);
                    _a.sent();
                    table.onUpdatePageDeleteRow(dataInPage === null || dataInPage === void 0 ? void 0 : dataInPage.length);
                    setTableData(function (prevCategories) { return prevCategories.filter(function (category) { return category.uuid !== id; }); });
                    // setTableData(allCategoriesInWorkspace);
                    enqueueSnackbar('Удаление одной категории успешно произведено!');
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDeleteManyCategories = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var selectedCategoriesToDelete;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    selectedCategoriesToDelete = table.selected;
                    // const allRowsWithoutDeleted = tableData.filter(
                    //   (categoryMaterialInTable) => !table.selected.includes(categoryMaterialInTable?.uuid as string)
                    // );
                    return [4 /*yield*/, (0, delete_many_category_material_action_1.deleteManyCategoryMaterial)(currentWorkspaceInfo === null || currentWorkspaceInfo === void 0 ? void 0 : currentWorkspaceInfo.uuid, currentHandbookInfo === null || currentHandbookInfo === void 0 ? void 0 : currentHandbookInfo.uuid, selectedCategoriesToDelete)];
                case 1:
                    // const allRowsWithoutDeleted = tableData.filter(
                    //   (categoryMaterialInTable) => !table.selected.includes(categoryMaterialInTable?.uuid as string)
                    // );
                    _a.sent();
                    table.onUpdatePageDeleteRows({
                        totalRowsInPage: dataInPage === null || dataInPage === void 0 ? void 0 : dataInPage.length,
                        totalRowsFiltered: dataFiltered === null || dataFiltered === void 0 ? void 0 : dataFiltered.length,
                    });
                    setTableData(function (prevCategories) {
                        return prevCategories.filter(function (category) { return !selectedCategoriesToDelete.includes(category.uuid); });
                    });
                    isDeletingManyCategoriesPopupOpened.onFalse();
                    enqueueSnackbar('Удаление категорий успешно произведено!');
                    return [2 /*return*/];
            }
        });
    }); }, [dataInPage === null || dataInPage === void 0 ? void 0 : dataInPage.length, enqueueSnackbar, table, tableData, allCategoriesInWorkspace]);
    var renderFilters = (<Stack_1.default spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-end', md: 'center' }}>
      <category_filters_1.default filters={filters} onFilters={handleFilters}/>

      <ToggleButtonGroup_1.default size="small" value={view} exclusive onChange={handleChangeView}>
        <ToggleButton_1.default value="list">
          <iconify_1.default icon="solar:list-bold"/>
        </ToggleButton_1.default>

        <ToggleButton_1.default value="grid">
          <iconify_1.default icon="mingcute:dot-grid-fill"/>
        </ToggleButton_1.default>
      </ToggleButtonGroup_1.default>
    </Stack_1.default>);
    var renderResults = (<file_manager_filters_result_1.default filters={filters} onResetFilters={handleResetFilters} 
    //
    canReset={canReset} onFilters={handleFilters} 
    //
    results={(dataFiltered === null || dataFiltered === void 0 ? void 0 : dataFiltered.length) || 0}/>);
    return (<>
      <Container_1.default maxWidth="xl">
        <Stack_1.default spacing={2.5} sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
          <Typography_1.default variant="h4"> Справочник категорий</Typography_1.default>
          <IconButton_1.default size="small" color="primary" onClick={isCreatingNewCategoryPopupOpened.onTrue} sx={{
            width: 24,
            height: 24,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
                bgcolor: 'primary.dark',
            },
        }}>
            <iconify_1.default icon="mingcute:add-line"/>
          </IconButton_1.default>
        </Stack_1.default>
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
            { name: 'Категории материалов' },
        ]}/>
        <Stack_1.default spacing={2.5} sx={{
            my: { xs: 3, md: 5 },
        }}>
          {renderFilters}

          {canReset && renderResults}
        </Stack_1.default>

        {notFound ? (<empty_content_1.default filled title="Данные отсутствуют" sx={{
                py: 10,
            }}/>) : (<>
            {view === 'list' ? (<category_table_1.default table={table} dataFiltered={dataFiltered} onDeleteCategory={handleDeleteOneCategory} onOpenDeletingManyCategoriesPopup={isDeletingManyCategoriesPopupOpened.onTrue} notFound={notFound} onOpenChangerCategoryPopup={handleChangeCategory}/>) : (<category_grid_view_1.default table={table} dataFiltered={dataFiltered} onDeleteCategory={handleDeleteOneCategory} onOpenDeletingManyCategoriesPopup={isDeletingManyCategoriesPopupOpened.onTrue} onOpenChangerCategoryPopup={handleChangeCategory}/>)}
          </>)}
      </Container_1.default>

      <custom_dialog_1.ConfirmDialog open={isDeletingManyCategoriesPopupOpened.value} onClose={isDeletingManyCategoriesPopupOpened.onFalse} title="Удаление нескольких категорий" content={<>
            <Typography_1.default>
              Вы уверены, что хотите удалить <strong> {table.selected.length} </strong>{' '}
              категор(ий)и?
            </Typography_1.default>
            <Typography_1.default variant="body2" sx={{ color: 'gray' }}>
              (материалы внутри категорий не будут удалены, а переместятся в общую категорию)
            </Typography_1.default>
          </>} action={<Button_1.default variant="contained" color="error" onClick={function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, handleDeleteManyCategories()];
                        case 1:
                            _a.sent();
                            isDeletingManyCategoriesPopupOpened.onFalse();
                            return [2 /*return*/];
                    }
                });
            }); }}>
            Удалить
          </Button_1.default>}/>
      {categoryToChange && (<edit_category_form_1.default allFields={allFields} allGlobalCategories={allGlobalCategories} currentCategoryInfo={categoryToChange} isOpenEditCategoryForm={isChangingCategoryPopupOpened.value} onCloseEditCategoryForm={handleChangingCategoryPopupClose} setTableData={setTableData}/>)}

      {workspaceInfo && (<create_category_form_1.default isOpenCreateCategoryPopup={isCreatingNewCategoryPopupOpened.value} allGlobalCategories={allGlobalCategories} onCloseCreateCategoryPopup={handleCreateCategoryPopupClose} allFields={allFields} setTableData={setTableData}/>)}
    </>);
}
exports.default = CategoryMaterials;
