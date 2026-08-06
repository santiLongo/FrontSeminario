import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ButtonComponent, UploadFilesComponent } from 'lib-core';
import { ArchivosUploadService } from '../services/upload.service';

@Component({
  selector: 'app-subir-archivos-dialog',
  templateUrl: './subir-dialog.html',
  imports: [MatDialogModule, UploadFilesComponent, ButtonComponent],
  providers: [ArchivosUploadService],
})
export class SubirArchivosDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<SubirArchivosDialogComponent>,
    public uploadService: ArchivosUploadService,
    @Inject(MAT_DIALOG_DATA) data: { idCamion: number },
  ) {
    this.uploadService.setCamion(data.idCamion);
  }

  salir() {
    this.dialogRef.close();
  }
}
