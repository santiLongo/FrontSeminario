import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowErrorDialogComponent } from '../show-error/show-error';
import { error } from '@ant-design/icons-angular';

@Injectable({
  providedIn: 'root',
})
export class ReponseDialogService {
  constructor(private dialog: MatDialog) {}

  showError(message: string) {
    this.dialog.open(ShowErrorDialogComponent, { data: { error: message }, width: '400px' });
  }
}
