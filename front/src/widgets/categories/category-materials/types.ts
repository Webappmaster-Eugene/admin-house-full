export type IFileFilterValue = string | null;

export type IFileFilters = {
  name: string;
};

export type IFolderManager = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  tags: string[];
  totalFiles?: number;
  isFavorited: boolean;
  createdAt: Date | number | string;
  modifiedAt: Date | number | string;
};
