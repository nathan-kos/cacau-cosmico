import { TrocaDevolucaoStatus } from './TrocaDevolucaoStatus';

class TrocaDevolucao {
  tde_Id: string;

  tde_cho_ped_id: string;

  tde_Troca: boolean;

  tde_Quantidade: number;

  tde_Status: TrocaDevolucaoStatus;

  tde_CriadoEm: string;

  tde_AtualizadoEm: string;

  constructor(
    tde_Id: string,
    tde_cho_ped_id: string,
    tde_Troca: boolean,
    tde_Quantidade: number,
    tde_Status: TrocaDevolucaoStatus,
    tde_CriadoEm: string,
    tde_AtualizadoEm: string
  ) {
    this.tde_Id = tde_Id;
    this.tde_cho_ped_id = tde_cho_ped_id;
    this.tde_Troca = tde_Troca;
    this.tde_Quantidade = tde_Quantidade;
    this.tde_Status = tde_Status;
    this.tde_CriadoEm = tde_CriadoEm;
    this.tde_AtualizadoEm = tde_AtualizadoEm;
  }
}

export { TrocaDevolucao };
