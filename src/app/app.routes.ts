import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pags/tabs/tabs.routes').then((m) => m.routes),
  },
];
