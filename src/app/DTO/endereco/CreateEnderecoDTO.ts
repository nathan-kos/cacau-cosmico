import { Tipo } from './Tipo';
import { UF } from './UF';

class CreateEnderecoDTO {
  end_Rua: string;
  end_Numero: string;
  end_Bairro: string;
  end_CEP: string;
  end_UF: UF;
  end_Cidade: string;
  end_Complemento: string | undefined;
  end_Tipo: Tipo;

  constructor(
    end_Rua: string,
    end_Numero: string,
    end_Bairro: string,
    end_CEP: string,
    end_UF: UF,
    end_Cidade: string,
    end_Tipo: Tipo,
    end_Complemento?: string
  ) {
    this.end_Rua = end_Rua;
    this.end_Numero = end_Numero;
    this.end_Bairro = end_Bairro;
    this.end_CEP = end_CEP;
    this.end_UF = end_UF;
    this.end_Cidade = end_Cidade;
    this.end_Tipo = end_Tipo;

    if (end_Complemento) {
      this.end_Complemento = end_Complemento;
    }
  }
}

export { CreateEnderecoDTO };
