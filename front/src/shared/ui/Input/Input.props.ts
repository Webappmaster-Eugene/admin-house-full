import React, { DetailedHTMLProps } from "react";

import { IconType } from "../Icon/Icon";

export interface InputProps
  extends DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  icon?: IconType;
  placeholder?: string;
  password?: boolean;
  errorMessage?: string;
  label?: string;
  id: string
} 
