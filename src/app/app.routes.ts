import { Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RolesComponent } from './pages/roles/roles.component';
import { VariablesComponent } from './pages/variables/variables.component';

export const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'variables',
    component: VariablesComponent
  },
  {
    path: '',
    redirectTo: '/usuarios',
    pathMatch: 'full'
  }
];
