class CreateUserDTO {
  usu_Nome: string;
  usu_Email: string;
  usu_Senha: string;
  usu_CPF: string;
  usu_Nasc: string;
  usu_Genero: string;
  usu_Telefone: string;
  usu_pap: string;

  constructor(
    usu_Nome: string,
    usu_Email: string,
    usu_Senha: string,
    usu_CPF: string,
    usu_Nasc: string,
    usu_Genero: string,
    usu_Telefone: string,
    usu_pap: string
  ) {
    this.usu_Nome = usu_Nome;
    this.usu_Email = usu_Email;
    this.usu_Senha = usu_Senha;
    this.usu_CPF = usu_CPF;
    this.usu_Nasc = usu_Nasc;
    this.usu_Genero = usu_Genero;
    this.usu_Telefone = usu_Telefone;
    this.usu_pap = usu_pap;
  }
}

export { CreateUserDTO };
