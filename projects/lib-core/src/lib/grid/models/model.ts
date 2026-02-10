export interface GridConfig<T> {
    columns: GridColumn<T>[];
}

export class GridColumn<T> {
    key: keyof T;
    title: string;
    filter?: boolean = false;
    hidden?: boolean = false;

}