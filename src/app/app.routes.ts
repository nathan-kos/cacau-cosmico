import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/view/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '**',
    component: NotFoundComponent,
  },
];
