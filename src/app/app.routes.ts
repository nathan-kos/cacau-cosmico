import { Routes } from '@angular/router';
import { HomeComponent } from './components/view/home/home.component';
import { NotFoundComponent } from './components/view/not-found/not-found.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    pathMatch: 'full',
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];
