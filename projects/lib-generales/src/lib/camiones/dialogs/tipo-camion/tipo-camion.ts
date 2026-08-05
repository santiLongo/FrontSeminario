import { Component, OnInit } from '@angular/core';
import {
  GridColumn,
  GridConfig,
  ButtonComponent,
  GridComponent,
  AlertService,
} from 'lib-core';
import { TipoCamionGridModel } from './model/grid-model';
import {
  MatDialogRef,
  MatDialogModule,
  MatDialog,
} from '@angular/material/dialog';
import { TipoCamionDataService } from './services/data.service';
import { UpsertTipoCamionDialogComponent } from './upsert/upsert';
import { filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-tipo-camion',
  templateUrl: './tipo-camion.html',
  imports: [MatDialogModule, ButtonComponent, GridComponent],
  providers: [TipoCamionDataService],
})
export class TipoCamionDialogComponent implements OnInit {
  gridConfig: GridConfig<TipoCamionGridModel>;

  constructor(
    private dialogRef: MatDialogRef<TipoCamionDialogComponent>,
    public dataService: TipoCamionDataService,
    private dialog: MatDialog,
    private alertService: AlertService,
  ) {
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
          key: 'id',
          title: 'ID',
          type: 'numeric',
          hidden: true,
        },
        {
          key: 'tipo',
          title: 'Tipo de Camion',
          type: 'text',
          filter: true,
        },
      ],
      selectableSettings: {
        selectable: true,
        type: 'single',
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
        // {
        //   key: 'delete',
        //   label: 'Eliminar',
        //   icon: 'delete',
        //   type: 'danger',
        //   disabledOnEmptyRows: true,
        //   onClick: (rows) => this.delete(rows[0].id),
        // },
        //Comento el boton porque no se si me conviene que eliminen tipos de camiones, ya que puedo perder trazabilidad.
      ],
    };
  }

  openUpsert(row?: TipoCamionGridModel) {
    this.dialog
      .open(UpsertTipoCamionDialogComponent, {
        data: { id: row?.id, descripcion: row?.tipo },
        width: '800px',
      })
      .afterClosed()
      .subscribe(() => {
        this.dataService.search();
      });
  }

  delete(id: number) {
    this.alertService.warning$('¿Seguro que desea eliminar el tipo de camión?')
    .pipe(
        filter(Boolean),
        switchMap(() => {
            return this.dataService.delete(id);
        }),
        switchMap(() => {
            return this.alertService.success$('Tipo de camión eliminado con éxito');
        })
    ).subscribe(() => this.dataService.search());
  }

  salir() {
    this.dialogRef.close();
  }
}
