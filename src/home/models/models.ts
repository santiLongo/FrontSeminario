import { IconKey } from "lib-components";

export interface MenuModel {
    key: string;
    label: string;
    icon: IconKey;
    route: string;
    children?: MenuModel[];
}