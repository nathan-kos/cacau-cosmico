import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ErrorDTO } from '../../../DTO/Error/ErrorDTO';
import { Pedido } from '../../../DTO/Pedido/Pedido';
import { StatusPedidos } from '../../../DTO/Pedido/StatusPedidos';
import { Usuario } from '../../../DTO/Usuario/Usuario';
import { PedidoService } from '../../../Services/pedido/pedido.service';
import { UsuarioService } from '../../../Services/usuario/usuario.service';
import { HeaderComponent } from '../../resources/header/header.component';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [HeaderComponent, NgFor, NgIf],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css',
})
export class PedidosComponent implements OnInit {
  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  public pedidos: {
    pedido: Pedido;
    usuario: Usuario;
  }[] = [];

  public pedidoPage: number = 1;
  public pedidoLimit: number = 10;
  public pedidoTotal: number = 0;
  public totalPedidoPage: number = 0;

  public statusSelected: StatusPedidos = StatusPedidos.PAGAMENTO_REALIZADO;

  public changeStatus(status: string): void {
    switch (status) {
      case 'PAGAMENTO_REALIZADO':
        this.statusSelected = StatusPedidos.PAGAMENTO_REALIZADO;
        break;
      case 'PAGAMENTO_REJEITADO':
        this.statusSelected = StatusPedidos.PAGAMENTO_REJEITADO;
        break;
      case 'EM_TRANSPORTE':
        this.statusSelected = StatusPedidos.EM_TRANSPORTE;
        break;
      case 'ENTREGUE':
        this.statusSelected = StatusPedidos.ENTREGUE;
        break;
      case 'CANCELADO':
        this.statusSelected = StatusPedidos.CANCELADO;
        break;
      default:
        this.statusSelected = StatusPedidos.PAGAMENTO_REALIZADO;
        break;
    }

    this.pedidoPage = 1;
    this.pedidos = [];
    this.getPedidos();
  }

  public async getPedidos(): Promise<void> {
    this.pedidos = [];
    const response = await this.pedidoService.listByStatus(
      this.statusSelected,
      this.pedidoPage,
      this.pedidoLimit
    );

    if (response instanceof ErrorDTO) {
      window.alert(response.mensagem);
      return;
    } else {
      this.addUsuario(response.results);
      this.pedidoTotal = response.total;
      this.totalPedidoPage = Math.ceil(this.pedidoTotal / this.pedidoLimit);
    }
  }

  public addUsuario(pedidos: Pedido[]): void {
    pedidos.forEach(async (pedido) => {
      const response = await this.usuarioService.get(pedido.ped_usu_id);

      if (response instanceof ErrorDTO) {
        window.alert(response.mensagem);
        return;
      } else {
        this.pedidos.push({
          pedido: pedido,
          usuario: response,
        });
      }
    });
  }

  // modal functions
  public showModal: boolean = false;
  public selectedPedido: Pedido | null = null;

  public openModal(pedido: Pedido): void {
    this.selectedPedido = pedido;
    this.showModal = true;
  }

  public closeModal(): void {
    this.getPedidos();
    this.showModal = false;
  }

  // pagination functions
  public async nextPage() {
    this.pedidoPage++;
    await this.getPedidos();
  }

  public async previousPage() {
    this.pedidoPage--;
    await this.getPedidos();
  }

  public async lastPage() {
    this.totalPedidoPage = Math.ceil(this.pedidoTotal / this.pedidoLimit);
  }
}
