import { IconKey } from "lib-core";

export interface TreeMenuItem {
  key: string;
  label: string;
  icon?: IconKey;
  onClick?: () => void;
  children?: TreeMenuItem[];
}