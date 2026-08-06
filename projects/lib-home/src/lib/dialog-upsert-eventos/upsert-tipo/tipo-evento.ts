import { Component, OnInit } from '@angular/core';
import {
  GridConfig,
  ButtonComponent,
  GridComponent,
  AlertService,
  DialogService,
} from 'lib-core';
import { TipoEventoGridModel } from './model/grid-model';
import {
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { TipoEventoDataService } from './services/data.service';
import { UpsertTipoEventoDialogComponent } from './upsert/upsert';

@Component({
  selector: 'app-tipo-evento',
  templateUrl: './tipo-evento.html',
  imports: [MatDialogModule, ButtonComponent, GridComponent],
  providers: [TipoEventoDataService],
})
export class TipoEventoDialogComponent implements OnInit {
  gridConfig: GridConfig<TipoEventoGridModel>;

  constructor(
    private dialogRef: MatDialogRef<TipoEventoDialogComponent>,
    public dataService: TipoEventoDataService,
    private dialog: DialogService,
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
          key: 'IdTipo',
          title: 'ID',
          type: 'numeric',
          hidden: true,
        },
        {
          key: 'nombre',
          title: 'Tipo',
          type: 'text',
          filter: true,
        },
        {
          key: 'descripcion',
          title: 'Descripcion',
          type: 'text',
        },
      ],
      selectableSettings: {
        selectable: false,
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
      ],
    };
  }

  openUpsert() {
    this.dialog
      .open(UpsertTipoEventoDialogComponent, {
        size: 'xl'
      })
      .afterClosed()
      .subscribe(() => {
        this.dataService.search();
      });
  }

  salir() {
    this.dialogRef.close();
  }
}
