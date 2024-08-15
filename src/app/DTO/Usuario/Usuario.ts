class Usuario {
  usu_Id: string;
  usu_Nome: string;
  usu_Email: string;
  usu_Senha: string;
  usu_Telefone: string;
  usu_CPF: string;
  usu_Nasc: string;
  usu_pap: string;
  usu_Ativo: boolean;
  usu_Genero: string;
  usu_CriadoEm: string;
  usu_AtualizadoEm: string;

  constructor(
    usu_Id: string,
    usu_Nome: string,
    usu_Email: string,
    usu_Senha: string,
    usu_Telefone: string,
    usu_CPF: string,
    usu_Nasc: string,
    usu_pap: string,
    usu_Ativo: boolean,
    usu_Genero: string,
    usu_CriadoEm: string,
    usu_AtualizadoEm: string
  ) {
    this.usu_Id = usu_Id;
    this.usu_Nome = usu_Nome;
    this.usu_Email = usu_Email;
    this.usu_Senha = usu_Senha;
    this.usu_Telefone = usu_Telefone;
    this.usu_CPF = usu_CPF;
    this.usu_Nasc = usu_Nasc;
    this.usu_pap = usu_pap;
    this.usu_Ativo = usu_Ativo;
    this.usu_Genero = usu_Genero;
    this.usu_CriadoEm = usu_CriadoEm;
    this.usu_AtualizadoEm = usu_AtualizadoEm;
  }
}

export { Usuario };
