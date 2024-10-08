import { Chocolate } from '../chocolate/Chocolate';

class ChocolatePedido {
  chp_Id: string;
  chp_ped_id: string;
  chp_cho_id: string;
  chp_Quantidade: number;

  chp_CriadoEm: string;
  chp_AtualizadoEm: string;

  chocolate: Chocolate;

  constructor(
    chp_Id: string,
    chp_ped_id: string,
    chp_cho_id: string,
    chp_Quantidade: number,
    chp_CriadoEm: string,
    chp_AtualizadoEm: string,
    chocolate: Chocolate
  ) {
    this.chp_Id = chp_Id;
    this.chp_ped_id = chp_ped_id;
    this.chp_cho_id = chp_cho_id;
    this.chp_Quantidade = chp_Quantidade;
    this.chp_CriadoEm = chp_CriadoEm;
    this.chp_AtualizadoEm = chp_AtualizadoEm;
    this.chocolate = chocolate;
  }
}

export { ChocolatePedido };
