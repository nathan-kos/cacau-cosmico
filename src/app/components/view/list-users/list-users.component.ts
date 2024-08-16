import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../../DTO/Usuario/Usuario';
import { ConfirmacaoComponent } from '../../resources/confirmacao/confirmacao.component';
import { HeaderComponent } from '../../resources/header/header.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [HeaderComponent, NgFor, ConfirmacaoComponent, NgIf],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
})
export class ListUsersComponent {
  constructor(private router: Router) {}

  public usuarios: Usuario[] = [
    {
      usu_Id: '1',
      usu_Nome: 'João',
      usu_Email: 'jkhdsjhkd',
      usu_Ativo: true,
      usu_CPF: '123123123',
      usu_CriadoEm: '2021-07-07',
      usu_AtualizadoEm: '2021-07-07',
      usu_Genero: 'M',
      usu_Nasc: '1999-07-07',
      usu_pap: '1',
      usu_Senha: '123123',
      usu_Telefone: '123123123',
    },
    {
      usu_Id: '2',
      usu_Nome: 'Maria',
      usu_Email: 'jkhdsjhkd',
      usu_Ativo: true,
      usu_CPF: '123123123',
      usu_CriadoEm: '2021-07-07',
      usu_AtualizadoEm: '2021-07-07',
      usu_Genero: 'F',
      usu_Nasc: '1999-07-07',
      usu_pap: '1',
      usu_Senha: '123123',
      usu_Telefone: '123123123',
    },
  ];

  public selectedUser: Usuario | null = null;

  public showDeleteModal = false;

  public openDeleteModal(user: Usuario) {
    this.selectedUser = user;
    this.showDeleteModal = true;
  }

  public closeDeleteModal() {
    this.showDeleteModal = false;
  }

  public deleteUser() {
    this.showDeleteModal = false;
    // chama o backend para deletar o usuário
    window.alert('Usuário deletado com sucesso');
  }

  public goToEdit(usuario: Usuario) {
    const route = '/usuario/editar/' + usuario.usu_Id;
    this.router.navigate([route]);
  }
}
