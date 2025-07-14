import { Routes } from '@angular/router';
import { Usuarios } from './usuarios/usuarios';
import { Contacto } from './contacto/contacto';

export const routes: Routes = [
  {
    path: 'usuarios',
    loadComponent() {
      return import('./usuarios/usuarios')
        .then(m => m.Usuarios);
    },
    title: 'Home'
  },
  {
    path: 'contacto',
    component: Contacto,
    title: 'Contact'
  },
];
