import { Routes } from '@angular/router';
import { EditUserComponent } from './components/view/edit-user/edit-user.component';
import { HomeComponent } from './components/view/home/home.component';
import { ListUsersComponent } from './components/view/list-users/list-users.component';
import { ListingComponent } from './components/view/listing/listing.component';
import { NotFoundComponent } from './components/view/not-found/not-found.component';
import { SignUpComponent } from './components/view/sign-up/sign-up.component';
import { MinhaContaComponent } from './components/view/minha-conta/minha-conta.component';

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
    path: 'usuario/conta/:id',
    component: MinhaContaComponent,
    pathMatch: 'full',
  },

  {
    path: 'usuario/cadastro',
    component: SignUpComponent,
    pathMatch: 'full',
  },

  {
    path: 'usuario/listagem',
    component: ListUsersComponent,
    pathMatch: 'full',
  },

  {
    path: 'usuario/editar/:id',
    component: EditUserComponent,
    pathMatch: 'full',
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];
