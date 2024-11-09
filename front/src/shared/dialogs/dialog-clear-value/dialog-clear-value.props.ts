import { ReturnUseBooleanType } from '@/utils/hooks/use-boolean';

export type DialogClearValueProps = {
  dialog: ReturnUseBooleanType;
  title?: string;
  text?: string;
  onClear: () => void;
  onCancel?: () => void;
};
