import { ReactNode } from "react";

export type PopupProps = {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  title?: string;
  description?: string;
};