class cupom {
  cup_Id: string;
  cup_Codigo: string;
  cup_Valor: number;
  cup_Ativo: boolean;
  cup_tde_id: string;

  cup_CriadoEm: string;
  cup_AtualizadoEm: string;

  constructor(
    cup_Id: string,
    cup_Codigo: string,
    cup_Valor: number,
    cup_Ativo: boolean,
    cup_tde_id: string,
    cup_CriadoEm: string,
    cup_AtualizadoEm: string
  ) {
    this.cup_Id = cup_Id;
    this.cup_Codigo = cup_Codigo;
    this.cup_Valor = cup_Valor;
    this.cup_Ativo = cup_Ativo;
    this.cup_tde_id = cup_tde_id;
    this.cup_CriadoEm = cup_CriadoEm;
    this.cup_AtualizadoEm = cup_AtualizadoEm;
  }
}

export { cupom };
