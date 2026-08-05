import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { GridComponent, GridConfig } from 'lib-core';
import { ArchivoGridModel } from './models/models';
import { ArchivosCamionesDataService } from './services/data.service';

@Component({
  selector: 'app-archivos-dialog',
  templateUrl: './archivos-dialog.html',
  imports: [MatDialogModule, GridComponent],
  providers: [ArchivosCamionesDataService],
})
export class ArchivosDialogComponent implements OnInit, AfterViewInit {
  gridConfig: GridConfig<ArchivoGridModel>;

  constructor(
    private dialogRef: MatDialogRef<ArchivosDialogComponent>,
    public dataService: ArchivosCamionesDataService,
    @Inject(MAT_DIALOG_DATA) data: { idCamion: number },
  ) {
    this.dataService.camion = data.idCamion;
  }

  ngOnInit(): void {
    this.gridSetUp();
  }

  ngAfterViewInit(): void {
    this.dataService.search();
  }

  gridSetUp() {
    this.gridConfig = {
      columns: [
        {
          key: 'id',
          title: 'Id',
          type: 'numeric',
          hidden: true,
        },
        {
          key: 'nombre',
          title: 'Nombre del archivo',
          type: 'text',
        },
        {
          key: 'fecha',
          title: 'Fecha',
          type: 'date',
          format: 'ddMMyyyy',
        },
        {
          key: 'userName',
          title: 'Usuario',
          type: 'text',
        },
      ],
      menuActions: [
        {
          key: 'download',
          label: 'Descargar',
          icon: 'download',
          onClick: (row) => {
            this.download(row);
          },
        },
        {
          key: 'remove',
          label: 'Borrar',
          icon: 'remove',
          onClick: (row) => {
            this.remove(row);
          },
        },
      ],
      toolBarActions: [
        {
          key: 'save',
          label: 'Subir',
          type: 'success',
          icon: 'save',
          position: 'right',
          onClick: () => {
            this.save();
          },
        },
      ],
    };
  }

  private download(item: ArchivoGridModel) {}

  private remove(item: ArchivoGridModel) {}

  private save() {}
}
