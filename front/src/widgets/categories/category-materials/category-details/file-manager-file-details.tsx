'use client';

import { useState, useCallback } from 'react';
import { FieldOfCategoryMaterialGetAllCommand } from '@numart/house-admin-contracts';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/material/Autocomplete';

import { useBoolean } from 'src/utils/hooks/use-boolean';
import { categoryTemplateNameToTagsParser } from 'src/utils/helpers/parsers/category-template-name-parser/category-template-name-to-tags.parser';
import {
  fCountMaterial,
  fCountFieldsMaterial,
  fRequiredFieldsConstructor,
  fNotRequiredFieldsConstructor,
  fTemplateNameFieldsConstructor,
} from 'src/utils/format-number';

import Iconify from 'src/shared/iconify';
import Scrollbar from 'src/shared/scrollbar';
import FileThumbnail from 'src/shared/file-thumbnail';
import { useWorkspaceInfoStore } from 'src/store/workspace/workspace.store';
import { CategoryDetailsProps } from 'src/widgets/categories/category-materials/category-details/category-details.props';

export default function FileManagerFileDetails({
  item,
  open,
  onCopyLink,
  onClose,
  onDelete,
  ...other
}: CategoryDetailsProps) {
  const {
    name,
    templateName,
    comment,
    globalCategoryMaterial,
    fieldsOfCategoryMaterialsInTemplate,
    materials,
    fieldsOfCategoryMaterials,
  } = item;
  const { workspaceInfo } = useWorkspaceInfoStore((state) => state);
  const allFields =
    workspaceInfo?.allFieldsOfCategoryMaterialsOfHandbook as FieldOfCategoryMaterialGetAllCommand.ResponseEntity;
  const isDeleteDialogOpen = useBoolean();

  const tagsAll = fieldsOfCategoryMaterials?.map((field) => field.name);

  const toggleTags = useBoolean(true);

  const properties = useBoolean(true);

  const [tags, setTags] = useState<string[]>();

  const tagsForInput = categoryTemplateNameToTagsParser(templateName, allFields);

  const handleChangeTags = useCallback((newValue: string[]) => {
    setTags(newValue);
  }, []);

  const renderTags = (
    <Stack spacing={1.5}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ typography: 'subtitle2' }}
      >
        Шаблон имени материала для категории:
        <IconButton size="small" onClick={toggleTags.onToggle}>
          <Iconify
            icon={toggleTags.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        </IconButton>
      </Stack>

      {toggleTags.value && (
        <Autocomplete
          multiple
          freeSolo
          options={tagsAll || []}
          getOptionLabel={(option) => option}
          defaultValue={tagsForInput || []}
          value={tags}
          onChange={(event, newValue) => {
            handleChangeTags(newValue);
          }}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                size="small"
                variant="soft"
                label={option}
                key={index}
              />
            ))
          }
          renderInput={(params) => (
            <TextField {...params} placeholder="Добавьте символ или свойство" />
          )}
        />
      )}
    </Stack>
  );

  const renderProperties = (
    <Stack spacing={1.5}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ typography: 'subtitle2' }}
      >
        О категории:
        <IconButton size="small" onClick={properties.onToggle}>
          <Iconify
            icon={properties.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        </IconButton>
      </Stack>

      {properties.value && (
        <>
          <Stack direction="row" sx={{ typography: 'caption' }}>
            <Box
              component="span"
              sx={{
                minWidth: 80,
                maxWidth: 80,
                width: '100%',
                boxSizing: 'border-box',
                color: 'text.secondary',
                mr: 2,
                hyphens: 'auto',
                overflowWrap: 'anywhere',
                whiteSpace: 'pre-line',
              }}
            >
              Описание:
            </Box>
            {comment}
          </Stack>

          <Stack direction="row" sx={{ typography: 'caption' }}>
            <Box
              component="span"
              sx={{
                minWidth: 80,
                maxWidth: 80,
                width: '100%',
                boxSizing: 'border-box',
                color: 'text.secondary',
                mr: 2,
                hyphens: 'auto',
                overflowWrap: 'anywhere',
                whiteSpace: 'pre-line',
              }}
            >
              Глобальная категория:
            </Box>
            {globalCategoryMaterial.nameRu}
          </Stack>

          <Stack direction="row" sx={{ typography: 'caption' }}>
            <Box
              component="span"
              sx={{
                minWidth: 80,
                maxWidth: 80,
                width: '100%',
                boxSizing: 'border-box',
                color: 'text.secondary',
                mr: 2,
                hyphens: 'auto',
                overflowWrap: 'anywhere',
                whiteSpace: 'pre-line',
              }}
            >
              Всего полей категории:
            </Box>
            {fCountFieldsMaterial(fieldsOfCategoryMaterials && fieldsOfCategoryMaterials?.length)}
          </Stack>

          <Stack direction="row" sx={{ typography: 'caption' }}>
            <Box
              component="span"
              sx={{
                minWidth: 80,
                maxWidth: 80,
                width: '100%',
                boxSizing: 'border-box',
                color: 'text.secondary',
                mr: 2,
                hyphens: 'auto',
                overflowWrap: 'anywhere',
                whiteSpace: 'pre-line',
              }}
            >
              Обязатель&shy;ные поля:
            </Box>
            {fRequiredFieldsConstructor(
              fieldsOfCategoryMaterialsInTemplate as FieldOfCategoryMaterialGetAllCommand.ResponseEntity
            )}
          </Stack>

          <Stack direction="row" sx={{ typography: 'caption' }}>
            <Box
              component="span"
              sx={{
                minWidth: 80,
                maxWidth: 80,
                width: '100%',
                boxSizing: 'border-box',
                color: 'text.secondary',
                mr: 2,
                hyphens: 'auto',
                overflowWrap: 'anywhere',
                whiteSpace: 'pre-line',
              }}
            >
              Необязатель&shy;ные поля:
            </Box>
            {fNotRequiredFieldsConstructor(
              fieldsOfCategoryMaterialsInTemplate as FieldOfCategoryMaterialGetAllCommand.ResponseEntity
            )}
          </Stack>

          <Stack direction="row" sx={{ typography: 'caption' }}>
            <Box
              component="span"
              sx={{
                minWidth: 80,
                maxWidth: 80,
                width: '100%',
                boxSizing: 'border-box',
                color: 'text.secondary',
                mr: 2,
                hyphens: 'auto',
                overflowWrap: 'anywhere',
                whiteSpace: 'pre-line',
              }}
            >
              Поля для шаблонного имени:
            </Box>
            {fTemplateNameFieldsConstructor(
              fieldsOfCategoryMaterialsInTemplate as FieldOfCategoryMaterialGetAllCommand.ResponseEntity
            )}
          </Stack>

          <Stack direction="row" sx={{ typography: 'caption' }}>
            <Box
              component="span"
              sx={{
                minWidth: 80,
                maxWidth: 80,
                width: '100%',
                boxSizing: 'border-box',
                color: 'text.secondary',
                mr: 2,
                hyphens: 'auto',
                overflowWrap: 'anywhere',
                whiteSpace: 'pre-line',
              }}
            >
              Всего материалов:
            </Box>
            {fCountMaterial(materials && materials?.length)}
          </Stack>
        </>
      )}
    </Stack>
  );

  const renderShared = (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
      <Typography variant="subtitle2"> Возможные действия: </Typography>
    </Stack>
  );

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 320 },
        }}
        {...other}
      >
        <Scrollbar sx={{ height: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
            <Typography variant="h6"> Информация о категории </Typography>
          </Stack>

          <Stack
            spacing={2.5}
            justifyContent="center"
            sx={{
              p: 2.5,
              bgcolor: 'background.neutral',
            }}
          >
            <FileThumbnail
              imageView
              file="folder"
              sx={{ width: 64, height: 64 }}
              imgSx={{ borderRadius: 1 }}
            />

            <Typography variant="subtitle1" sx={{ wordBreak: 'break-all' }}>
              {name}
            </Typography>

            <Divider sx={{ borderStyle: 'dashed' }} />

            {renderTags}

            {renderProperties}
          </Stack>

          {renderShared}
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <Button
            fullWidth
            variant="soft"
            color="error"
            size="large"
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            onClick={onDelete}
          >
            Удалить
          </Button>
        </Box>
      </Drawer>

      {/* {isDeleteDialogOpen && ( */}
      {/*  <AlertDialog */}
      {/*    isDialogOpen={isDeleteDialogOpen} */}
      {/*    onClickYes={onClickYesDialog} */}
      {/*    titleDialog={DeleteMaterialDialogTexts.titleDialog} */}
      {/*    textDialog={templaterCreatorTexts( */}
      {/*      DeleteCategoryDialogTexts.textDialog, */}
      {/*      rowSelectionModel[0] as string */}
      {/*    )} */}
      {/*  /> */}
      {/* )} */}
    </>
  );
}
