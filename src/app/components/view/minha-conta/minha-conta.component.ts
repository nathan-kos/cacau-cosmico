import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Bandeira } from '../../../DTO/cartao/Bandeira';
import { Cartao } from '../../../DTO/cartao/Cartão';
import { Endereco } from '../../../DTO/endereco/Endereco';
import { Tipo } from '../../../DTO/endereco/Tipo';
import { UF } from '../../../DTO/endereco/UF';
import { ErrorDTO } from '../../../DTO/Error/ErrorDTO';
import { Usuario } from '../../../DTO/Usuario/Usuario';
import { CartaoService } from '../../../Services/cartao/cartao.service';
import { EnderecoService } from '../../../Services/endereco/endereco.service';
import { UsuarioService } from '../../../Services/usuario/usuario.service';
import { CartaoComponent } from '../../resources/cartao/cartao.component';
import { ConfirmacaoComponent } from '../../resources/confirmacao/confirmacao.component';
import { EnderecoComponent } from '../../resources/endereco/endereco.component';
import { HeaderComponent } from '../../resources/header/header.component';
import { TrocarSenhaComponent } from '../../resources/trocar-senha/trocar-senha.component';

@Component({
  selector: 'app-minha-conta',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    TrocarSenhaComponent,
    HeaderComponent,
    NgFor,
    EnderecoComponent,
    ConfirmacaoComponent,
    CartaoComponent,
    NgxMaskDirective,
  ],
  templateUrl: './minha-conta.component.html',
  styleUrl: './minha-conta.component.css',
})
export class MinhaContaComponent implements OnInit {
  // modals
  public userTab: boolean = true;
  public enderecoTab: boolean = false;
  public cartaoTab: boolean = false;
  public senhaModal: boolean = false;
  public deleteContaModal: boolean = false;
  public pedidoTab: boolean = false;

  public error: string | undefined;

