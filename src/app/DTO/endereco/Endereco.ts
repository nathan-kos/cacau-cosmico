import { Tipo } from './Tipo';
import { UF } from './UF';

class Endereco {
  end_Id: string;
  end_Rua: string;
  end_Numero: string;
  end_Bairro: string;
  end_CEP: string;
  end_Complemento: string;
  end_Cidade: string;
  end_Tipo: Tipo;
  end_usu_id: string;
  end_UF: UF;
  end_Ativo: boolean;
  end_CriadoEm: string;
  end_AtualizadoEm: string;

  constructor(
    end_Id: string,
    end_Rua: string,
    end_Numero: string,
    end_Bairro: string,
    end_CEP: string,
    end_Complemento: string,
    end_Cidade: string,
    end_Tipo: Tipo,
    end_usu_id: string,
    end_UF: UF,
    end_Ativo: boolean,
    end_CriadoEm: string,
    end_AtualizadoEm: string
  ) {
    this.end_Id = end_Id;
    this.end_Rua = end_Rua;
    this.end_Numero = end_Numero;
    this.end_Bairro = end_Bairro;
    this.end_CEP = end_CEP;
    this.end_Complemento = end_Complemento;
    this.end_Cidade = end_Cidade;
    this.end_Tipo = end_Tipo;
    this.end_usu_id = end_usu_id;
    this.end_UF = end_UF;
    this.end_Ativo = end_Ativo;
    this.end_CriadoEm = end_CriadoEm;
    this.end_AtualizadoEm = end_AtualizadoEm;
  }
}

export { Endereco };
