import { StackProps } from '@mui/material/Stack';
import { ListItemButtonProps } from '@mui/material';
import { Theme, SxProps } from '@mui/material/styles';

import { UserRoles } from 'src/utils/const/user-roles.enum';

export type NavItemStateProps = { depth?: number; open?: boolean; active?: boolean };

export type NavItemProps = NavItemBaseProps &
  ListItemButtonProps & {
    depth?: number;
    open?: boolean;
    active?: boolean;
    hasChild?: boolean;
    currentRole?: UserRoles;
    externalLink?: boolean;
    slotProps?: SlotProps;
  };

export type NavListProps = {
  data: NavItemBaseProps;
  depth: number;
  slotProps?: SlotProps;
};

export type NavSubListProps = {
  data: NavItemBaseProps[];
  depth: number;
  slotProps?: SlotProps;
};

export type NavGroupProps = {
  subheader?: string;
  items: NavItemBaseProps[];
  slotProps?: SlotProps;
};

export type NavItemBaseProps = {
  title: string;
  titleShort?: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  captionFull?: string;
  disabled?: boolean;
  roles?: UserRoles[];
  children?: any;
};

export type SlotProps = {
  gap?: number;
  rootItem?: SxProps<Theme>;
  subItem?: SxProps<Theme>;
  subheader?: SxProps<Theme>;
  currentRole?: UserRoles;
};

export type NavProps = StackProps & {
  data: {
    roles?: UserRoles[];
    subheader: string;
    items: NavItemBaseProps[];
  }[];
  slotProps?: SlotProps;
};
