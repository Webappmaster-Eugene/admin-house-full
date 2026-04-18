import { useMemo, useState } from 'react';

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';

import { EEstimateItemType, EstimateSectionTree } from 'src/shared/contracts/estimate';
import { ConstructionPieWithLayers } from 'src/shared/contracts/construction-pie';
import { UnitTemplateWithComponents } from 'src/shared/contracts/unit-template';

import { MANUAL_ITEM_TYPE_OPTIONS, formatMoney } from './_consts';
import { ItemSourceMode, MaterialOption, NewItemFormState } from './_types';
import { flattenSections } from './_helpers';

interface AddItemDialogProps {
  open: boolean;
  defaultMarkupPercent: number;
  sections: EstimateSectionTree[];
  targetSectionId: string;
  onChangeTargetSection: (sectionId: string) => void;
  materials: MaterialOption[];
  unitTemplates: UnitTemplateWithComponents[];
  constructionPies: ConstructionPieWithLayers[];
  onClose: () => void;
  onSubmitManual: (state: NewItemFormState) => Promise<void>;
  onSubmitTemplate: (params: {
    templateId: string;
    quantity: number;
    markupPercent: number;
    comment: string;
  }) => Promise<void>;
  onSubmitPie: (params: {
    pieId: string;
    quantity: number;
    markupPercent: number;
    comment: string;
  }) => Promise<void>;
}

const initialFormState = (markup: number): NewItemFormState => ({
  itemType: 'MATERIAL',
  materialUuid: null,
  name: '',
  unitMeasurement: 'шт',
  quantity: 1,
  unitCost: 0,
  markupPercent: markup,
  comment: '',
});

