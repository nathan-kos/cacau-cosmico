import { TrocaDevolucaoStatus } from './TrocaDevolucaoStatus';

class CreateTrocaDevolucao {
  tde_cho_ped_id: string;

  tde_Troca: boolean;

  tde_Quantidade: number;

  tde_Status: TrocaDevolucaoStatus;

  constructor(
    tde_cho_ped_id: string,
    tde_Troca: boolean,
    tde_Quantidade: number,
    tde_Status: TrocaDevolucaoStatus
  ) {
    this.tde_cho_ped_id = tde_cho_ped_id;
    this.tde_Troca = tde_Troca;
    this.tde_Quantidade = tde_Quantidade;
    this.tde_Status = tde_Status;
  }
}

export { CreateTrocaDevolucao };
