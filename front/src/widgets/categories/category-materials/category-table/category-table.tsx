import CategoryTableRow from '@/widgets/categories/category-materials/category-table-row/category-table-row';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Tooltip from '@mui/material/Tooltip';
import { useTheme } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';
import { tableCellClasses } from '@mui/material/TableCell';
import { tablePaginationClasses } from '@mui/material/TablePagination';

import Iconify from 'src/shared/iconify';
import { CategoryTableProps } from 'src/widgets/categories/category-materials/category-table/category-table.props';
import {
  TableNoData,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/shared/table';
import { CategoryTableHeaders } from 'src/widgets/categories/category-materials/category-table/category-table.headers';

export default function AllCategoriesTable({
  table,
  notFound,
  onDeleteCategory,
  dataFiltered,
  onOpenChangerCategoryPopup,
  onOpenDeletingManyCategoriesPopup,
}: CategoryTableProps) {
  const theme = useTheme();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    setSelected,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = table;

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          m: theme.spacing(-2, -3, -3, -3),
        }}
      >
        <TableSelectedAction
          dense={dense}
          numSelected={selected.length}
          rowCount={dataFiltered.length}
          onSelectAllRows={(checked) => {
            const newSelected = dataFiltered.map((row) => {
              if (!row.isDefault) {
                return row.uuid;
              }
            }) as string[];

            setSelected(newSelected);
            return onSelectAllRows(checked, newSelected);
          }}
          action={
            <Tooltip title="Удалить">
              <IconButton color="primary" onClick={onOpenDeletingManyCategoriesPopup}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Tooltip>
          }
          sx={{
            pl: 1,
            pr: 2,
            top: 16,
            left: 24,
            right: 24,
            width: 'auto',
            borderRadius: 1.5,
          }}
        />

        <TableContainer
          sx={{
            p: theme.spacing(0, 3, 3, 3),
          }}
        >
          <Table
            size={dense ? 'small' : 'medium'}
            sx={{
              minWidth: 960,
              // borderCollapse: 'separate',
              // borderSpacing: '0 16px',
            }}
          >
            <TableHeadCustom
              order={order}
              orderBy={orderBy}
              headLabel={CategoryTableHeaders}
              rowCount={dataFiltered.length}
              numSelected={selected.length}
              onSort={onSort}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  dataFiltered.map((row) => {
                    if (!row.isDefault) {
                      return row.uuid;
                    }
                  }) as string[]
                )
              }
              sx={{
                [`& .${tableCellClasses.head}`]: {
                  '&:first-of-type': {
                    borderTopLeftRadius: 12,
                    borderBottomLeftRadius: 12,
                  },
                  '&:last-of-type': {
                    borderTopRightRadius: 12,
                    borderBottomRightRadius: 12,
                  },
                },
              }}
            />

            <TableBody>
              {dataFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <CategoryTableRow
                    key={row.uuid}
                    row={row}
                    selected={selected.includes(row.uuid)}
                    onSelectRow={() => onSelectRow(row.uuid)}
                    onDeleteRow={() => onDeleteCategory(row.uuid)}
                    onOpenChangerPopup={onOpenChangerCategoryPopup}
                  />
                ))}

              <TableNoData
                notFound={notFound}
                sx={{
                  m: -2,
                  borderRadius: 1.5,
                  border: `dashed 1px ${theme.palette.divider}`,
                }}
              />
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        //
        dense={dense}
        onChangeDense={onChangeDense}
        sx={{
          my: 2,
          [`& .${tablePaginationClasses.toolbar}`]: {
            borderTopColor: 'transparent',
          },
        }}
      />
    </>
  );
}
