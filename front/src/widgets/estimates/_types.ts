import {
  EEstimateItemType,
  EstimateFull,
  EstimateItemBusinessValue,
  EstimateSectionTree,
} from 'src/shared/contracts/estimate';
import { ConstructionPieWithLayers } from 'src/shared/contracts/construction-pie';
import { UnitTemplateWithComponents } from 'src/shared/contracts/unit-template';
import { UnitMeasurementOption } from 'src/shared/unit-measurement-select';

/** Опция для autocomplete материала из справочника handbook'а. */
export interface MaterialOption {
  uuid: string;
  name: string;
  price?: number | null;
  unitMeasurement?: { name: string } | null;
}

/** Какой источник используется для добавления строки сметы. */
export type ItemSourceMode = 'manual' | 'template' | 'pie';

/** Состояние формы добавления строки. Хранится в редакторе сметы. */
export interface NewItemFormState {
  itemType: EEstimateItemType;
  materialUuid: string | null;
  name: string;
  unitMeasurement: string;
  quantity: number;
  unitCost: number;
  markupPercent: number;
  comment: string;
}

/** Состояние формы редактирования существующей строки. */
export interface EditItemFormState {
  name: string;
  unitMeasurement: string;
  quantity: number;
  unitCost: number;
  markupPercent: number;
  comment: string;
}

export interface EstimateEditorProps {
  workspaceId: string;
  projectId: string;
  estimate: EstimateFull;
  materials: MaterialOption[];
  unitTemplates: UnitTemplateWithComponents[];
  constructionPies: ConstructionPieWithLayers[];
  fieldUnitMeasurements: UnitMeasurementOption[];
}

/** Колбэки, которые рекурсивно прокидываются в SectionBlock. */
export interface SectionCallbacks {
  onAddItem: (sectionId: string) => void;
  onEditItem: (sectionId: string, item: EstimateItemBusinessValue) => void;
  onDeleteItem: (sectionId: string, itemId: string) => void;
  onEditSection: (section: EstimateSectionTree) => void;
  onDeleteSection: (sectionId: string) => void;
}

export interface SectionBlockProps extends SectionCallbacks {
  section: EstimateSectionTree;
  numPrefix: string;
}
