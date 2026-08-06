import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {
  AlertService,
  DialogService,
  GridComponent,
  GridConfig,
} from 'lib-core';
import { filter, switchMap } from 'rxjs';
import { ArchivoGridModel } from './models/models';
import { ArchivosCamionesDataService } from './services/data.service';
import { SubirArchivosDialogComponent } from './subir-dialog/subir-dialog';

@Component({
  selector: 'app-archivos-dialog',
  templateUrl: './archivos-dialog.html',
  imports: [MatDialogModule, GridComponent],
  providers: [ArchivosCamionesDataService],
})
export class ArchivosDialogComponent implements OnInit, AfterViewInit {
  gridConfig: GridConfig<ArchivoGridModel>;
  private idCamion: number;

  constructor(
    public dataService: ArchivosCamionesDataService,
    private dialog: DialogService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) data: { idCamion: number },
  ) {
    this.idCamion = data.idCamion;
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
            this.subir();
          },
        },
      ],
    };
  }

  private subir() {
    this.dialog
      .open(SubirArchivosDialogComponent, {
        data: { idCamion: this.idCamion },
        size: 'l',
      })
      .afterClosed()
      .subscribe(() => this.dataService.search());
  }

  private download(item: ArchivoGridModel) {
    this.dataService.download(item.id).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = item.nombre;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  private remove(item: ArchivoGridModel) {
    this.alertService
      .info$('Seguro que desea borrar el archivo?', item.nombre)
      .pipe(
        filter(Boolean),
        switchMap(() => this.dataService.delete(item.id)),
        switchMap(() =>
          this.alertService.success$('Se borro el archivo con exito'),
        ),
      )
      .subscribe(() => this.dataService.search());
  }
}
