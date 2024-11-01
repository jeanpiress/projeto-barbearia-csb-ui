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

export class Categoria {
  id: number = 1;
  nome: string = ' ';
}

export class Produto {
  id: number = 1;
  nome: string = ' ';
  preco: number = 0;
  precoEmPontos: number = 0;
  categoria: Categoria = new Categoria();
}
export class ProdutoId {
  id: number = 1;
}

export class ItemPedido {
  id: number = 1;
  precoUnitario: number = 0;
  precoTotal: number = 0;
  quantidade: number = 1;
  observacao: string | null = null;
  produto: Produto = new Produto();
}


export class ItemPedidoImput {
  quantidade: number = 1;
  produto: ProdutoId = new ProdutoId();
}

export class ClienteId {
  id: number = 1;
  nome: string = ' ';
}

export class ProfissionalId {
  id: number = 1;
  nome: string = ' ';
}

export class Usuario {
  id: number = 1;
  nome: string = ' ';
  permissao: string = ' ';
}

export class Pedido {
  id: number = 1;
  horario: string = '';
  itemPedidos: ItemPedido[] = [];
  statusPagamento: string = ' ';
  formaPagamento: string = ' ';
  statusPedido: string = ' ';
  cliente: Cliente = new Cliente();
  profissional: Profissional = new Profissional();
  comissaoGerada: number = 0;
  valorTotal: number = 0;
  caixaAberto: boolean = false;
  pontuacaoProfissionalGerada: number = 0;
  pontuacaoClienteGerada: number = 0;
  criadoPor: Usuario = new Usuario();
  criadoAs: string = '';
  alteradoPor: Usuario | null = null;
  modificadoAs: string | null = null;
  recebidoPor: Usuario | null = null;
  dataPagamento: string = '';
  canceladoPor: Usuario | null = null;
  canceladoAs: string | null = null;
  excluidoPor: Usuario | null = null;
  excluidoAs: string | null = null;
  inicioAtendimento: string | null = null;

}

export enum FormaPagamento {
  DINHEIRO = 'DINHEIRO',
  PIX = 'PIX',
  CREDITO = 'CREDITO',
  DEBITO = 'DEBITO',
  //PONTO = 'PONTO',
  //VOUCHER = 'VOUCHER',
  //AGUARDANDO_PAGAMENTO = 'AGUARDANDO_PAGAMENTO'
}
