class CreateTrocaDevolucao {
  tde_cho_ped_id: string;

  tde_Troca: boolean;

  tde_Quantidade: number;

  constructor(
    tde_cho_ped_id: string,
    tde_Troca: boolean,
    tde_Quantidade: number
  ) {
    this.tde_cho_ped_id = tde_cho_ped_id;
    this.tde_Troca = tde_Troca;
    this.tde_Quantidade = tde_Quantidade;
  }
}

export { CreateTrocaDevolucao };
