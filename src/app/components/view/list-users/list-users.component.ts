import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorDTO } from '../../../DTO/Error/ErrorDTO';
import { Usuario } from '../../../DTO/Usuario/Usuario';
import { UsuarioService } from '../../../Services/usuario/usuario.service';
import { ConfirmacaoComponent } from '../../resources/confirmacao/confirmacao.component';
import { HeaderComponent } from '../../resources/header/header.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [HeaderComponent, NgFor, ConfirmacaoComponent, NgIf],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
})
export class ListUsersComponent implements OnInit {
  constructor(private router: Router, private usuarioService: UsuarioService) {}

  public usuarios: Usuario[] = [];

  public page = 1;
  public limit = 1;
  public total = 0;

  ngOnInit(): void {
    this.getUsuarios();
  }

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

  public async getUsuarios() {
    const response = await this.usuarioService.getAll(this.limit, this.page);

    if (response instanceof ErrorDTO) {
      window.alert(response.mensagem);
    } else {
      this.usuarios = response.results;
      this.total = response.total;
    }
  }

  public async nextPage() {
    this.page++;
    this.getUsuarios();
  }

  public async previousPage() {
    this.page--;
    this.getUsuarios();
  }

  public totalPages() {
    return Math.ceil(this.total / this.limit);
  }
}
