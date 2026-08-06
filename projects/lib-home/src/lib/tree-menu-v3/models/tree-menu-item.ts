import { IconKey } from "lib-components";

export interface TreeMenuItem {
  key: string;
  label: string;
  icon?: IconKey;
  onClick?: () => void;
  children?: TreeMenuItem[];
}