import { cupom } from '../Cupom/cupom';

class CupomPedido {
  pcu_Id: string;
  pcu_ped_id: string;
  pcu_cup_id: string;
  pcu_CriadoEm: string;
  pcu_AtualizadoEm: string;

  cupom: cupom;

  constructor(
    pcu_Id: string,
    pcu_ped_id: string,
    pcu_cup_id: string,
    pcu_CriadoEm: string,
    pcu_AtualizadoEm: string,
    cupom: cupom
  ) {
    this.pcu_Id = pcu_Id;
    this.pcu_ped_id = pcu_ped_id;
    this.pcu_cup_id = pcu_cup_id;
    this.pcu_CriadoEm = pcu_CriadoEm;
    this.pcu_AtualizadoEm = pcu_AtualizadoEm;
    this.cupom = cupom;
  }
}

export { CupomPedido };
