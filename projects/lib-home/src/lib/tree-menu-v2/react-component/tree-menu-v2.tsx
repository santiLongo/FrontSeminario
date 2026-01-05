import React, { ComponentType } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

interface MenuItems {
  key: number;
  label: string;
  icon?: ComponentType;
  children?: MenuItems[];
  onClick?: () => void;
}

export interface TreeMenuV2Props {
  items: MenuItems[];
}

export const TreeMenuV2: React.FC<TreeMenuV2Props> = ({ items }) => {
  const convertMenuItems = (items: MenuItems[]): MenuItem[] => {
    return items.map<MenuItem>((m) => {
      return {
        key: m.key.toString(),
        label: m.label,
        icon: m.icon ? React.createElement(m.icon) : undefined,
        onClick: m.onClick,
        children: m.children?.length
          ? convertMenuItems(m.children)
          : undefined,
      };
    });
  };

  return (
    <Menu
      mode="inline"
      style={{ width: 250 }}
      items={convertMenuItems(items)}
    />
  );
};
