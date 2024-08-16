import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Bandeira } from '../../../DTO/cartao/Bandeira';
import { Cartao } from '../../../DTO/cartao/Cartão';
import { Endereco } from '../../../DTO/endereco/Endereco';
import { Tipo } from '../../../DTO/endereco/Tipo';
import { UF } from '../../../DTO/endereco/UF';
import { Usuario } from '../../../DTO/Usuario/Usuario';
import { CartaoComponent } from '../../resources/cartao/cartao.component';
import { EnderecoComponent } from '../../resources/endereco/endereco.component';
import { HeaderComponent } from '../../resources/header/header.component';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgIf,
    EnderecoComponent,
    CartaoComponent,
    NgFor,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  public editUserForm: FormGroup;
  public error: string | undefined;
  public user: Usuario = {
    usu_Ativo: true,
    usu_CPF: '123.456.789-00',
    usu_Email: 'fds',
    usu_Nome: 'fds',
    usu_Telefone: '11111111111',
    usu_Nasc: '2000-10-31T00:00:00.000Z',
    usu_Genero: 'masculino',
    usu_AtualizadoEm: 'fds',
    usu_CriadoEm: 'fds',
    usu_Id: 'ads',
    usu_Senha: 'fds',
    usu_pap: 'fds',
  };

  public enderecos: Endereco[] = [
    {
      end_Bairro: 'fds',
      end_CEP: 'fds',
      end_Cidade: 'fds',
      end_Complemento: 'fds',
      end_UF: UF.AC,
      end_Id: 'fds',
      end_Rua: 'fds',
      end_Numero: 'fds',
      end_Tipo: Tipo.COBRANCA,
      end_usu_id: 'fds',
      end_Ativo: true,
      end_AtualizadoEm: 'fds',
      end_CriadoEm: 'fds',
    },

    {
      end_Bairro: 'fds',
      end_CEP: 'fds',
      end_Cidade: 'fds',
      end_Complemento: 'fds',
      end_UF: UF.AC,
      end_Id: 'fds',
      end_Rua: 'fds',
      end_Numero: 'fds',
      end_Tipo: Tipo.ENTREGA,
      end_usu_id: 'fds',
      end_Ativo: true,
      end_AtualizadoEm: 'fds',
      end_CriadoEm: 'fds',
    },
  ];

  public cartoes: Cartao[] = [
    {
      car_Bandeira: Bandeira.ELO,
      car_CVV: 'fds',
      car_Nome: 'fds',
      car_Numero: 'fds',
      car_Validade: 'fds',
      car_Id: 'fds',
      car_usu_id: 'fds',
      car_Ativo: true,
      car_AtualizadoEm: 'fds',
      car_CriadoEm: 'fds',
    },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.editUserForm = this.formBuilder.group({
      nome: [, Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: [{ value: '', disabled: true }, Validators.required],
      dataNascimento: [{ value: '', disabled: true }, Validators.required],
      genero: [{ value: '', disabled: true }, Validators.required],
      senha: [{ value: '', disabled: true }, Validators.required],
    });
  }

  ngOnInit(): void {
    // Simula a chamada ao backend para buscar os dados do usuário
    this.editUserForm.patchValue({
      nome: this.user.usu_Nome,
      email: this.user.usu_Email,
      telefone: this.user.usu_Telefone,
      cpf: this.user.usu_CPF,
      dataNascimento: this.formatDate(this.user.usu_Nasc),
      genero: this.user.usu_Genero,
      senha: this.user.usu_Senha,
    });
  }

  public onSubmit(): void {
    if (!this.editUserForm.valid) {
      this.error = 'Formulário inválido';
      return;
    }

    // Processa o envio do formulário (somente os campos editáveis serão enviados)
    const { nome, email, telefone } = this.editUserForm.value;
    const updatedUserData = { nome, email, telefone };

    // Chama o serviço para atualizar os dados no backend
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
