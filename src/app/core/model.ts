export class Endereco {
  cep: string = ' ';
  logradouro: string = ' ';
  numero: string = ' ';
  complemento: string = ' ';
  bairro: string = ' ';
}

export class Profissional {
  id: number = 1;
  nome: string = ' ';
  nomeExibicao: string = ' ';
  celular: string = ' ';
  cpf: string = ' ';
  dataNascimento: string = ' ';
  salarioFixo: any;
  diaPagamento: number = 0;
  ativo: boolean = true;
  endereco: Endereco = new Endereco();
}

export class ProfissionalInput {
  nome: string;
  nomeExibicao: string;
  celular: string;
  cpf?: string | null;
  dataNascimento?: string | null;
  salarioFixo?: number | null;
  diaPagamento?: number | null;
  endereco?: {
    cep?: string | null;
    logradouro?: string | null;
    numero?: string | null;
    complemento?: string | null;
    bairro?: string | null;
  } | null;

  constructor(profissional: Profissional) {
    this.nome = profissional.nome;
    this.nomeExibicao = profissional.nomeExibicao;
    this.celular = profissional.celular.replace(/[^0-9]/g, ''); // Remove máscara do celular
    this.cpf = profissional.cpf ? profissional.cpf.replace(/[^0-9]/g, '') : null; // Remove máscara do CPF
    this.dataNascimento = profissional.dataNascimento || null;
    this.salarioFixo = profissional.salarioFixo || null;
    this.diaPagamento = profissional.diaPagamento || null;
    this.endereco = profissional.endereco ? {
      cep: profissional.endereco.cep ? profissional.endereco.cep.replace(/[^0-9]/g, '') : null, // Remove máscara do CEP ou null
      logradouro: profissional.endereco.logradouro || null,
      numero: profissional.endereco.numero || null,
      complemento: profissional.endereco.complemento || null,
      bairro: profissional.endereco.bairro || null
    } : null;
  }
}


export class Cliente {
  id: number = 1;
  nome: string = ' ';
  celular: string = ' ';
  dataNascimento: string = ' ';
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
    this.dataNascimento = cliente?.dataNascimento ?? '';
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

export class Pedido {
  nome: string = ' ';
}




