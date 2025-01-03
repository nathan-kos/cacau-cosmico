import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ChocolatePedido } from '../../../DTO/chocolatePedido/ChocolatePedido';
import { ErrorDTO } from '../../../DTO/Error/ErrorDTO';
import { Pedido } from '../../../DTO/Pedido/Pedido';
import { StatusPedidos } from '../../../DTO/Pedido/StatusPedidos';
import { Usuario } from '../../../DTO/Usuario/Usuario';
import { PedidoService } from '../../../Services/pedido/pedido.service';
import { UsuarioService } from '../../../Services/usuario/usuario.service';
import { HeaderComponent } from '../header/header.component';
import { TrocaDevolucaoComponent } from '../troca-devolucao/troca-devolucao.component';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    NgFor,
    NgIf,
    TrocaDevolucaoComponent,
  ],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css',
})
export class PedidoComponent implements OnInit {
  pedido: Pedido | undefined;

  public pedidoForm: FormGroup;
  public enderecoForm: FormGroup;
  public usuario: Usuario | undefined;

  public error: string | undefined;

  public isAdm: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    if (this.route.snapshot.url.some((segment) => segment.path === 'admin')) {
      this.isAdm = true;
    } else {
      this.isAdm = false;
    }

    if (this.isAdm) {
      this.pedidoForm = this.formBuilder.group({
        numero: [{ value: '', disabled: true }],
        status: ['', Validators.required],
        valor: [{ value: '', disabled: true }],
        CPF: [{ value: '', disabled: true }],
        nome: [{ value: '', disabled: true }],
      });
    } else {
      this.pedidoForm = this.formBuilder.group({
        numero: [{ value: '', disabled: true }],
        status: [{ value: '', disabled: true }],
        valor: [{ value: '', disabled: true }],
        CPF: [{ value: '', disabled: true }],
        nome: [{ value: '', disabled: true }],
      });
    }

    this.enderecoForm = this.formBuilder.group({
      rua: [{ value: '', disabled: true }],
      numero: [{ value: '', disabled: true }],
      complemento: [{ value: '', disabled: true }],
      bairro: [{ value: '', disabled: true }],
      cidade: [{ value: '', disabled: true }],
      UF: [{ value: '', disabled: true }],
      CEP: [{ value: '', disabled: true }],
      apelido: [{ value: '', disabled: true }],
      cobranca: [{ value: '', disabled: true }],
      entrega: [{ value: '', disabled: true }],
      tipo: [{ value: '', disabled: true }],
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.url.some((segment) => segment.path === 'admin')) {
      this.isAdm = true;
    } else {
      this.isAdm = false;
    }

    await this.getPedido();
  }

  public async getPedido() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/not-found']);
      return;
    }

    const response = await this.pedidoService.get(id);

    if (response instanceof ErrorDTO) {
      this.error = response.mensagem + ' - ' + response.code;
      return;
    }

    this.pedido = response;
    await this.setPedidoForm();
    this.setEnderecoForm();
  }

  public async getUser() {
    if (!this.pedido || !this.pedido.ped_usu_id) {
      return;
    }

    const response = await this.usuarioService.get(this.pedido.ped_usu_id);

    if (response instanceof ErrorDTO) {
      this.error = response.mensagem + ' - ' + response.code;
      return;
    }

    this.usuario = response;
  }

  public async setPedidoForm() {
    await this.getUser();

    if (!this.pedido || !this.usuario) {
      return;
    }

    this.pedidoForm.setValue({
      numero: this.pedido.ped_Id,
      status: this.pedido.ped_Status,
      valor: this.formatarValor(this.pedido.ped_ValorTotal),
      CPF: this.usuario.usu_CPF,
      nome: this.usuario.usu_Nome,
    });
  }

  public async updatePedido() {
    if (!this.pedido || !this.pedidoForm.valid) {
      return;
    }

    this.pedido.ped_Status = this.pedidoForm.get('status')?.value;

    const response = await this.pedidoService.changeStatus(
      this.pedido.ped_Id,
      this.pedido.ped_Status
    );

    if (response instanceof ErrorDTO) {
      this.error = response.mensagem + ' - ' + response.code;
      return;
    }
  }

  public formatarValor(valor: number) {
    return valor.toFixed(2).replace('.', ',');
  }

  public setTotal(chocolate: ChocolatePedido) {
    return this.formatarValor(
      chocolate.chp_Quantidade * chocolate.chocolate.cho_Valor
    );
  }

  //endereco
  public setEnderecoForm() {
    if (!this.pedido) {
      return;
    }

    this.enderecoForm.setValue({
      rua: this.pedido.endereco.end_Rua,
      numero: this.pedido.endereco.end_Numero,
      complemento: this.pedido.endereco.end_Complemento,
      bairro: this.pedido.endereco.end_Bairro,
      cidade: this.pedido.endereco.end_Cidade,
      UF: this.pedido.endereco.end_UF,
      CEP: this.pedido.endereco.end_CEP,
      apelido: this.pedido.endereco.end_Apelido,
      cobranca: this.pedido.endereco.end_Cobranca,
      entrega: this.pedido.endereco.end_Entrega,
      tipo: this.pedido.endereco.end_Tipo,
    });
  }

  // troca e devolução

  public showTrocaDevolucao: boolean = false;

  public troca: boolean | undefined;

  public selectedChocoPed: ChocolatePedido | undefined;

  public selectedChoco: string | undefined;

  public async trocar(tde_cho_ped_id: ChocolatePedido, cho_Id: string) {
    if (this.pedido?.ped_Status != StatusPedidos.ENTREGUE) {
      window.alert('Somente pedidos entregues podem ser trocados');
      return;
    }

    this.troca = true;
    this.selectedChocoPed = tde_cho_ped_id;
    this.selectedChoco = cho_Id;
    this.showTrocaDevolucao = true;
  }

  public async devolver(tde_cho_ped_id: ChocolatePedido, cho_Id: string) {
    if (this.pedido?.ped_Status != StatusPedidos.ENTREGUE) {
      window.alert('Somente pedidos entregues podem ser trocados');
      return;
    }

    this.troca = false;
    this.selectedChocoPed = tde_cho_ped_id;
    this.selectedChoco = cho_Id;
    this.showTrocaDevolucao = true;
  }

  public closeTrocaDevolucao() {
    this.troca = undefined;
    this.showTrocaDevolucao = false;
  }
}
