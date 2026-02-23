import { AlertService, LocalGridService } from 'lib-core';

// editable-grid-service.ts
export interface IEditableGridService<T> {
  add(item: T): void;
  update(item: T): void;
  remove(item: T): void;

  getRowKey(row: T): string; // identidad estable
  alertService: AlertService;
}

export class EditableGridService<T extends Record<string, any>>
  extends LocalGridService<T>
  implements IEditableGridService<T>
{
  alertService: AlertService;

  constructor(alertService: AlertService) {
    super();
    this.alertService = alertService;
  }

  getRowKey(row: T): string {
    const found = this.items.find((i) => i.data === row);

    if (!found) {
      this.alertService.error$('Row no encontrada').subscribe();
      throw new Error('Row no encontrada en EditableGridService');
    }

    return found.__uuid;
  }
}
