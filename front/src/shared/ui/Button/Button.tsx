import Link from "next/link";

import {cn} from "@/shared/lib/utils";

import { Icon } from "../Icon/Icon";

import { ButtonProps } from "./Button.props";
import styles from "./Button.module.css";

export const Button = ({
  appearance,
  children,
  className,
  size = "l",
  icon,
  typeOf = "button",
  href = "",
  ...props
}: ButtonProps): JSX.Element => {
  const Tag = typeOf === "button" ? "button" : Link;

  return (
    <Tag
      href={href}
      className={cn(
        styles.button,
        styles[appearance],
        styles[size],
        className
      )}
      {...props}
    >
      {icon === "burger" && (
        <Icon.MenuIcon
          className={cn(
            size === "s" ? styles.smallIcon : styles.icon,
            size === "s" ? styles.leftSmallIcon : styles.leftIcon
          )}
        />
      )}
      {appearance !== "iconOutlined" && children}
      {icon === "arrow" && (
        <Icon.ArrowIcon
          className={cn(
            size === "s" ? styles.smallIcon : styles.icon,
            size === "s" ? styles.rightSmallIcon : styles.rightIcon
          )}
        />
      )}
      {icon === "share" && (
        <Icon.ShareIcon
          className={cn(
            size === "s" ? styles.smallIcon : styles.icon,
            size === "s" ? styles.rightSmallIcon : styles.rightIcon
          )}
        />
      )}
      {icon === "user" && (
        <Icon.UserIcon
          className={cn(
            size === "s" ? styles.smallIcon : styles.icon,
            size === "s" ? styles.rightSmallIcon : styles.rightIcon
          )}
        />
      )}
    </Tag>
  );
};
