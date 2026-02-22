export interface TreeMenuItem {
  key: string;
  label: string;
  icon?: string;
  onClick?: () => void;
  children?: TreeMenuItem[];
}