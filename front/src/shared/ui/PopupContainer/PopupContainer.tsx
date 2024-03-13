"use client";

import {useState} from "react";

import {cn} from "@/shared/lib/utils";

import { PopupContainerProps } from "./PopupContainer.props";

export const PopupContainer = ({
  className,
  children,
}: PopupContainerProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={cn(className)} onClick={() => setIsOpen(false)}>
      {children}
    </div>
  );
};
