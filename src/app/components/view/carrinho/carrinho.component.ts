import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Bandeira } from '../../../DTO/cartao/Bandeira';
import { Cartao } from '../../../DTO/cartao/Cartão';
import { Chocolate } from '../../../DTO/chocolate/Chocolate';
import { cupom } from '../../../DTO/Cupom/cupom';
import { Endereco } from '../../../DTO/endereco/Endereco';
import { Tipo } from '../../../DTO/endereco/Tipo';
import { UF } from '../../../DTO/endereco/UF';
import { ErrorDTO } from '../../../DTO/Error/ErrorDTO';
import { CreatePedidoDTO } from '../../../DTO/Pedido/CreatePedidoDTO';
import { CarrinhoService } from '../../../Services/carrinho/carrinho.service';
import { CartaoService } from '../../../Services/cartao/cartao.service';
import { CupomService } from '../../../Services/cupom/cupom.service';
import { EnderecoService } from '../../../Services/endereco/endereco.service';
import { GlobalService } from '../../../Services/global.service';
import { PedidoService } from '../../../Services/pedido/pedido.service';
import { BadgeComponent } from '../../resources/badge/badge.component';
import { CartaoComponent } from '../../resources/cartao/cartao.component';
import { ConfirmacaoComponent } from '../../resources/confirmacao/confirmacao.component';
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
    FormsModule,
    ConfirmacaoComponent,
    NgxMaskDirective,
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
    private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private enderecoService: EnderecoService,
    private cartaoService: CartaoService,
    private cupomService: CupomService,
    private pedidoService: PedidoService,
    private router: Router
  ) {
    this.cupomForm = this.formBuilder.group({
      cupom: ['', Validators.required],
    });

    this.cupomForm.valueChanges.subscribe(() => {
      this.cupomErro = undefined;
    });
  }

  async ngOnInit(): Promise<void> {
    this.setSessionUsu_Id();
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
    await this.getCartoes();
  }

  public async finalizarCompra() {
    // vai no backend finalizar a compra
    this.mostrarValoresDosCartoes();

    const endereco = this.getEnderecoSelecionado();
    const cartoes = this.cartoes.filter((c) => c.selecionado);
    const cupoms = this.cupoms;

    if (!endereco) {
      this.abrirEnderecoNaoSelecionadoModal();
      return;
    }

    if (cartoes.length === 0 && this.getTotal() > 0) {
      this.abrirCartaoNaoSelecionadoModal();
      return;
    }

    if (this.usarMaisDeUmCartao) {
      //verifica se todos os cartões estão com valor acima de 10
      for (let i = 0; i < this.cartoes.length; i++) {
        if (this.cartoes[i].selecionado) {
          if (
            this.cartoes[i].valor == undefined ||
            this.cartoes[i].valor! < 10
          ) {
            window.alert('O valor mínimo para cada cartão é de R$ 10,00');
            return;
          }
        }
      }
    }

    const cartoesToSend: { car_Id: string; car_Valor: number }[] = cartoes.map(
      (c) => ({ car_Id: c.cartao.car_Id, car_Valor: c.valor || 0 })
    );

    const cupomsToSend: { cup_Id: string }[] = cupoms.map((c) => ({
      cup_Id: c.cup_Id,
    }));

    const chocolateToSend: { cho_Id: string; quantidade: number }[] =
      this.chocolates.map((c) => ({
        cho_Id: c.chocolate.cho_Id,
        quantidade: c.quantidade,
      }));

    const data: CreatePedidoDTO = {
      cartoes: cartoesToSend,
      chocolates: chocolateToSend,
      cupons: cupomsToSend,
      end_Id: endereco.endereco.end_Id,
      frete: this.getFrete(),
      usu_Id: this.usu_Id,
    };

    console.log(cartoesToSend);

    // envia o pedido para o backend
    const response = await this.pedidoService.create(data);

    if (response instanceof ErrorDTO) {
      window.alert(response.mensagem);
      return;
    } else {
      //limpa o carrinho
      this.limparCarrinho();
      //redireciona para a minha conta
      this.router.navigate(['/usuario/conta/' + this.usu_Id]);
    }
  }

  public usu_Id = this.globalService.defaultUsu_Id;

  public setSessionUsu_Id() {
    // seta na sessão o usu_Id
    sessionStorage.setItem('last_usu_Id', this.usu_Id);
  }
  ////////////////////
  // carrinho
  ////////////////////

  public limparCarrinho() {
    this.carrinhoService.LimparCarrinho();
    this.chocolates = [];
  }

  public getSubtotal() {
    return this.formatarValorMonetario(
      this.chocolates.reduce(
        (acc, chocolate) =>
          acc + chocolate.chocolate.cho_Valor * chocolate.quantidade,
        0
      )
    );
  }

  public getFrete() {
    return this.formatarValorMonetario(
      this.enderecos.find((e) => e.selecionado)?.frete || 0
    );
  }

  public getValorCupom() {
    return this.cupoms.reduce((acc, cupom) => acc + cupom.cup_Valor, 0);
    // return 15;
  }

  public getTotal() {
    // Calcula o total com no máximo duas casas decimais, arredondando para cima
    const total = this.formatarValorMonetario(
      this.getSubtotal() + this.getFrete() - this.getValorCupom()
    );

    if (total < 0) {
      return 0;
    }

    return total;
  }

  public formatarValor(valor: number) {
    return valor.toFixed(2).replace('.', ',');
  }

  private formatarValorMonetario(valor: number): number {
    return parseFloat(valor.toFixed(2));
  }

  //////////////////////////
  // endereços
  //////////////////////////
  public enderecos: {
    endereco: Endereco;
    selecionado: boolean;
    frete: number;
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
      frete: 10,
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
      frete: 15,
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
      frete: 20,
    },
  ];

  onEnderecoChange(endereco: { endereco: Endereco; selecionado: boolean }) {
    this.enderecos.forEach((c) => {
      if (c !== endereco) {
        c.selecionado = false;
      } else {
        c.selecionado = !c.selecionado;
      }
    });

    this.resetarValorCartoes();
  }

  public getEnderecoSelecionado() {
    return this.enderecos.find((e) => e.selecionado);
  }

  public async getEnderecos() {
    //vai no backend buscar os endereços
    const response = await this.enderecoService.getAll(this.usu_Id, 100, 1);

    if (response instanceof ErrorDTO) {
      window.alert(response.mensagem);
      return;
    }

    this.enderecos = response.results.map((endereco) => ({
      endereco,
      selecionado: false,
      // calcula o frete aleatoriamente para cada endereço entre 10 e 30
      frete: Math.floor(Math.random() * 20) + 10,
    }));
  }

  //modal de endereço
  public enderecoModal: boolean = false;
  public enderecoNaoSelecionadoModal: boolean = false;

  public abrirEnderecoModal() {
    this.enderecoModal = true;
  }

  public abrirEnderecoNaoSelecionadoModal() {
    this.enderecoNaoSelecionadoModal = true;
  }

  public async fecharEnderecoModal() {
    await this.getEnderecos();
    this.enderecoModal = false;
  }

  public fecharEnderecoNaoSelecionadoModal() {
    this.enderecoNaoSelecionadoModal = false;
  }

  //////////////////////////
  // cartões
  //////////////////////////
  public cartoes: {
    cartao: Cartao;
    selecionado: boolean;
    valor: number | undefined;
  }[] = [
    {
      cartao: {
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
      selecionado: false,
      valor: undefined,
    },
    {
      cartao: {
        car_Id: 'fskdjflskd',
        car_Bandeira: Bandeira.VISA,
        car_CriadoEm: '2021-09-01',
        car_CVV: '123',
        car_Nome: 'Nome 1',
        car_Numero: '1234 5678 1234 5678',
        car_usu_id: 'fskdjflskd',
        car_Apelido: 'Cartão 2',
        car_Ativo: true,
        car_AtualizadoEm: '2021-09-01',
        car_Validade: '12/2022',
      },
      selecionado: false,
      valor: undefined,
    },
    {
      cartao: {
        car_Id: 'fskdjflskd',
        car_Bandeira: Bandeira.VISA,
        car_CriadoEm: '2021-09-01',
        car_CVV: '123',
        car_Nome: 'Nome 1',
        car_Numero: '1234 5678 1234 5678',
        car_usu_id: 'fskdjflskd',
        car_Apelido: 'Cartão 3',
        car_Ativo: true,
        car_AtualizadoEm: '2021-09-01',
        car_Validade: '12/2022',
      },
      selecionado: false,
      valor: undefined,
    },
  ];

  public usarMaisDeUmCartao: boolean = false;

  public onChangeQuantidadeCartoes() {
    this.usarMaisDeUmCartao = !this.usarMaisDeUmCartao;
    // desseleciona todos os cartões
    this.cartoes.forEach((c) => (c.selecionado = false));
  }

  public async getCartoes() {
    //vai no backend buscar os cartões

    const response = await this.cartaoService.getAll(this.usu_Id, 100, 1);

    if (response instanceof ErrorDTO) {
      window.alert(response.mensagem);
      return;
    }

    this.cartoes = response.results.map((cartao) => ({
      cartao,
      selecionado: false,
      valor: undefined,
    }));
  }

  onCartaoChange(cartao: {
    cartao: Cartao;
    selecionado: boolean;
    valor: number | undefined;
  }) {
    if (!this.usarMaisDeUmCartao) {
      // inverte o estado de todos os cartões menos o clicado
      this.cartoes.forEach((c) => {
        if (c !== cartao) {
          c.selecionado = false;
          c.valor = undefined;
        } else {
          c.selecionado = !c.selecionado;

          if (!c.selecionado) {
            c.valor = undefined;
          } else {
            c.valor = this.getTotal();
          }
        }
      });
    } else {
      // Alterna o estado do cartão clicado
      cartao.selecionado = !cartao.selecionado;

      if (!cartao.selecionado) {
        cartao.valor = undefined;
      } else {
        cartao.valor = 0;
      }

      this.recalcularValorDeCadaCartao();
    }
  }

  public showError() {
    if (this.getTotal() < 20) {
      window.alert('O valor mínimo para compra é de R$ 20,00');
    }
  }

  public recalcularValorDeCadaCartao() {
    const cartoesSelecionados = this.cartoes.filter((c) => c.selecionado);

    if (cartoesSelecionados.length === 0) {
      return;
    }

    //Valor para dividir é o valor total menos o valor dos cartões que não estão zerados
    let valorTotal = this.getTotal();
    // passa por cada cartão selecionado e subtrai o valor dele do valor total
    cartoesSelecionados.forEach((c) => {
      if (c.valor != undefined) {
        valorTotal -= c.valor;
      }
    });

    const cartoesZerados = cartoesSelecionados.filter((c) => c.valor === 0);

    const valorPorCartaoZerado = valorTotal / cartoesZerados.length;

    cartoesZerados.forEach((c) => (c.valor = valorPorCartaoZerado));
  }

  public resetarValorCartoes() {
    //reseta o valor de todos os cartões e deseleciona todos
    this.cartoes.forEach((c) => {
      c.valor = undefined;
      c.selecionado = false;
    });
  }

  //modal de cartão
  public cartaoModal: boolean = false;
  public cartaoNaoSelecionadoModal: boolean = false;

  public abrirCartaoModal() {
    this.cartaoModal = true;
  }

  public abrirCartaoNaoSelecionadoModal() {
    this.cartaoNaoSelecionadoModal = true;
  }

  public async fecharCartaoModal() {
    await this.getCartoes();
    this.cartaoModal = false;
  }

  public fecharCartaoNaoSelecionadoModal() {
    this.cartaoNaoSelecionadoModal = false;
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
      this.resetarValorCartoes();
    }
  }

  public moreProduto(produto: { chocolate: Chocolate; quantidade: number }) {
    produto.quantidade++;
    //adiciona o chocolate no carrinho
    this.carrinhoService.AdicionarChocolateAoCarrinho(produto.chocolate);
    this.resetarValorCartoes();
  }

  //////////////////////////
  // cupom
  //////////////////////////

  public cupomForm: FormGroup;

  public cupoms: cupom[] = [];
  public cupomErro: string | undefined;
  public cupomTotal: number = 1;

  public async buscarCupom() {
    // vai no backend buscar o cupom

    const codigo = this.cupomForm.get('cupom')?.value;

    if (!codigo) {
      this.cupomErro = 'Cupom não informado!';
      return;
    }

    const cupom = await this.cupomService.FindByCodigo(codigo);

    if (cupom instanceof ErrorDTO) {
      this.cupomErro = cupom.mensagem;
      this.cupomErro = 'Cupom inválido!';
      return;
    }

    if (cupom.cup_Ativo === false) {
      this.cupomErro = 'Cupom inválido!';
      return;
    }

    //verifica se já não foi adicionado
    if (this.cupoms.find((c) => c.cup_Id === cupom.cup_Id)) {
      this.cupomErro = 'Cupom já adicionado!';
      return;
    }

    this.cupoms.push(cupom);
    this.resetarValorCartoes();
  }

  public removerCupom(cupom: any) {
    this.cupoms = this.cupoms.filter((c) => c !== cupom);
    this.resetarValorCartoes();
  }

  public mostrarValoresDosCartoes(): void {
    for (let i = 0; i < this.cartoes.length; i++) {
      if (this.cartoes[i].valor != undefined) {
        console.log(
          this.cartoes[i].cartao.car_Apelido + ' ' + this.cartoes[i].valor
        );
      }
    }
  }
}
