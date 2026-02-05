export interface TreeMenuItem {
  key: number;
  label: string;
  icon?: string;
  onClick?: () => void;
  children?: TreeMenuItem[];
}