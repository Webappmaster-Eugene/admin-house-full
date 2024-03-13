import React from "react";
import Link from "next/link";

import {cn} from "@/shared/lib/utils";

import { Icon } from "../Icon/Icon";

import styles from "./Breadcrumbs.module.css";
import { BreadcrumbsProps } from "./Breadcrumbs.props";


export const Breadcrumbs = ({
  items,
  className,
  ...props
}: BreadcrumbsProps) => {
  return (
    <div className={cn(styles.breadcrumbs, className)} {...props}>
      {items.map((i) => {
        if (i.link) {
          return (
            <div key={i.link} className={styles.item}>
              <Link
                href={i.isCategory ? `/category/${i.link}` : i.link}
                className={styles.link}
              >
                {" "}
                {i.name}
              </Link>

              <Icon.ArrowWithTailIcon className={styles.icon} />
            </div>
          );
        }
          return (
            <span key={i.name} className={styles.curent}>
              {i.name}
            </span>
          );

      })}
    </div>
  );
};
