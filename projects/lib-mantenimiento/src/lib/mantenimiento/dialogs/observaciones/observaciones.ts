import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent, GridComponent, GridConfig } from "lib-core";
import { ObservacionesModel } from './model/model';
import { ObservacionesDataService } from './data.service';
import { config } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-observaciones',
  templateUrl: './observaciones.html',
  imports: [MatDialogModule, ButtonComponent, GridComponent],
  providers: [ObservacionesDataService]
})
export class Observaciones implements OnInit, AfterViewInit {
  idMantenimiento: number;
  gridConfig: GridConfig<ObservacionesModel>

  constructor(
    private dialogRef: MatDialogRef<Observaciones>,
    public dataService: ObservacionesDataService,
    @Inject(MAT_DIALOG_DATA) data: { idMantenimiento: number },
  ) {
    this.idMantenimiento = data.idMantenimiento;
  }

  ngOnInit(): void {
    this.gridConfig = {
        columns: [
            {
                key: 'descripcion',
                title: 'Observacion',
                type: 'text',
            },
            {
                key: 'userName',
                title: 'Usuario',
                type: 'text'
            },
            {
                key: 'userDateTime',
                title: 'Fecha',
                type: 'date',
                format: 'ddMMyyyy hh:MM'
            }
        ]
    }
  }

  ngAfterViewInit(): void {
    this.dataService.idSub$.next(this.idMantenimiento)
      this.dataService.search();
  }

  salir() {
    this.dialogRef.close();
  }
}
