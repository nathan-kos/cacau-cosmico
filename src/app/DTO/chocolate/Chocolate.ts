import { Categorias } from './categorias';

class Chocolate {
  cho_Id: string;
  cho_Nome: string;
  cho_Descricao: string;
  cho_Valor: number;
  cho_Imagem: string;
  cho_Ativo: boolean;
  cho_Peso: number;
  catergorias: Categorias[];

  cho_AtualizadoEm: string;
  cho_CriadoEm: string;

  constructor(
    cho_Id: string,
    cho_Nome: string,
    cho_Descricao: string,
    cho_Valor: number,
    cho_Imagem: string,
    cho_Ativo: boolean,
    cho_Peso: number,
    catergorias: Categorias[],
    cho_AtualizadoEm: string,
    cho_CriadoEm: string
  ) {
    this.cho_Id = cho_Id;
    this.cho_Nome = cho_Nome;
    this.cho_Descricao = cho_Descricao;
    this.cho_Valor = cho_Valor;
    this.cho_Imagem = cho_Imagem;
    this.cho_Ativo = cho_Ativo;
    this.cho_Peso = cho_Peso;
    this.catergorias = catergorias;
    this.cho_AtualizadoEm = cho_AtualizadoEm;
    this.cho_CriadoEm = cho_CriadoEm;
  }
}

export { Chocolate };
