export interface GridConfig<T> {
  columns: GridColumn<T>[];
  menuActions?: GridMenuAction<T>[];
  toolBarActions?: GridToolBarAction<T>[];
  selectableSettings: SelectebleSettings<T>;
}

export class GridColumn<T> {
  key: keyof T;
  title: string;
  type: 'text' | 'numeric' | 'date';
  format?:
    | '{0:0}'
    | '{0:1}'
    | '{0:2}'
    | 'ddMMyyyy hh:MM:ss'
    | 'ddMMyyyy hh:MM'
    | 'ddMMyyyy'
    | 'ddMMyy'
    | 'ddMM';
  filter?: boolean = false;
  hidden?: boolean = false;
}

export class GridMenuAction<T> {
  key: string;
  label: string;
  icon?: string;

  hidden?: (row: T) => boolean;
  disabled?: (row: T) => boolean;

  onClick: (row: T) => void;
}

export class GridToolBarAction<T> {
  key: string;
  label: string;
  icon?: string;
  type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'primary';
  hidden?: boolean;
  disabledOnEmptyRows?: boolean = false
  disabled?: (rows: T[]) => boolean;
  onClick: (rows: T[]) => void;
}

export class SelectebleSettings<T>{
  type: 'multiple' | 'single'
  selectable: boolean
  esSelectable?: (row: T) => boolean
}

export interface PagedResult<T> {
  items: T[];
  total: number;
}

export interface GridState {
  page: number;
  pageSize: number;
  sort?: string;
}