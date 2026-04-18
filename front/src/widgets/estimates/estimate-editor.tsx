'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';

import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';

import { createEstimateItem } from 'src/api/actions/estimate/create-item.action';
import { createEstimateSection } from 'src/api/actions/estimate/create-section.action';
import { deleteEstimateItem } from 'src/api/actions/estimate/delete-item.action';
import { deleteEstimateSection } from 'src/api/actions/estimate/delete-section.action';
import { exportEstimate } from 'src/api/actions/estimate/export-estimate.action';
import { isErrorFieldTypeGuard } from 'src/utils/type-guards/is-error-field.type-guard';

import { GuideInfoAlert } from 'src/widgets/guide/guide-info-alert';

import { formatMoney } from './_consts';
import { EstimateEditorProps, NewItemFormState } from './_types';
import { findSection } from './_helpers';
import { SectionBlock } from './section-block';
import { AddSectionDialog } from './add-section-dialog';
import { AddItemDialog } from './add-item-dialog';

export function EstimateEditor({
  workspaceId,
  projectId,
  estimate,
  materials,
  unitTemplates,
  constructionPies,
}: EstimateEditorProps) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [sectionDialogOpen, setSectionDialogOpen] = useState(false);
  const [itemDialogOpen, setItemDialogOpen] = useState(false);
  const [targetSectionId, setTargetSectionId] = useState<string>('');

  const handleExport = async () => {
    const result = await exportEstimate(workspaceId, projectId, estimate.uuid);
    if ('error' in result) {
      enqueueSnackbar('Не удалось выгрузить Excel', { variant: 'error' });
      return;
    }
    const byteArray = Uint8Array.from(atob(result.base64), (c) => c.charCodeAt(0));
    const blob = new Blob([byteArray], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = result.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleAddSection = async ({
    name,
    parentSectionUuid,
  }: {
    name: string;
    parentSectionUuid: string | null;
  }) => {
    if (!name) {
      enqueueSnackbar('Введите название раздела', { variant: 'warning' });
      return;
    }
    const siblings = parentSectionUuid
      ? estimate.sections.find((s) => s.uuid === parentSectionUuid)?.childSections ?? []
      : estimate.sections;
    const result = await createEstimateSection(workspaceId, projectId, estimate.uuid, {
      name,
      orderIndex: siblings.length,
      parentSectionUuid,
    });
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось создать раздел', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Раздел создан', { variant: 'success' });
    setSectionDialogOpen(false);
    router.refresh();
  };

  const handleDeleteSection = async (sectionId: string) => {
    if (!window.confirm('Удалить раздел вместе со строками?')) return;
    const result = await deleteEstimateSection(workspaceId, projectId, estimate.uuid, sectionId);
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось удалить раздел', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Раздел удалён', { variant: 'success' });
    router.refresh();
  };

  const openAddItem = (sectionId: string) => {
    setTargetSectionId(sectionId);
    setItemDialogOpen(true);
  };

  const orderIndexFor = (sectionId: string) => {
    const section = findSection(estimate.sections, sectionId);
    return section?.items.length ?? 0;
  };

  const handleAddManual = async (form: NewItemFormState) => {
    if (!form.name.trim()) {
      enqueueSnackbar('Введите название строки', { variant: 'warning' });
      return;
    }
    if (form.quantity <= 0 || form.unitCost < 0) {
      enqueueSnackbar('Количество и цена должны быть положительными', { variant: 'warning' });
      return;
    }
    const result = await createEstimateItem(
      workspaceId,
      projectId,
      estimate.uuid,
      targetSectionId,
      {
        orderIndex: orderIndexFor(targetSectionId),
        itemType: form.itemType,
        materialUuid: form.materialUuid,
        name: form.name.trim(),
        unitMeasurement: form.unitMeasurement.trim() || 'шт',
        quantity: form.quantity,
        unitCost: form.unitCost,
        markupPercent: form.markupPercent,
        comment: form.comment.trim() || null,
      }
    );
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось добавить строку', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Строка добавлена', { variant: 'success' });
    setItemDialogOpen(false);
    router.refresh();
  };

  const handleAddTemplate = async (params: {
    templateId: string;
    quantity: number;
    markupPercent: number;
    comment: string;
  }) => {
    if (params.quantity <= 0) {
      enqueueSnackbar('Количество должно быть положительным', { variant: 'warning' });
      return;
    }
    const result = await createEstimateItem(
      workspaceId,
      projectId,
      estimate.uuid,
      targetSectionId,
      {
        orderIndex: orderIndexFor(targetSectionId),
        itemType: 'UNIT',
        unitTemplateUuid: params.templateId,
        quantity: params.quantity,
        markupPercent: params.markupPercent,
        comment: params.comment.trim() || null,
      }
    );
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось добавить единичку', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Единичка добавлена', { variant: 'success' });
    setItemDialogOpen(false);
    router.refresh();
  };

  const handleAddPie = async (params: {
    pieId: string;
    quantity: number;
    markupPercent: number;
    comment: string;
  }) => {
    if (params.quantity <= 0) {
      enqueueSnackbar('Площадь должна быть положительной', { variant: 'warning' });
      return;
    }
    const result = await createEstimateItem(
      workspaceId,
      projectId,
      estimate.uuid,
      targetSectionId,
      {
        orderIndex: orderIndexFor(targetSectionId),
        itemType: 'PIE',
        constructionPieUuid: params.pieId,
        quantity: params.quantity,
        markupPercent: params.markupPercent,
        comment: params.comment.trim() || null,
      }
    );
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось добавить пирог', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Пирог добавлен', { variant: 'success' });
    setItemDialogOpen(false);
    router.refresh();
  };

  const handleDeleteItem = async (sectionId: string, itemId: string) => {
    if (!window.confirm('Удалить строку?')) return;
    const result = await deleteEstimateItem(
      workspaceId,
      projectId,
      estimate.uuid,
      sectionId,
      itemId
    );
    if (isErrorFieldTypeGuard(result)) {
      enqueueSnackbar('Не удалось удалить строку', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Строка удалена', { variant: 'success' });
    router.refresh();
  };

  return (
    <Box>
      <GuideInfoAlert section="estimates" variant="compact" />

      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4">{estimate.name}</Typography>
          {estimate.description && (
            <Typography variant="body2" color="text.secondary">
              {estimate.description}
            </Typography>
          )}
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={() => setSectionDialogOpen(true)}
          >
            Добавить раздел
          </Button>
          <Button variant="contained" startIcon={<DownloadIcon />} onClick={handleExport}>
            Экспорт в Excel
          </Button>
        </Stack>
      </Stack>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Stack direction="row" spacing={4}>
            <Stack>
              <Typography variant="caption" color="text.secondary">
                Себестоимость
              </Typography>
              <Typography variant="h6">{formatMoney(estimate.totalCost)}</Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="text.secondary">
                Цена для заказчика
              </Typography>
              <Typography variant="h6">{formatMoney(estimate.totalClientPrice)}</Typography>
            </Stack>
            <Stack>
              <Typography variant="caption" color="text.secondary">
                Наценка по умолчанию
              </Typography>
              <Typography variant="h6">{estimate.defaultMarkupPercent}%</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {estimate.sections.length === 0 && (
        <Card>
          <CardContent>
            <Typography>Смета пуста. Добавьте первый раздел, чтобы начать.</Typography>
          </CardContent>
        </Card>
      )}

      <Stack spacing={2}>
        {estimate.sections.map((section, idx) => (
          <SectionBlock
            key={section.uuid}
            section={section}
            numPrefix={`${idx + 1}`}
            onAddItem={openAddItem}
            onDeleteItem={handleDeleteItem}
            onDeleteSection={handleDeleteSection}
          />
        ))}
      </Stack>

      <AddSectionDialog
        open={sectionDialogOpen}
        rootSections={estimate.sections}
        onClose={() => setSectionDialogOpen(false)}
        onSubmit={handleAddSection}
      />

      <AddItemDialog
        open={itemDialogOpen}
        defaultMarkupPercent={estimate.defaultMarkupPercent ?? 0}
        sections={estimate.sections}
        targetSectionId={targetSectionId}
        onChangeTargetSection={setTargetSectionId}
        materials={materials}
        unitTemplates={unitTemplates}
        constructionPies={constructionPies}
        onClose={() => setItemDialogOpen(false)}
        onSubmitManual={handleAddManual}
        onSubmitTemplate={handleAddTemplate}
        onSubmitPie={handleAddPie}
      />
    </Box>
  );
}
