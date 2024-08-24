import { Bandeira } from './Bandeira';

class CreateCartDTO {
  car_Nome: string;
  car_Numero: string;
  car_Validade: string;
  car_CVV: string;
  car_Bandeira: Bandeira;

  constructor(
    car_Nome: string,
    car_Numero: string,
    car_Validade: string,
    car_CVV: string,
    car_Bandeira: Bandeira
  ) {
    this.car_Nome = car_Nome;
    this.car_Numero = car_Numero;
    this.car_Validade = car_Validade;
    this.car_CVV = car_CVV;
    this.car_Bandeira = car_Bandeira;
  }
}

export { CreateCartDTO };
