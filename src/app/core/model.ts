export class Endereco {
  cep: string = ' ';
  logradouro: string = ' ';
  numero: string = ' ';
  complemento: string = ' ';
  bairro: string = ' ';
}

export class Profissional {
  nome: string = ' ';
  nomeExibicao: string = ' ';
  celular: string = ' ';
  cpf: string = ' ';
  dataNascimento: Date = new Date();
  salarioFixo: number = 0;
  diaPagamento: number = 0;
  ativo: boolean = true;
  endereco: Endereco = new Endereco();
}

export class Cliente {
  nome: string = ' ';
  celular: string = ' ';
  dataNascimento: Date = new Date();
  observacao: string = ' ';
  diasRetorno: number = 30;
  endereco: Endereco = new Endereco();
}

export class ClienteInput {
  nome: string;
  celular: string;
  dataNascimento: Date;
  observacao: string;
  diasRetorno: number;
  endereco: Endereco;

  constructor(cliente: any) {
    this.nome = cliente?.nome ?? '';
    this.celular = cliente?.celular ?? '';
    this.dataNascimento = cliente?.dataNascimento ? new Date(cliente.dataNascimento) : new Date();
    this.observacao = cliente?.observacao ?? '';
    this.diasRetorno = cliente?.diasRetorno ?? 30;

    this.endereco = {
      cep: cliente?.endereco?.cep ?? '',
      logradouro: cliente?.endereco?.logradouro ?? '',
      numero: cliente?.endereco?.numero ?? '',
      complemento: cliente?.endereco?.complemento ?? '',
      bairro: cliente?.endereco?.bairro ?? ''
    };
  }
}