  async ngOnInit(): Promise<void> {
    await this.getUser();
    await this.getEnderecos();
    await this.getCartoes();
    this.setUserForm();
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: UsuarioService,
    private router: Router,
    private enderecoService: EnderecoService,
    private cartaoService: CartaoService
  ) {
    // user form

    this.editUserForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: [{ value: '', disabled: true }, Validators.required],
      dataNascimento: [{ value: '', disabled: true }, Validators.required],
      genero: [{ value: '', disabled: true }, Validators.required],
      senha: [{ value: '', disabled: true }, Validators.required],
    });
  }

  public closeModals() {
    this.userTab = false;
    this.enderecoTab = false;
    this.cartaoTab = false;
    this.senhaModal = false;
    this.deleteContaModal = false;
    this.pedidoTab = false;
  }

  public openUserTab() {
    this.closeModals();
    this.userTab = true;
  }

  public openEnderecoTab() {
    this.closeModals();
    this.enderecoTab = true;
  }

  public openCartaoTab() {
    this.closeModals();
    this.cartaoTab = true;
  }

  public openSenhaModal() {
    this.senhaModal = true;
  }

  public openDeleteContaModal() {
    this.deleteContaModal = true;
  }

  public openPedidoTab() {
    this.closeModals();
    this.pedidoTab = true;
  }

  // user
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

  public editUserForm: FormGroup;
  public userError: string | undefined;

  public closeUserModals() {
    this.userError = undefined;
    this.senhaModal = false;
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

  public setUserForm() {
    this.editUserForm.setValue({
      nome: this.user.usu_Nome,
      email: this.user.usu_Email,
      telefone: this.user.usu_Telefone,
      cpf: this.user.usu_CPF,
      dataNascimento: this.user.usu_Nasc,
      genero: this.user.usu_Genero,
      senha: this.user.usu_Senha,
    });
  }

  public async onSubmitUser() {
    if (!this.editUserForm.valid) {
      this.userError = 'Preencha todos os campos corretamente';
      return;
    }

    // atualiza o usuario no back end
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

  //////////////////////////////////////
  // enderecos                       //
  /////////////////////////////////////
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

  public enderecoNewModal: boolean = false;
  public enderecoEditModal: boolean = false;
  public enderecoDeleteModal: boolean = false;

  public selectedEndereco: Endereco | undefined;

  public enderecoPage: number = 1;
  public enderecoLimit: number = 10;
  public enderecoTotal: number = 0;

  public async updatedEndereco() {
    await this.getEnderecos();
    this.closeEnderecoModals();
  }

  public closeEnderecoModals() {
    this.enderecoEditModal = false;
    this.enderecoDeleteModal = false;
    this.enderecoNewModal = false;
  }

  public async getEnderecos() {
    // busca no backend

    const usu_Id = this.route.snapshot.paramMap.get('id');

    if (!usu_Id) {
      return;
    }

    const response = await this.enderecoService.getAll(
      usu_Id,
      this.enderecoLimit,
      this.enderecoPage
    );

    if (response instanceof ErrorDTO) {
      this.error = response.mensagem;
      return;
    }

    this.enderecos = response.results;
    this.enderecoTotal = response.total;

    console.log(response);
  }

  public openEnderecoModalEdit(endereco: Endereco) {
    this.selectedEndereco = endereco;
    this.enderecoEditModal = true;
  }

  public openEnderecoModalNew() {
    this.enderecoNewModal = true;
  }

  public openDeleteEnderecoModal(endereco: Endereco) {
    this.selectedEndereco = endereco;
    this.enderecoDeleteModal = true;
  }

  public deleteEndereco() {
    // deleta no backend
    this.closeEnderecoModals();
    window.alert('endereco deletado');
  }
  //////////////////////////////////////
  // cartoes                         //
  /////////////////////////////////////
  public cartoes: Cartao[] = [
    {
      car_Id: '1',
      car_Bandeira: Bandeira.VISA,
      car_CVV: '123',
      car_Validade: '10/24',
      car_Nome: 'Nome Sobrenome',
      car_Numero: '1234 5678 1234 5678',
      car_usu_id: '1',
      car_Ativo: true,
      car_AtualizadoEm: '2024-10-31T00:00:00.000Z',
      car_CriadoEm: '2024-10-31T00:00:00.000Z',
    },
    {
      car_Id: '1',
      car_Bandeira: Bandeira.VISA,
      car_CVV: '123',
      car_Validade: '10/24',
      car_Nome: 'Nome Sobrenome',
      car_Numero: '1234 5678 1234 5678',
      car_usu_id: '1',
      car_Ativo: true,
      car_AtualizadoEm: '2024-10-31T00:00:00.000Z',
      car_CriadoEm: '2024-10-31T00:00:00.000Z',
    },
  ];

  public cartaoNewModal: boolean = false;
  public cartaoDeleteModal: boolean = false;

  public selectedCartao: Cartao | undefined;

  public cartaoPage: number = 1;
  public cartaoLimit: number = 10;
  public cartaoTotal: number = 0;

  public closeCartaoModals() {
    this.cartaoDeleteModal = false;
    this.cartaoNewModal = false;
  }

  public async getCartoes() {
    const usu_Id = this.route.snapshot.paramMap.get('id');

    if (!usu_Id) {
      return;
    }

    console.log(usu_Id);

    const response = await this.cartaoService.getAll(
      usu_Id,
      this.cartaoLimit,
      this.cartaoPage
    );

    if (response instanceof ErrorDTO) {
      this.error = response.mensagem;
      return;
    }

    this.cartoes = response.results;
    this.cartaoTotal = response.total;
  }

  public openCartaoModalNew() {
    this.cartaoNewModal = true;
  }

  public openDeleteCartaoModal(cartao: Cartao) {
    this.selectedCartao = cartao;
    this.cartaoDeleteModal = true;
  }

  public deleteCartao() {
    // deleta no backend
    this.closeCartaoModals();
    window.alert('cartao deletado');
  }

  // pedidos

  // deletar conta
  public async deleteAccount() {
    // deleta no backend
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    await this.service.delete(id);

    this.contaDeletada();
  }

  public contaDeletada() {
    //redireciona pra home
    this.closeContaModals();
    this.router.navigate(['/']);
  }

  public closeContaModals() {
    this.deleteContaModal = false;
  }
}