export function AddItemDialog({
  open,
  defaultMarkupPercent,
  sections,
  targetSectionId,
  onChangeTargetSection,
  materials,
  unitTemplates,
  constructionPies,
  onClose,
  onSubmitManual,
  onSubmitTemplate,
  onSubmitPie,
}: AddItemDialogProps) {
  const [mode, setMode] = useState<ItemSourceMode>('manual');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedPieId, setSelectedPieId] = useState<string | null>(null);
  const [form, setForm] = useState<NewItemFormState>(() => initialFormState(defaultMarkupPercent));

  const leafSections = useMemo(() => flattenSections(sections), [sections]);
  const selectedTemplate = useMemo(
    () => unitTemplates.find((t) => t.uuid === selectedTemplateId) ?? null,
    [selectedTemplateId, unitTemplates]
  );
  const selectedPie = useMemo(
    () => constructionPies.find((p) => p.uuid === selectedPieId) ?? null,
    [selectedPieId, constructionPies]
  );

  const reset = () => {
    setMode('manual');
    setSelectedTemplateId(null);
    setSelectedPieId(null);
    setForm(initialFormState(defaultMarkupPercent));
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSubmit = async () => {
    if (mode === 'template' && selectedTemplateId) {
      await onSubmitTemplate({
        templateId: selectedTemplateId,
        quantity: form.quantity,
        markupPercent: form.markupPercent,
        comment: form.comment,
      });
    } else if (mode === 'pie' && selectedPieId) {
      await onSubmitPie({
        pieId: selectedPieId,
        quantity: form.quantity,
        markupPercent: form.markupPercent,
        comment: form.comment,
      });
    } else {
      await onSubmitManual(form);
    }
    reset();
  };

  const handleFormChange = (patch: Partial<NewItemFormState>) => setForm({ ...form, ...patch });

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Добавить строку</DialogTitle>
      <DialogContent>
        <Tabs
          value={mode}
          onChange={(_event, value) => setMode(value as ItemSourceMode)}
          sx={{ mb: 2 }}
        >
          <Tab value="manual" label="Обычная строка" />
          <Tab
            value="template"
            label={`Из единички (${unitTemplates.length})`}
            disabled={unitTemplates.length === 0}
          />
          <Tab
            value="pie"
            label={`Из пирога (${constructionPies.length})`}
            disabled={constructionPies.length === 0}
          />
        </Tabs>

        {mode === 'template' && (
          <TemplateModeForm
            templates={unitTemplates}
            selected={selectedTemplate}
            onSelect={setSelectedTemplateId}
            quantity={form.quantity}
            markup={form.markupPercent}
            comment={form.comment}
            onChange={handleFormChange}
          />
        )}

        {mode === 'pie' && (
          <PieModeForm
            pies={constructionPies}
            selected={selectedPie}
            onSelect={setSelectedPieId}
            quantity={form.quantity}
            markup={form.markupPercent}
            comment={form.comment}
            onChange={handleFormChange}
          />
        )}

        {mode === 'manual' && (
          <ManualModeForm form={form} materials={materials} onChange={handleFormChange} />
        )}

        {leafSections.length > 1 && (
          <Box mt={2}>
            <TextField
              select
              label="Раздел"
              value={targetSectionId}
              onChange={(event) => onChangeTargetSection(event.target.value)}
              fullWidth
            >
              {leafSections.map((section) => (
                <MenuItem key={section.uuid} value={section.uuid}>
                  {section.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface TemplateModeFormProps {
  templates: UnitTemplateWithComponents[];
  selected: UnitTemplateWithComponents | null;
  onSelect: (id: string | null) => void;
  quantity: number;
  markup: number;
  comment: string;
  onChange: (patch: Partial<NewItemFormState>) => void;
}

function TemplateModeForm({
  templates,
  selected,
  onSelect,
  quantity,
  markup,
  comment,
  onChange,
}: TemplateModeFormProps) {
  return (
    <Stack spacing={2} mt={1}>
      <Autocomplete<UnitTemplateWithComponents>
        options={templates}
        getOptionLabel={(option) => `${option.name} (${option.unitMeasurement})`}
        value={selected}
        onChange={(_event, value) => onSelect(value?.uuid ?? null)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Единичка из справочника"
            helperText="Компоненты скопируются как snapshot — последующие изменения шаблона не коснутся сметы"
          />
        )}
        isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
      />

      {selected && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              Состав «{selected.name}» за 1 {selected.unitMeasurement}:
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Компонент</TableCell>
                    <TableCell align="right">Расход/ед.</TableCell>
                    <TableCell>Ед.</TableCell>
                    <TableCell align="right">Цена</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selected.components.map((component) => (
                    <TableRow key={component.uuid}>
                      <TableCell>{component.name}</TableCell>
                      <TableCell align="right">{component.quantityPerUnit}</TableCell>
                      <TableCell>{component.unitMeasurement}</TableCell>
                      <TableCell align="right">{formatMoney(component.unitCost)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="body2" mt={1}>
              Себестоимость: <strong>{formatMoney(selected.unitCost)}</strong> за{' '}
              {selected.unitMeasurement}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Stack direction="row" spacing={2}>
        <TextField
          type="number"
          label={`Количество (${selected?.unitMeasurement ?? 'ед'})`}
          value={quantity}
          onChange={(event) => onChange({ quantity: Number(event.target.value) || 0 })}
          inputProps={{ min: 0, step: 0.01 }}
          fullWidth
        />
        <TextField
          type="number"
          label="Наценка, %"
          value={markup}
          onChange={(event) => onChange({ markupPercent: Number(event.target.value) || 0 })}
          inputProps={{ min: 0, step: 0.01 }}
          fullWidth
          helperText="По умолчанию — наценка единички или сметы"
        />
      </Stack>

      <TextField
        label="Комментарий"
        value={comment}
        onChange={(event) => onChange({ comment: event.target.value })}
        fullWidth
        multiline
        minRows={2}
      />
    </Stack>
  );
}

interface PieModeFormProps {
  pies: ConstructionPieWithLayers[];
  selected: ConstructionPieWithLayers | null;
  onSelect: (id: string | null) => void;
  quantity: number;
  markup: number;
  comment: string;
  onChange: (patch: Partial<NewItemFormState>) => void;
}

function PieModeForm({
  pies,
  selected,
  onSelect,
  quantity,
  markup,
  comment,
  onChange,
}: PieModeFormProps) {
  return (
    <Stack spacing={2} mt={1}>
      <Autocomplete<ConstructionPieWithLayers>
        options={pies}
        getOptionLabel={(option) =>
          `${option.name} (${option.unitMeasurement}, ${option.totalThickness.toFixed(0)} мм)`
        }
        value={selected}
        onChange={(_event, value) => onSelect(value?.uuid ?? null)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Пирог из справочника"
            helperText="Слои скопируются как snapshot — последующие изменения пирога не коснутся сметы"
          />
        )}
        isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
      />

      {selected && (
        <Card variant="outlined">
          <CardContent>
            <Typography variant="subtitle2" gutterBottom>
              Слои «{selected.name}» за 1 {selected.unitMeasurement} (общая толщина:{' '}
              {selected.totalThickness.toFixed(1)} мм):
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Слой</TableCell>
                    <TableCell align="right">Толщина, мм</TableCell>
                    <TableCell align="right">Расход/м²</TableCell>
                    <TableCell>Ед.</TableCell>
                    <TableCell align="right">Цена</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selected.layers.map((layer) => (
                    <TableRow key={layer.uuid}>
                      <TableCell>{layer.name}</TableCell>
                      <TableCell align="right">{layer.thickness}</TableCell>
                      <TableCell align="right">{layer.consumptionPerM2}</TableCell>
                      <TableCell>{layer.unitMeasurement}</TableCell>
                      <TableCell align="right">{formatMoney(layer.unitCost)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography variant="body2" mt={1}>
              Себестоимость: <strong>{formatMoney(selected.unitCost)}</strong> за 1{' '}
              {selected.unitMeasurement}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Stack direction="row" spacing={2}>
        <TextField
          type="number"
          label={`Площадь (${selected?.unitMeasurement ?? 'м²'})`}
          value={quantity}
          onChange={(event) => onChange({ quantity: Number(event.target.value) || 0 })}
          inputProps={{ min: 0, step: 0.01 }}
          fullWidth
        />
        <TextField
          type="number"
          label="Наценка, %"
          value={markup}
          onChange={(event) => onChange({ markupPercent: Number(event.target.value) || 0 })}
          inputProps={{ min: 0, step: 0.01 }}
          fullWidth
          helperText="По умолчанию — наценка пирога или сметы"
        />
      </Stack>

      <TextField
        label="Комментарий"
        value={comment}
        onChange={(event) => onChange({ comment: event.target.value })}
        fullWidth
        multiline
        minRows={2}
      />
    </Stack>
  );
}

interface ManualModeFormProps {
  form: NewItemFormState;
  materials: MaterialOption[];
  onChange: (patch: Partial<NewItemFormState>) => void;
}

function ManualModeForm({ form, materials, onChange }: ManualModeFormProps) {
  return (
    <Stack spacing={2} mt={1}>
      <TextField
        select
        label="Тип"
        value={form.itemType}
        onChange={(event) => onChange({ itemType: event.target.value as EEstimateItemType })}
        fullWidth
      >
        {MANUAL_ITEM_TYPE_OPTIONS.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </TextField>

      {form.itemType === 'MATERIAL' && (
        <Autocomplete<MaterialOption>
          options={materials}
          getOptionLabel={(option) => option.name}
          value={materials.find((m) => m.uuid === form.materialUuid) ?? null}
          onChange={(_event, value) =>
            onChange({
              materialUuid: value?.uuid ?? null,
              name: value?.name ?? form.name,
              unitMeasurement: value?.unitMeasurement?.name ?? form.unitMeasurement,
              unitCost: value?.price ?? form.unitCost,
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Материал из справочника"
              helperText="Выберите материал — название, ед.изм. и цена подставятся автоматически"
            />
          )}
          isOptionEqualToValue={(option, value) => option.uuid === value.uuid}
        />
      )}

      <TextField
        label="Название"
        value={form.name}
        onChange={(event) => onChange({ name: event.target.value })}
        fullWidth
        required
      />
      <Stack direction="row" spacing={2}>
        <TextField
          type="number"
          label="Количество"
          value={form.quantity}
          onChange={(event) => onChange({ quantity: Number(event.target.value) || 0 })}
          fullWidth
          inputProps={{ min: 0, step: 0.01 }}
        />
        <TextField
          label="Ед. изм."
          value={form.unitMeasurement}
          onChange={(event) => onChange({ unitMeasurement: event.target.value })}
          fullWidth
        />
      </Stack>
      <Stack direction="row" spacing={2}>
        <TextField
          type="number"
          label="Цена себестоимости"
          value={form.unitCost}
          onChange={(event) => onChange({ unitCost: Number(event.target.value) || 0 })}
          fullWidth
          inputProps={{ min: 0, step: 0.01 }}
        />
        <TextField
          type="number"
          label="Наценка, %"
          value={form.markupPercent}
          onChange={(event) => onChange({ markupPercent: Number(event.target.value) || 0 })}
          fullWidth
          inputProps={{ min: 0, step: 0.01 }}
        />
      </Stack>
      <TextField
        label="Комментарий"
        value={form.comment}
        onChange={(event) => onChange({ comment: event.target.value })}
        fullWidth
        multiline
        minRows={2}
      />
    </Stack>
  );
}
