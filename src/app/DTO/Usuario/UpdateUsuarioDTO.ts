class UpdateUsuario {
  usu_Nome: string;
  usu_Email: string;
  usu_Ativo: boolean;
  usu_Telefone: string;

  constructor(
    usu_Id: string,
    usu_Nome: string,
    usu_Email: string,
    usu_Ativo: boolean,
    usu_Telefone: string
  ) {
    this.usu_Nome = usu_Nome;
    this.usu_Email = usu_Email;
    this.usu_Ativo = usu_Ativo;
    this.usu_Telefone = usu_Telefone;
  }
}

export { UpdateUsuario };
