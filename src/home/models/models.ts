import { IconKey } from "lib-core";

export interface MenuModel {
    key: string;
    label: string;
    icon: IconKey;
    route: string;
    children?: MenuModel[];
}