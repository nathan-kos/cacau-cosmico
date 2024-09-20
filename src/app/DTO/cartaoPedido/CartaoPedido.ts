import { Cartao } from '../cartao/Cartão';

class CartaoPedido {
  cap_Id: string;
  cap_ped_id: string;
  cap_car_id: string;
  cap_Valor: number;
  cap_CriadoEm: string;
  cap_AtualizadoEm: string;

  cartao: Cartao;

  constructor(
    cap_Id: string,
    cap_ped_id: string,
    cap_car_id: string,
    cap_Valor: number,
    cap_CriadoEm: string,
    cap_AtualizadoEm: string,
    cartao: Cartao
  ) {
    this.cap_Id = cap_Id;
    this.cap_ped_id = cap_ped_id;
    this.cap_car_id = cap_car_id;
    this.cap_Valor = cap_Valor;
    this.cap_CriadoEm = cap_CriadoEm;
    this.cap_AtualizadoEm = cap_AtualizadoEm;
    this.cartao = cartao;
  }
}

export { CartaoPedido };
