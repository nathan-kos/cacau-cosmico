import { Routes } from '@angular/router';
import { PedidoComponent } from './components/resources/pedido/pedido.component';
import { AdminComponent } from './components/view/admin/admin.component';
import { CarrinhoComponent } from './components/view/carrinho/carrinho.component';
import { EditUserComponent } from './components/view/edit-user/edit-user.component';
import { HomeComponent } from './components/view/home/home.component';
import { ListUsersComponent } from './components/view/list-users/list-users.component';
import { ListingComponent } from './components/view/listing/listing.component';
import { MinhaContaComponent } from './components/view/minha-conta/minha-conta.component';
import { NotFoundComponent } from './components/view/not-found/not-found.component';
import { PedidosComponent } from './components/view/pedidos/pedidos.component';
import { SignUpComponent } from './components/view/sign-up/sign-up.component';
import { TrocaDevolucoesComponent } from './components/view/troca-devolucoes/troca-devolucoes.component';

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
    path: 'carrinho',
    component: CarrinhoComponent,
    pathMatch: 'full',
  },

  {
    path: 'pedido/listagem',
    component: PedidosComponent,
    pathMatch: 'full',
  },

  {
    path: 'pedido/:id',
    component: PedidoComponent,
    pathMatch: 'full',
  },

  {
    path: 'admin',
    component: AdminComponent,
    pathMatch: 'full',
  },

  {
    path: 'admin/pedido/:id',
    component: PedidoComponent,
    pathMatch: 'full',
  },

  {
    path: 'troca-devolucao/listagem',
    component: TrocaDevolucoesComponent,
    pathMatch: 'full',
  },

  {
    path: '**',
    component: NotFoundComponent,
  },
];
