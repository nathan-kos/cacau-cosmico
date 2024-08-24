class CreateEnderecoDTO {
  end_Rua: string;
  end_Numero: string;
  end_Bairro: string;
  end_CEP: string;
  end_UF: string;
  end_Cidade: string;
  end_Complemento: string;
  end_Tipo: string;

  constructor(
    end_Rua: string,
    end_Numero: string,
    end_Bairro: string,
    end_CEP: string,
    end_UF: string,
    end_Cidade: string,
    end_Complemento: string,
    end_Tipo: string
  ) {
    this.end_Rua = end_Rua;
    this.end_Numero = end_Numero;
    this.end_Bairro = end_Bairro;
    this.end_CEP = end_CEP;
    this.end_UF = end_UF;
    this.end_Cidade = end_Cidade;
    this.end_Complemento = end_Complemento;
    this.end_Tipo = end_Tipo;
  }
}
