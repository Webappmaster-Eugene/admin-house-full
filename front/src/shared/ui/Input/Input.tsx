"use client";

import React, { ChangeEvent, forwardRef, useEffect, useState } from "react";

import {cn} from "@/shared/lib/utils";

import { Icon } from "../Icon/Icon";

import styles from "./Input.module.css";
import { InputProps } from "./Input.props";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      className,
      password = false,
      value,
      placeholder,
      onChange,
      label,
      errorMessage,
      id,
      ...props
    }: InputProps,
    ref
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [customValue, setValue] = useState<any>();
    const [type, setType] = useState(password ? "password" : props.type);
    const IconComponent = icon ? Icon[icon] : null;

    const change = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      if (onChange) {
        onChange(e);
      }
    };

    useEffect(() => {
      setValue(value);
    }, [value]);

    const triggerPassword = () => {
      if (type === "password") {
        setType("text");
      } else {
        setType("password");
      }
    };

    return (
      <div className={cn(className, styles.container)}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        {errorMessage &&
        <span className={styles.errorMessage}>
          {errorMessage}
        </span>}
        <input
          ref={ref}
          id={id}
          type={type}
          value={customValue ?? ""}
          placeholder={placeholder}
          className={cn(styles.input, {
            [styles.withIcon]: icon,
            [styles.password]: password,
            [styles.error]: errorMessage,
          })}
          onChange={(e) => change(e)}
          {...props}
        />
        {IconComponent && <IconComponent className={styles.icon} />}
        {password &&
          (type === "password" ? (
            <Icon.EyeIcon onClick={triggerPassword} className={styles.passwordIcon} />
          ) : (
            <Icon.EyeSlashIcon onClick={triggerPassword} className={styles.passwordIcon} />
          ))}
      </div>
    );
  }
);

Input.displayName = "Input";
