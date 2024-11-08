'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import { ConfirmDialog } from '@/shared/custom-dialog';
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

export default function CategoryViewDetails({
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
    isDefault,
    uuid,
  } = item;
  const router = useRouter();
  const { workspaceInfo } = useWorkspaceInfoStore((state) => state);
  const allFields =
    workspaceInfo?.allFieldsOfCategoryMaterialsOfHandbook as FieldOfCategoryMaterialGetAllCommand.ResponseEntity;

  const confirm = useBoolean();

  const onMoreClick = (event: any) => {
    router.push(uuid);
  };

  const tagsAll = allFields?.map((field) => field.name);

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
          disabled
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
            <TextField
              {...params}
              // placeholder="Добавьте символ или свойство"
              placeholder={tagsForInput?.length !== 0 ? '' : 'Шаблонное имя не задано'}
            />
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
              fieldsOfCategoryMaterials as FieldOfCategoryMaterialGetAllCommand.ResponseEntity
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
              fieldsOfCategoryMaterials as FieldOfCategoryMaterialGetAllCommand.ResponseEntity
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
      {/* <Typography variant="subtitle2"> Подробнее: </Typography> */}

      <Button
        fullWidth
        variant="soft"
        color="success"
        size="large"
        endIcon={<Iconify icon="solar:info-circle-broken" />}
        onClick={onMoreClick}
      >
        Перейти
      </Button>
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
            disabled={isDefault}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            onClick={confirm.onTrue}
          >
            Удалить
          </Button>
        </Box>
      </Drawer>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Удалить"
        content="Вы уверены что хотите удалить данную категорию?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDelete();
              confirm.onFalse();
            }}
          >
            Удалить
          </Button>
        }
      />
    </>
  );
}
