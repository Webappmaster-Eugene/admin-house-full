import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
} from "react";

type AnchorProps = Omit<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  "ref"
>;

type BaseButtonProps = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "ref"
>;

export type ButtonProps = AnchorProps &
  BaseButtonProps & {
    children: ReactNode;
    appearance: "primary" | "outlined" | "text" | "iconOutlined";
    size?: "s" | "l";
    icon?: "arrow" | "share" | "burger" | "user";
    typeOf?: "link" | "button";
    href?: string;
  };
