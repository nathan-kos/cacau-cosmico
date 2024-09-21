class CreatePedidoDTO {
  usu_Id: string;
  end_Id: string;
  frete: number;
  cartoes: { car_Id: string; car_Valor: number }[];
  chocolates: { cho_Id: string; quantidade: number }[];
  cupons: { cup_Id: string }[];

  constructor(
    usu_Id: string,
    end_Id: string,
    frete: number,
    cartoes: { car_Id: string; car_Valor: number }[],
    chocolates: { cho_Id: string; quantidade: number }[],
    cupons: { cup_Id: string }[]
  ) {
    this.usu_Id = usu_Id;
    this.end_Id = end_Id;
    this.frete = frete;
    this.cartoes = cartoes;
    this.chocolates = chocolates;
    this.cupons = cupons;
  }
}

export { CreatePedidoDTO };
