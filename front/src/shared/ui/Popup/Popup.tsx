"use client";

import { Icon } from "@/shared/ui/Icon/Icon";
import {PopupContainer} from "@/shared/ui/PopupContainer/PopupContainer";
import {cn} from "@/shared/lib/utils";

import styles from "./Popup.module.css";
import { PopupProps } from "./Popup.props";

export const Popup = ({
  // isOpen,
  setIsOpen,
  title,
  description,
  className,
  children,
}: PopupProps): JSX.Element => {
  return (
    <PopupContainer>
      <div className={styles.background}>
        <div className={cn(styles.popup, className)}>
          {title && <p className={styles.title}>{title}</p>}
          {description && (
            <p className={styles.description}>{description}</p>
          )}
          {children}
          <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
            <Icon.CloseIcon className={styles.icon} />
          </button>
        </div>
      </div>
    </PopupContainer>
  );
};
