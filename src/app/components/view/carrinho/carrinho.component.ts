import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Bandeira } from '../../../DTO/cartao/Bandeira';
import { Cartao } from '../../../DTO/cartao/Cartão';
import { Chocolate } from '../../../DTO/chocolate/Chocolate';
import { Endereco } from '../../../DTO/endereco/Endereco';
import { Tipo } from '../../../DTO/endereco/Tipo';
import { UF } from '../../../DTO/endereco/UF';
import { CarrinhoService } from '../../../Services/carrinho/carrinho.service';
import { BadgeComponent } from '../../resources/badge/badge.component';
import { CartaoComponent } from '../../resources/cartao/cartao.component';
import { EnderecoComponent } from '../../resources/endereco/endereco.component';
import { HeaderComponent } from '../../resources/header/header.component';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [
    HeaderComponent,
    NgFor,
    BadgeComponent,
    NgIf,
    ReactiveFormsModule,
    EnderecoComponent,
    CartaoComponent,
  ],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css',
})
export class CarrinhoComponent implements OnInit {
  ////////////////////
  // geral
  ////////////////////

  constructor(
    private carrinhoService: CarrinhoService,
    private formBuilder: FormBuilder
  ) {
    this.cupomForm = this.formBuilder.group({
      cupom: ['', Validators.required],
    });

    this.cupomForm.valueChanges.subscribe(() => {
      this.cupomErro = undefined;
    });
  }

  async ngOnInit(): Promise<void> {
    const carrinho = this.carrinhoService.ObterCarrinho();

    //passa de chocolate por chocolate colocando no array chocolates verificando se já existe se sim incrementa a quantidade
    carrinho.forEach((chocolate) => {
      const index = this.chocolates.findIndex(
        (c) => c.chocolate.cho_Id === chocolate.cho_Id
      );

      if (index !== -1) {
        this.chocolates[index].quantidade++;
      } else {
        this.chocolates.push({ chocolate, quantidade: 1 });
      }
    });

    await this.getEnderecos();
  }

  public finalizarCompra() {
    // vai no backend finalizar a compra
    window.alert('Ainda não implementado! desculpe eu dei o meu melhor!');
  }

  ////////////////////
  // carrinho
  ////////////////////

  public subtotal: number = 100;

  public total: number = 100;

  public frete: number = 10;

  public limparCarrinho() {
    this.carrinhoService.LimparCarrinho();
    this.chocolates = [];
  }

  public getSubtotal() {
    return this.chocolates.reduce(
      (acc, chocolate) =>
        acc + chocolate.chocolate.cho_Valor * chocolate.quantidade,
      0
    );
  }

  //////////////////////////
  // endereços
  //////////////////////////
  public enderecos: {
    endereco: Endereco;
    selecionado: boolean;
  }[] = [
    {
      endereco: {
        end_Id: 'fskdjflskd',
        end_Rua: 'Rua 1',
        end_Numero: '1',
        end_Bairro: 'Bairro 1',
        end_Cidade: 'Cidade 1',
        end_Apelido: 'Casa',
        end_Ativo: true,
        end_AtualizadoEm: '2021-09-01',
        end_CEP: '00000-000',
        end_Complemento: 'Complemento 1',
        end_CriadoEm: '2021-09-01',
        end_Cobranca: true,
        end_Entrega: true,
        end_Tipo: Tipo.COBRANCA,
        end_usu_id: 'fskdjflskd',
        end_UF: UF.SP,
      },
      selecionado: false,
    },
    {
      endereco: {
        end_Id: 'fskdjflskd',
        end_Rua: 'Rua 1',
        end_Numero: '1',
        end_Bairro: 'Bairro 1',
        end_Cidade: 'Cidade 1',
        end_Apelido: 'Casa',
        end_Ativo: true,
        end_AtualizadoEm: '2021-09-01',
        end_CEP: '00000-000',
        end_Complemento: 'Complemento 1',
        end_CriadoEm: '2021-09-01',
        end_Cobranca: true,
        end_Entrega: true,
        end_Tipo: Tipo.COBRANCA,
        end_usu_id: 'fskdjflskd',
        end_UF: UF.SP,
      },
      selecionado: false,
    },
    {
      endereco: {
        end_Id: 'fskdjflskd',
        end_Rua: 'Rua 1',
        end_Numero: '1',
        end_Bairro: 'Bairro 1',
        end_Cidade: 'Cidade 1',
        end_Apelido: 'Casa',
        end_Ativo: true,
        end_AtualizadoEm: '2021-09-01',
        end_CEP: '00000-000',
        end_Complemento: 'Complemento 1',
        end_CriadoEm: '2021-09-01',
        end_Cobranca: true,
        end_Entrega: true,
        end_Tipo: Tipo.COBRANCA,
        end_usu_id: 'fskdjflskd',
        end_UF: UF.SP,
      },
      selecionado: false,
    },
  ];

