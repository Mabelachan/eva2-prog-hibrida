import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        loadComponent: () =>
          import('./tabInicio/tabInicio.page').then((m) => m.InicioPage),
      },
      {
        path: 'gestion',
        loadComponent: () =>
          import('./tabGestion/tabGestion.page').then((m) => m.GestionPage),
      },
      {
        path: 'configuracion',
        loadComponent: () =>
          import('./tabConfiguracion/tabConfiguracion.page').then((m) => m.ConfiguracionPage),
      },
      {
        path: '',
        redirectTo: '/tabs/inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full',
  },
];
