class Categoria_Chocolate {
  cch_Id: string;
  cch_cho_id: string;
  cch_Categoria: string;
  cch_AtualizadoEm: Date;
  cch_CriadoEm: Date;

  constructor(
    cch_Id: string,
    cch_cho_id: string,
    cch_Categoria: string,
    cch_AtualizadoEm: Date,
    cch_CriadoEm: Date
  ) {
    this.cch_Id = cch_Id;
    this.cch_cho_id = cch_cho_id;
    this.cch_Categoria = cch_Categoria;
    this.cch_AtualizadoEm = cch_AtualizadoEm;
    this.cch_CriadoEm = cch_CriadoEm;
  }
}

export { Categoria_Chocolate };
