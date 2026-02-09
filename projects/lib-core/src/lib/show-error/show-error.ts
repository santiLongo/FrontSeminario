import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  standalone: true,
  selector: 'app-show-error-dialog',
  templateUrl: './show-error.html',
  imports: [MatDialogModule, NzButtonModule, NzResultModule, NzTypographyModule, NzIconModule ],
})
export class ShowErrorDialogComponent {
  public error = '';

  constructor(
    private dialogRef: MatDialogRef<ShowErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { error: string },
  ) {
    this.error = data.error;
  }

  onSalir(){
    this.dialogRef.close();
  }
}
