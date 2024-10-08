import { CartaoPedido } from '../cartaoPedido/CartaoPedido';
import { ChocolatePedido } from '../chocolatePedido/ChocolatePedido';
import { CupomPedido } from '../cupomPedido/cupomPedido';
import { Endereco } from '../endereco/Endereco';
import { StatusPedidos } from './StatusPedidos';

class Pedido {
  ped_Id: string;
  ped_usu_id: string;
  ped_Status: StatusPedidos;
  ped_ValorTotal: number;
  ped_Ativo: boolean;
  ped_end_id: string;
  ped_Frete: number;
  ped_CriadoEm: string;
  ped_AtualizadoEm: string;

  endereco: Endereco;

  cho: ChocolatePedido[];
  car: CartaoPedido[];
  cup: CupomPedido[];

  constructor(
    ped_Id: string,
    ped_usu_id: string,
    ped_Status: StatusPedidos,
    ped_ValorTotal: number,
    ped_Ativo: boolean,
    ped_end_id: string,
    ped_Frete: number,
    ped_CriadoEm: string,
    ped_AtualizadoEm: string,
    endereco: Endereco,
    cho: ChocolatePedido[],
    car: CartaoPedido[],
    cup: CupomPedido[]
  ) {
    this.ped_Id = ped_Id;
    this.ped_usu_id = ped_usu_id;
    this.ped_Status = ped_Status;
    this.ped_ValorTotal = ped_ValorTotal;
    this.ped_Ativo = ped_Ativo;
    this.ped_end_id = ped_end_id;
    this.ped_Frete = ped_Frete;
    this.ped_CriadoEm = ped_CriadoEm;
    this.ped_AtualizadoEm = ped_AtualizadoEm;
    this.endereco = endereco;
    this.cho = cho;
    this.car = car;
    this.cup = cup;
  }
}

export { Pedido };
