import { ReturnUseBooleanType } from '@/utils/hooks/use-boolean';

export type DialogDeleteEntityProps = {
  dialog: ReturnUseBooleanType;
  title?: string;
  text?: string;
  onDelete: () => void;
  onCancel?: () => void;
};
