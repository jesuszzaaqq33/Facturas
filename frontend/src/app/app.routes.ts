import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { FormularioComponent } from './facturas/formulario.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'facturas', component: FormularioComponent }
];
