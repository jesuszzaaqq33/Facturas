import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { FormularioComponent } from './facturas/formulario.component';
import { RegisterComponent } from './register/register.component';
import { ClientsComponent } from './clients/clients.component';
import { authGuard } from './guards/auth.guard';
import { EditClientComponent } from './edit-client/edit-client.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'facturas', component: FormularioComponent, canActivate: [authGuard] },
  { path: 'clients', component: ClientsComponent, canActivate: [authGuard]},
  { path: 'edit-client', component: EditClientComponent, canActivate: [authGuard]},
  { path: '**', redirectTo: 'login' }
];
