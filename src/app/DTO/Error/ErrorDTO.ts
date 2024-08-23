class ErrorDTO {
  mensagem: string;
  code: number;

  constructor(mensagem: string, code: number) {
    this.mensagem = mensagem;
    this.code = code;
  }
}

export { ErrorDTO };
