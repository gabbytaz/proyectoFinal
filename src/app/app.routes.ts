import { Routes } from '@angular/router';
import { Usuarios } from './usuarios/usuarios';
import { Contacto } from './contacto/contacto';

export const routes: Routes = [
  { path: 'usuarios',
    component: Usuarios, 
    title: 'Home' 
    },
  { path: 'contacto', 
    component: Contacto, 
    title: 'Contact'
    },
];
