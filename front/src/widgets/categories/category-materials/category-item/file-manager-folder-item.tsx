import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { CategoryMaterialGetCommand } from '@numart/house-admin-contracts';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/utils/hooks/use-boolean';
import { fCountMaterial } from 'src/utils/format-number';
import { useCopyToClipboard } from 'src/utils/hooks/use-copy-to-clipboard';

import Iconify from 'src/shared/iconify';
import CustomPopover, { usePopover } from 'src/shared/custom-popover';
import CreateNewCategoryDialog from 'src/widgets/categories/create-new-category-dialog';
import { CategoryItemProps } from 'src/widgets/categories/category-materials/category-item/category-item.props';
import FileManagerFileDetails from 'src/widgets/categories/category-materials/category-details/file-manager-file-details';

// ----------------------------------------------------------------------

export default function FileManagerFolderItem({
  category,
  selected,
  onSelect,
  onDelete,
  sx,
  ...other
}: CategoryItemProps) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const {
    name,
    templateName,
    uuid,
    comment,
    globalCategoryMaterial,
    fieldsOfCategoryMaterials,
    materials,
    fieldsOfCategoryMaterialsInTemplate,
  } = category as CategoryMaterialGetCommand.ResponseEntity;

  const { copy } = useCopyToClipboard();

  const [folderName, setFolderName] = useState(category.name);

  const editFolder = useBoolean();

  const checkbox = useBoolean();

  const popover = usePopover();

  const confirm = useBoolean();

  const details = useBoolean();

  const handleChangeFolderName = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  }, []);

  const handleCopy = useCallback(() => {
    enqueueSnackbar('Шаблон скопирован!');
    if (category?.templateName) {
      copy(category?.templateName);
    } else {
      copy(category?.name);
    }
  }, [copy, enqueueSnackbar, category]);

  const renderAction = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        right: 8,
        position: 'absolute',
      }}
    >
      {/* <Checkbox */}
      {/*  color="warning" */}
      {/*  icon={<Iconify icon="eva:star-outline" />} */}
      {/*  checkedIcon={<Iconify icon="eva:star-fill" />} */}
      {/*  checked={favorite.value} */}
      {/*  onChange={favorite.onToggle} */}
      {/* /> */}

      <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Stack>
  );

  const renderIcon =
    (checkbox.value || selected) && onSelect ? (
      <Checkbox
        size="medium"
        checked={selected}
        onClick={onSelect}
        icon={<Iconify icon="eva:radio-button-off-fill" />}
        checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
        sx={{ p: 0.75 }}
      />
    ) : (
      <Box component="img" src="/assets/icons/files/ic_folder.svg" sx={{ width: 36, height: 36 }} />
    );

  const renderText = (
    <ListItemText
      onClick={details.onTrue}
      primary={category.name}
      secondary={
        <>
          {}
          <Box
            component="span"
            sx={{
              mx: 0.75,
              width: 2,
              height: 2,
              borderRadius: '50%',
              bgcolor: 'currentColor',
            }}
          />
          {fCountMaterial(category && materials?.length)}
        </>
      }
      primaryTypographyProps={{
        noWrap: true,
        typography: 'subtitle1',
      }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        alignItems: 'center',
        typography: 'caption',
        color: 'text.disabled',
        display: 'inline-flex',
      }}
    />
  );

  return (
    <>
      <Stack
        component={Paper}
        variant="outlined"
        spacing={1}
        alignItems="flex-start"
        sx={{
          p: 2.5,
          maxWidth: 222,
          borderRadius: 2,
          bgcolor: 'unset',
          cursor: 'pointer',
          position: 'relative',
          ...((checkbox.value || selected) && {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          }),
          ...sx,
        }}
        // onClick={(event) => {}}
        {...other}
      >
        <Box onMouseEnter={checkbox.onTrue} onMouseLeave={checkbox.onFalse}>
          {renderIcon}
        </Box>

        {renderAction}

        {renderText}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            handleCopy();
          }}
        >
          <Iconify icon="eva:link-2-fill" />
          Скопировать
        </MenuItem>

        <MenuItem
          onClick={() => {
            router.push(`${uuid}`);
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Подробно
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

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
      </CustomPopover>

      <CreateNewCategoryDialog
        open={editFolder.value}
        onClose={editFolder.onFalse}
        title="Edit Folder"
        onUpdate={() => {
          editFolder.onFalse();
          setFolderName(folderName);
          console.info('UPDATE FOLDER', folderName);
        }}
        folderName={folderName}
        onChangeFolderName={handleChangeFolderName}
      />

      {/* <ConfirmDialog */}
      {/*  open={confirm.value} */}
      {/*  onClose={confirm.onFalse} */}
      {/*  title="Delete" */}
      {/*  content="Are you sure want to delete?" */}
      {/*  action={ */}
      {/*    <Button variant="contained" color="error" onClick={onDelete}> */}
      {/*      Delete */}
      {/*    </Button> */}
      {/*  } */}
      {/* /> */}

      <FileManagerFileDetails
        item={category}
        onCopyLink={handleCopy}
        open={details.value}
        onClose={details.onFalse}
        onDelete={onDelete}
      />
    </>
  );
}
