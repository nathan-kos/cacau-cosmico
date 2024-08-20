import { Bandeira } from './Bandeira';

class Cartao {
  car_Id: string;
  car_Nome: string;
  car_Numero: string;
  car_Validade: string;
  car_CVV: string;
  car_usu_id: string;
  car_Bandeira: Bandeira;
  car_Ativo: boolean;
  car_CriadoEm: string;
  car_AtualizadoEm: string;

  constructor(
    car_Id: string,
    car_Nome: string,
    car_Numero: string,
    car_Validade: string,
    car_CVV: string,
    car_usu_id: string,
    car_Bandeira: Bandeira,
    car_Ativo: boolean,
    car_CriadoEm: string,
    car_AtualizadoEm: string
  ) {
    this.car_Id = car_Id;
    this.car_Nome = car_Nome;
    this.car_Numero = car_Numero;
    this.car_Validade = car_Validade;
    this.car_CVV = car_CVV;
    this.car_usu_id = car_usu_id;
    this.car_Bandeira = car_Bandeira;
    this.car_Ativo = car_Ativo;
    this.car_CriadoEm = car_CriadoEm;
    this.car_AtualizadoEm = car_AtualizadoEm;
  }
}

export { Cartao };
