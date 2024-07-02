export type SearchbarProps = {
  title: {
    text: string;
    highlight: boolean;
  }[];
  path: {
    text: string;
    highlight: boolean;
  }[];
  groupLabel: string;
  onClickItem: VoidFunction;
};
