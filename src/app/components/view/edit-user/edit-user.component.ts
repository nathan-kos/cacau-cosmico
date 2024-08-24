import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Bandeira } from '../../../DTO/cartao/Bandeira';
import { Cartao } from '../../../DTO/cartao/Cartão';
import { Endereco } from '../../../DTO/endereco/Endereco';
import { Tipo } from '../../../DTO/endereco/Tipo';
import { UF } from '../../../DTO/endereco/UF';
import { ErrorDTO } from '../../../DTO/Error/ErrorDTO';
import { Usuario } from '../../../DTO/Usuario/Usuario';
import { UsuarioService } from '../../../Services/usuario/usuario.service';
import { CartaoComponent } from '../../resources/cartao/cartao.component';
import { ConfirmacaoComponent } from '../../resources/confirmacao/confirmacao.component';
import { EnderecoComponent } from '../../resources/endereco/endereco.component';
import { HeaderComponent } from '../../resources/header/header.component';
import { TrocarSenhaComponent } from '../../resources/trocar-senha/trocar-senha.component';

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
    ConfirmacaoComponent,
    TrocarSenhaComponent,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent implements OnInit {
  public editUserForm: FormGroup;
  public error: string | undefined;

  public enderecoModalNew: boolean = false;
  public enderecoModalEdit: boolean = false;
  public cartaoModalNew: boolean = false;
  public cartaoModalEdit: boolean = false;

  public deleteEnderecoModal: boolean = false;
  public deleteCartaoModal: boolean = false;

  public alterarSenhaModal: boolean = false;

  public selectedEndereco: Endereco | undefined;
  public selectedCartao: Cartao | undefined;

  public user: Usuario = {
    usu_Ativo: true,
    usu_CPF: '123.456.789-00',
    usu_Email: 'email@email.com',
    usu_Nome: 'Nome Sobrenome',
    usu_Telefone: '(11) 12345-6789',
    usu_Nasc: '2000-10-31T00:00:00.000Z',
    usu_Genero: 'masculino',
    usu_AtualizadoEm: '2024-10-31T00:00:00.000Z',
    usu_CriadoEm: '2024-10-31T00:00:00.000Z',
    usu_Id: '1',
    usu_Senha: '123456',
    usu_pap: '1',
  };

  public enderecos: Endereco[] = [
    {
      end_Bairro: 'Bairro',
      end_CEP: '12345-678',
      end_Cidade: 'Cidade',
      end_Complemento: 'Complemento',
      end_UF: UF.SP,
      end_Id: '1',
      end_Rua: 'Rua',
      end_Numero: '123',
      end_Tipo: Tipo.COBRANCA,
      end_usu_id: '1',
      end_Ativo: true,
      end_AtualizadoEm: '2024-10-31T00:00:00.000Z',
      end_CriadoEm: '2024-10-31T00:00:00.000Z',
    },
  ];

  public cartoes: Cartao[] = [
    {
      car_Bandeira: Bandeira.ELO,
      car_CVV: '1111',
      car_Nome: 'Nome Cartão',
      car_Numero: '1234 5678 1234 5678',
      car_Validade: '11/1111',
      car_Id: '1',
      car_usu_id: '1',
      car_Ativo: true,
      car_AtualizadoEm: '2024-10-31T00:00:00.000Z',
      car_CriadoEm: '2024-10-31T00:00:00.000Z',
    },
    {
      car_Bandeira: Bandeira.MASTERCARD,
      car_CVV: '2222',
      car_Nome: 'Nome Cartão',
      car_Numero: '1234 5678 1234 5678',
      car_Validade: '11/1111',
      car_Id: '2',
      car_usu_id: '1',
      car_Ativo: true,
      car_AtualizadoEm: '2024-10-31T00:00:00.000Z',
      car_CriadoEm: '2024-10-31T00:00:00.000Z',
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: UsuarioService
  ) {
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

  async ngOnInit(): Promise<void> {
    await this.getUser();
    console.log(this.user);

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

  public async onSubmit(): Promise<void> {
    if (!this.editUserForm.valid) {
      this.error = 'Formulário inválido';
      return;
    }

    // Processa o envio do formulário (somente os campos editáveis serão enviados)
    const { nome, email, telefone } = this.editUserForm.value;
    const updatedUserData = { nome, email, telefone };

    const response = await this.service.update(
      {
        usu_Ativo: this.user.usu_Ativo,
        usu_Email: updatedUserData.email,
        usu_Nome: updatedUserData.nome,
        usu_Telefone: updatedUserData.telefone,
      },
      this.user.usu_Id
    );

    if (response instanceof ErrorDTO) {
      this.error = response.mensagem;
      return;
    }

    // Atualiza os dados do usuário
    await this.getUser();
  }

  public async getUser() {
    //pega o id do parametro da url
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    const response = await this.service.get(id);

    if (response instanceof ErrorDTO) {
      this.error = response.mensagem;
      return;
    }

    this.user = response;
  }

  public openEnderecoModalNew(): void {
    this.enderecoModalNew = true;
  }

  public openEnderecoModalEdit(endereco: Endereco): void {
    this.selectedEndereco = endereco;
    this.enderecoModalEdit = true;
  }

  public openCartaoModalNew(): void {
    this.cartaoModalNew = true;
  }

  public openCartaoModalEdit(): void {
    this.cartaoModalEdit = true;
  }

  public closeModals(): void {
    this.enderecoModalNew = false;
    this.cartaoModalNew = false;
    this.enderecoModalEdit = false;
    this.cartaoModalEdit = false;

    this.deleteEnderecoModal = false;
    this.deleteCartaoModal = false;

    this.alterarSenhaModal = false;
  }

  public openDeleteEnderecoModal(endereco: Endereco): void {
    this.selectedEndereco = endereco;
    this.deleteEnderecoModal = true;
  }

  public openDeleteCartaoModal(cartao: Cartao): void {
    this.selectedCartao = cartao;
    this.deleteCartaoModal = true;
  }

  public deleteEndereco(): void {
    // chamada ao serviço para deletar o endereço
    window.alert('Endereço deletado com sucesso');
  }

  public deleteCartao(): void {
    // chamada ao serviço para deletar o cartão
    window.alert('Cartão deletado com sucesso');
  }

  public openAlterarSenhaModal(): void {
    this.alterarSenhaModal = true;
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
