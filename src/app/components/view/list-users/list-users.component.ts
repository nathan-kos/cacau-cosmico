import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Usuario } from '../../../DTO/Usuario/Usuario';
import { HeaderComponent } from '../../resources/header/header.component';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [HeaderComponent, NgFor],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css',
})
export class ListUsersComponent {
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
  ];
}
