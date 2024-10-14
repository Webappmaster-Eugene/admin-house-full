import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import {
  CategoryMaterialGetCommand,
  FieldOfCategoryMaterialGetAllCommand,
} from '@numart/house-admin-contracts';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useBoolean } from 'src/utils/hooks/use-boolean';
import { useDoubleClick } from 'src/utils/hooks/use-double-click';
import { useCopyToClipboard } from 'src/utils/hooks/use-copy-to-clipboard';
import {
  fCountMaterial,
  fCountFieldsMaterial,
  fTemplateNameFieldsConstructor,
} from 'src/utils/format-number';

import Iconify from 'src/shared/iconify';
import FileThumbnail from 'src/shared/file-thumbnail';
import { ConfirmDialog } from 'src/shared/custom-dialog';
import CustomPopover, { usePopover } from 'src/shared/custom-popover';
import FileManagerFileDetails from 'src/widgets/categories/category-materials/category-details/file-manager-file-details';
import { CategoryTableRowProps } from 'src/widgets/categories/category-materials/category-table-row/category-table-row.props';

export default function FileManagerTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onOpenChangerPopup,
}: CategoryTableRowProps) {
  const theme = useTheme();
  const router = useRouter();

  const {
    name,
    templateName,
    uuid,
    comment,
    globalCategoryMaterial,
    fieldsOfCategoryMaterials,
    materials,
    isDefault,
    fieldsOfCategoryMaterialsInTemplate,
  } = row as CategoryMaterialGetCommand.ResponseEntity;

  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const details = useBoolean();

  const confirm = useBoolean();

  const popover = usePopover();

  const handleClick = useDoubleClick({
    click: () => {
      details.onTrue();
    },
    doubleClick: () => console.info('DOUBLE CLICK'),
  });

  const handleCopy = useCallback(() => {
    enqueueSnackbar('Шаблонное наименование скопировано');
    copy(row.templateName ? (row.templateName as string) : 'Шаблонное наименование не задано');
  }, [copy, enqueueSnackbar, row.templateName]);

  const defaultStyles = {
    borderTop: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    '&:first-of-type': {
      borderTopLeftRadius: 16,
      borderBottomLeftRadius: 16,
      borderLeft: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    },
    '&:last-of-type': {
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
      borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.16)}`,
    },
  };

  return (
    <>
      <TableRow
        selected={selected}
        sx={{
          cursor: 'pointer',
          borderRadius: 2,
          [`&.${tableRowClasses.selected}, &:hover`]: {
            backgroundColor: 'background.paper',
            boxShadow: theme.customShadows.z20,
            transition: theme.transitions.create(['background-color', 'box-shadow'], {
              duration: theme.transitions.duration.shortest,
            }),
            '&:hover': {
              backgroundColor: 'background.paper',
              boxShadow: theme.customShadows.z20,
            },
          },
          [`& .${tableCellClasses.root}`]: {
            ...defaultStyles,
          },
          ...(details.value && {
            [`& .${tableCellClasses.root}`]: {
              ...defaultStyles,
            },
          }),
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked={selected}
            disabled={isDefault}
            onDoubleClick={() => console.info('ON DOUBLE CLICK')}
            onClick={onSelectRow}
          />
        </TableCell>

        <TableCell onClick={handleClick}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FileThumbnail
              file={isDefault ? 'folder-default' : 'folder'}
              sx={{ width: 36, height: 36 }}
            />

            <Typography
              noWrap
              variant="inherit"
              sx={{
                maxWidth: 360,
                cursor: 'pointer',
                ...(details.value && { fontWeight: 'fontWeightBold' }),
              }}
            >
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell onClick={handleClick} sx={{ whiteSpace: 'nowrap' }}>
          {comment}
        </TableCell>

        <TableCell onClick={handleClick} sx={{ whiteSpace: 'nowrap' }}>
          {fCountMaterial(materials && materials?.length)}
        </TableCell>

        <TableCell onClick={handleClick} sx={{ whiteSpace: 'nowrap' }}>
          {globalCategoryMaterial.nameRu}
        </TableCell>

        <TableCell onClick={handleClick}>
          {`${fTemplateNameFieldsConstructor(
            fieldsOfCategoryMaterialsInTemplate as FieldOfCategoryMaterialGetAllCommand.ResponseEntity
          )}`}
        </TableCell>

        <TableCell onClick={handleClick} sx={{ whiteSpace: 'nowrap' }}>
          <ListItemText
            primary={`${fCountFieldsMaterial(fieldsOfCategoryMaterials?.length)}`}
            secondary="в категории"
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell
          align="right"
          sx={{
            px: 1,
            whiteSpace: 'nowrap',
          }}
        >
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        {fieldsOfCategoryMaterialsInTemplate &&
          fieldsOfCategoryMaterialsInTemplate?.length >= 1 && (
            <MenuItem
              onClick={() => {
                popover.onClose();
                handleCopy();
              }}
            >
              <Iconify icon="eva:link-2-fill" />
              Скопировать
            </MenuItem>
          )}

        <MenuItem
          onClick={() => {
            router.push(`${uuid}`);
          }}
        >
          <Iconify icon="foundation:info" />
          Подробно
        </MenuItem>

        <MenuItem
          onClick={(event) => {
            onOpenChangerPopup(event, row);
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Изменить
        </MenuItem>

        {!isDefault && <Divider sx={{ borderStyle: 'dashed' }} />}

        {!isDefault && (
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Удалить
          </MenuItem>
        )}
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Удалить"
        content="Вы уверены что хотите удалить категорию?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Удалить
          </Button>
        }
      />

      <FileManagerFileDetails
        item={row}
        onCopyLink={handleCopy}
        open={details.value}
        onClose={details.onFalse}
        onDelete={onDeleteRow}
      />
    </>
  );
}
