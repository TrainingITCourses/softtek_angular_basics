import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./bookings/bookings.component'),
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./routes/auth/login.component'),
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./routes/auth/register.page'),
  },
];