  onEnderecoChange(endereco: { endereco: Endereco; selecionado: boolean }) {
    this.enderecos.forEach((e) => {
      e.selecionado = e === endereco;
    });
  }

  public getEnderecoSelecionado() {
    return this.enderecos.find((e) => e.selecionado);
  }

  public async getEnderecos() {
    //vai no backend buscar os endereços

    //seta todos os endereços como não selecionados
    this.enderecos.forEach((e) => (e.selecionado = false));
  }

  //modal de endereço
  public enderecoModal: boolean = false;

  public abrirEnderecoModal() {
    this.enderecoModal = true;
  }

  public async fecharEnderecoModal() {
    await this.getEnderecos();
    this.enderecoModal = false;
  }

  //////////////////////////
  // cartões
  //////////////////////////
  public cartoes: Cartao[] = [
    {
      car_Id: 'fskdjflskd',
      car_Bandeira: Bandeira.VISA,
      car_CriadoEm: '2021-09-01',
      car_CVV: '123',
      car_Nome: 'Nome 1',
      car_Numero: '1234 5678 1234 5678',
      car_usu_id: 'fskdjflskd',
      car_Apelido: 'Cartão 1',
      car_Ativo: true,
      car_AtualizadoEm: '2021-09-01',
      car_Validade: '12/2022',
    },
    {
      car_Id: 'fskdjflskd',
      car_Bandeira: Bandeira.VISA,
      car_CriadoEm: '2021-09-01',
      car_CVV: '123',
      car_Nome: 'Nome 1',
      car_Numero: '1234 5678 1234 5678',
      car_usu_id: 'fskdjflskd',
      car_Apelido: 'Cartão 1',
      car_Ativo: true,
      car_AtualizadoEm: '2021-09-01',
      car_Validade: '12/2022',
    },
  ];

  public usarMaisDeUmCartao: boolean = false;

  public onChangeQuantidadeCartoes(event: Event) {
    this.usarMaisDeUmCartao = (event.target as HTMLInputElement).checked;
  }

  public async getCartoes() {
    //vai no backend buscar os cartões

    //seta todos os cartões como não selecionados
    this.cartoes.forEach((c) => (c.car_Ativo = false));
  }

  //modal de cartão
  public cartaoModal: boolean = false;

  public abrirCartaoModal() {
    this.cartaoModal = true;
  }

  public async fecharCartaoModal() {
    await this.getCartoes();
    this.cartaoModal = false;
  }

  //////////////////
  // chocolates
  //////////////////
  public chocolates: {
    chocolate: Chocolate;
    quantidade: number;
  }[] = [];

  public lessProduto(produto: { chocolate: Chocolate; quantidade: number }) {
    if (produto.quantidade > 1) {
      produto.quantidade--;
    } else {
      this.chocolates = this.chocolates.filter(
        (chocolate) => chocolate !== produto
      );

      this.carrinhoService.RemoverChocolateDoCarrinho(produto.chocolate);
    }
  }

  public moreProduto(produto: { chocolate: Chocolate; quantidade: number }) {
    produto.quantidade++;
  }

  //////////////////////////
  // cupom
  //////////////////////////

  public cupomForm: FormGroup;

  public cupoms: any[] = [];
  public cupomErro: string | undefined;
  public cupomTotal: number = 1;

  public buscarCupom() {
    // vai no backend buscar o cupom

    const codigo = this.cupomForm.get('cupom')?.value;

    if (!codigo) {
      this.cupomErro = 'Cupom não informado!';
      return;
    }

    window.alert('Ainda não implementado! desculpe eu dei o meu melhor!');
  }

  public removerCupom(cupom: any) {
    this.cupoms = this.cupoms.filter((c) => c !== cupom);
  }
}
