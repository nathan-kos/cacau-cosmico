class UpdateUsuario {
  usu_Id: string;
  usu_Nome: string;
  usu_Email: string;
  usu_Ativo: boolean;

  constructor(
    usu_Id: string,
    usu_Nome: string,
    usu_Email: string,
    usu_Ativo: boolean
  ) {
    this.usu_Id = usu_Id;
    this.usu_Nome = usu_Nome;
    this.usu_Email = usu_Email;
    this.usu_Ativo = usu_Ativo;
  }
}
