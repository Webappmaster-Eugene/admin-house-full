import { ReturnUseBooleanType } from '@/utils/hooks/use-boolean';

export type AlertDialogProps = {
  isDialogOpen: ReturnUseBooleanType;
  onClickYes: (event: React.MouseEvent<HTMLButtonElement>) => void;
  titleDialog?: string;
  textDialog?: string;
};
