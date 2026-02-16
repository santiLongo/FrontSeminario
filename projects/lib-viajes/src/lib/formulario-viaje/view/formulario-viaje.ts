import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormularioDataViaje, FormularioGetDataViaje } from '../models/formulario-data';
import { FormularioViajeHttpService } from '../services/http.service';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { CoreViewComponent, DateFormFieldComponent, ComboComponent, FormFieldComponent, DecimalFormFieldComponent, NumberFormFieldComponent, ButtonComponent, MultipleComboComponent, AlertService } from 'lib-core';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { MapToAltaModel, MapToUpdateModel } from '../helpers/mappers';
import { Location } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-formulario-viaje',
  templateUrl: './formulario-viaje.html',
  imports: [
    ReactiveFormsModule,
    CoreViewComponent,
    DateFormFieldComponent,
    ComboComponent,
    FormFieldComponent,
    DecimalFormFieldComponent,
    MatStepperModule,
    ButtonComponent,
    MultipleComboComponent
],
})
export class FormularioViajeComponent implements OnInit, OnDestroy {
  @ViewChild('stepper', { static: true }) stepper: MatStepper;
  idViaje: number;
  data: FormularioGetDataViaje;
  readonly: boolean = false;
  formulario: FormGroup;
  isLinear = true;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private httpService: FormularioViajeHttpService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private location: Location
  ) {
    this.idViaje = +this.route.snapshot.params['idViaje'];
  }

  ngOnInit(): void {
    this.setUpForm();
    //
    if (this.idViaje > 0) {
      this.readonly = this.route.snapshot.params['readonly'] === 'true';
      this.isLinear = false;
      this.httpService.get(this.idViaje).subscribe((res) => {
        this.data = res;
        this.formulario.patchValue({
          ...this.data,
          datosDestino: this.data.datosDestino?.map(x => x.idDestino),
          datosProcedencias: this.data.datosProcedencias?.map(x => x.idProcedencia),
        });
      });
    }
    //
    this.chofer.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        switchMap((value) => {
          return this.httpService.getBuscoChofer(value);
        }),
        tap((res) => {
          this.datosChofer.patchValue(res);
        }),
      )
      .subscribe();
    //
    this.cliente.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        switchMap((value) => {
          return this.httpService.getCuitCliente(value);
        }),
        tap((res) => {
          this.datosCliente.patchValue(res);
        }),
      )
      .subscribe();
    //
    this.camion.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        switchMap((value) => {
          return this.httpService.getUltimoMantenimiento(value);
        }),
        tap((res) => {
          this.datosCamion.patchValue(res);
        }),
      )
      .subscribe();
    //
    this.montoTotal.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.calcularPrecioKm());
    //
    this.kilometros.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.calcularPrecioKm());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setUpForm() {
    this.formulario = this.fb.group({
      datosPrincipales: this.fb.group({
        idViaje: [],
        kilometros: [, { updateOn: 'blur' }],
        montoTotal: [, { validators: Validators.required, updateOn: 'blur' }],
        precioKm: [],
        idMoneda: [, Validators.required],
        fechaPartida: [, Validators.required],
        fechaDescarga: [],
        carga: [],
        kilos: [],
      }),
      datosChofer: this.fb.group({
        idChofer: [, { validators: Validators.required, updateOn: 'blur' }],
        nroRegistro: [],
        dni: [],
      }),
      datosCliente: this.fb.group({
        idCliente: [, { validators: Validators.required, updateOn: 'blur' }],
        cuit: [],
      }),
      datosCamion: this.fb.group({
        idCamion: [, { validators: Validators.required, updateOn: 'blur' }],
        ultimoMantenimiento: [],
      }),
      datosDestino: this.fb.control<number[]>([], Validators.required),
      datosProcedencias: this.fb.control<number[]>([], Validators.required),
    });
  }

  calcularPrecioKm(){
    const kilometros = this.kilometros.value;
    const montoTotal = this.montoTotal.value;

    const precioKm = montoTotal / kilometros;

    this.precioKm.setValue(precioKm);
  }

  salir() {
    this.location.back();
  }

  siguiente() {
    this.stepper.next();
  }

  anterior() {
    this.stepper.previous();
  }

  guardar() {
    this.formulario.markAllAsTouched();

    if(this.formulario.invalid){
      this.alertService.error$("Algunos campos contienen errores").subscribe();
      return;
    }

    const data: FormularioDataViaje = this.formulario.getRawValue();

    const command = MapToUpdateModel(data);
    command.idViaje = this.idViaje;

    this.alertService.info$('Esta seguro?', 'Desea modificar el siguiente viaje?').subscribe((i) => {
      if(i)[
        this.httpService.update(command).subscribe(() => {
          this.alertService.success$('Exito', 'Se actualizo el viaje con exito').subscribe(() => {
            this.salir()
          })
        })
      ]
    })
  }

  alta(){
    this.formulario.markAllAsTouched();

    if(this.formulario.invalid){
      this.alertService.error$("Algunos campos contienen errores").subscribe();
      return;
    }

    const data: FormularioDataViaje = this.formulario.getRawValue();

    const command = MapToAltaModel(data);

    this.alertService.info$('Esta seguro?', 'Desea confirmar el siguiente viaje?').subscribe((i) => {
      if(i)[
        this.httpService.add(command).subscribe((res) => {
          this.alertService.success$('Exito', 'Se creo el viaje' + res.NroViaje + ' con exito.').subscribe(() => {
            this.salir()
          })
        })
      ]
    })
  }

  get datosPrincipales() {
    return this.formulario.get('datosPrincipales') as FormGroup;
  }
  get datosChofer() {
    return this.formulario.get('datosChofer') as FormGroup;
  }
  get datosCliente() {
    return this.formulario.get('datosCliente') as FormGroup;
  }
  get datosCamion() {
    return this.formulario.get('datosCamion') as FormGroup;
  }

  get cliente() {
    return this.datosCliente.get('idCliente') as FormControl;
  }

  get chofer() {
    return this.datosChofer.get('idChofer') as FormControl;
  }

  get camion() {
    return this.datosCamion.get('idCamion') as FormControl;
  }

  get montoTotal() {
    return this.datosPrincipales.get('montoTotal') as FormControl;
  }

  get kilometros() {
    return this.datosPrincipales.get('kilometros') as FormControl;
  }

  get precioKm() {
    return this.datosPrincipales.get('precioKm') as FormControl;
  }
}
