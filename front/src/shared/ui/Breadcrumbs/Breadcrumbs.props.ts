import { DetailedHTMLProps } from "react";

export interface BreadcrumbsItem {
  name: string;
  link?: string;
  isCategory?: boolean;
}
export interface BreadcrumbsProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  items: BreadcrumbsItem[];
}

