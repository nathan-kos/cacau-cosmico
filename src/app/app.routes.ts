import { Routes } from '@angular/router';
import { HomeComponent } from './components/view/home/home.component';
import { ListingComponent } from './components/view/listing/listing.component';
import { NotFoundComponent } from './components/view/not-found/not-found.component';
import { SignUpComponent } from './components/view/sign-up/sign-up.component';

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
    path: 'produtos',
    component: ListingComponent,
    pathMatch: 'full',
  },

  {
    path: 'produtos/:categoria',
    component: ListingComponent,
    pathMatch: 'full',
  },

  {
    path: 'usuario/cadastro',
    component: SignUpComponent,
    pathMatch: 'full',
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];
