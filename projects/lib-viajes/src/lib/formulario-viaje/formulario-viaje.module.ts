import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterOutlet } from '@angular/router';
import {
  CoreViewComponent,
  DateFormFieldComponent,
  ComboComponent,
  FormFieldComponent,
  DecimalFormFieldComponent,
  ButtonComponent,
  MultipleComboComponent,
} from 'lib-components';
import { DatosTransporteComponent } from './components/datos-carga/datos-carga';
import { DatosPrincipalesComponent } from './components/datos-principales/datos-principales';
import { FormularioViajeComponent } from './view/formulario-viaje';
import { FormularioViajesRoutes } from './router/routes';
import { FormularioViajeRouterComponent } from './router/router';
import { AccionesEspecialesComponent } from './components/acciones-especiales/acciones-especiales';

@NgModule({
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CoreViewComponent,
    DateFormFieldComponent,
    ComboComponent,
    FormFieldComponent,
    DecimalFormFieldComponent,
    MatStepperModule,
    ButtonComponent,
    MultipleComboComponent,
    MatProgressSpinnerModule,
    FormularioViajesRoutes,
  ],
  declarations: [
    FormularioViajeRouterComponent,
    FormularioViajeComponent,
    DatosPrincipalesComponent,
    DatosTransporteComponent,
    AccionesEspecialesComponent,
  ],
})
export class FormularioViajeModule {}
