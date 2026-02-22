import { Component, Inject, OnInit } from '@angular/core';
import {
  GridColumn,
  GridConfig,
  ButtonComponent,
  GridComponent,
  AlertService,
  DialogService,
} from 'lib-core';
import {
  MatDialogRef,
  MatDialogModule,
  MatDialog,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { EspecialidadDataService } from './services/data.service';
import { EspecialidadGridModel } from './models/especialidad-grid';
import { UpsertEspecialidadDialogComponent } from './upsert/upsert';

@Component({
  selector: 'app-tipo-camion',
  templateUrl: './especialidad.html',
  imports: [MatDialogModule, ButtonComponent, GridComponent],
  providers: [EspecialidadDataService],
})
export class EspecialidadDialogComponent implements OnInit {
  gridConfig: GridConfig<EspecialidadGridModel>;
  public title = 'Especialidades';

  constructor(
    private dialogRef: MatDialogRef<EspecialidadDialogComponent>,
    public dataService: EspecialidadDataService,
    private dialog: DialogService,
    private alertService: AlertService,
    @Inject(MAT_DIALOG_DATA) public data: { esSelecteable: boolean },
  ) {
    this.title =
      this.title + data.esSelecteable ? '- Seleccione las espcialidades' : '.';
  }

  ngOnInit(): void {
    this.gridSetup();
    //
    this.dataService.search();
  }

  gridSetup() {
    this.gridConfig = {
      columns: [
        {
          key: 'idEspecialidad',
          title: 'ID',
          type: 'numeric',
          hidden: true,
        },
        {
          key: 'descripcion',
          title: 'Especialidad',
          type: 'text',
          filter: true,
        },
      ],
      selectableSettings: {
        selectable: true,
        type: this.data.esSelecteable ? 'multiple' : 'single',
      },
      toolBarActions: [
        {
          key: 'new',
          label: 'Nuevo',
          type: 'success',
          icon: 'add',
          onClick: () => this.openUpsert(),
        },
        {
          key: 'edit',
          label: 'Editar',
          icon: 'edit',
          type: 'primary',
          disabledOnEmptyRows: true,
          onClick: (rows) => this.openUpsert(rows[0]),
        },
      ],
    };
  }

  openUpsert(row?: EspecialidadGridModel) {
    this.dialog
      .open(UpsertEspecialidadDialogComponent, {
        data: {
          idEspecialidad: row?.idEspecialidad,
          descripcion: row?.descripcion,
        },
        size: 'xxl',
      })
      .afterClosed()
      .subscribe(() => {
        this.dataService.search();
      });
  }

  salir() {
    this.dialogRef.close;
  }
  seleccionar(){
    this.dialogRef.close(this.dataService.selectedRows);
  }
}
