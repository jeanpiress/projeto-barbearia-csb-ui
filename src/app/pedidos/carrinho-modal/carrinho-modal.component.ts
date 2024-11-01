import { ItemPedido, Produto } from './../../core/model';
import { ItemService } from './../../itens/item.service';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { Categoria, Pedido } from '../../core/model';
import { map } from 'rxjs';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'app-carrinho-modal',
  templateUrl: './carrinho-modal.component.html',
  styleUrls: ['./carrinho-modal.component.css']
})
export class CarrinhoModalComponent implements OnInit {
  @Input() display: boolean = false;
  @Input() pedido: any = new Pedido();
  @Output() displayChange = new EventEmitter<boolean>();

  categorias: any[] = [];
  produtos: Produto[] = [];

  categoriaSelecionada: any;
  produtosSelecionados: any[] = [];

  constructor(private pedidoService: PedidoService,
              private itemService: ItemService) {}

  ngOnInit(): void {
    this.carregarCategorias();
    this.atualizarCarrinho();
  }

  carregarCategorias() {
    this.itemService.pesquisarCategorias()
      .pipe(
        map((categorias: Categoria[]) =>
          categorias.map(categoria => ({ label: categoria.nome, value: categoria.id }))
        )
      )
      .subscribe(categoriasFormatadas => {
        this.categorias = categoriasFormatadas;
        console.log('Categorias carregadas:', this.categorias);

        this.categoriaSelecionada = this.categorias.find(categoria => categoria.value === 1);

        if (this.categoriaSelecionada) {
          this.itemService.pesquisarProduto(this.categoriaSelecionada.value)
            .subscribe(produtos => {
              this.produtos = produtos;
              console.log('Produtos carregados:', this.produtos);
            });
        }
      });
  }


  carregarProdutos(event: DropdownChangeEvent) {
    if (this.categoriaSelecionada) {
      this.itemService.pesquisarProduto(this.categoriaSelecionada.value)
        .subscribe(produtos => {
          this.produtos = produtos;
          console.log('Produtos carregados:', this.produtos);
        });
    }
  }

  buscarPedidoId(pedidoId: string): void {
    this.pedidoService.buscarPedidoporId(pedidoId).subscribe({
      next: (pedido: Pedido) => {
        this.pedido = pedido;
        this.atualizarCarrinho();
        console.log('Pedido carregado:', this.pedido);
      },
      error: (erro) => {
        console.error('Erro ao buscar pedido:', erro);
      }
    });
  }

  adicionarAoCarrinho(produto: Produto): void {
    const pedidoAtual: ItemPedido[] = this.pedido.itemPedidos;

    const itemExistente: ItemPedido | undefined = pedidoAtual.find(item => item.produto.id === produto.id);

    if (itemExistente) {
      itemExistente.quantidade += 1;

      itemExistente.precoTotal = itemExistente.quantidade * itemExistente.precoUnitario;

      const itemSelecionado: ItemPedido | undefined = this.produtosSelecionados.find(item => item.produto.id === produto.id);
      if (itemSelecionado) {
        itemSelecionado.quantidade = itemExistente.quantidade;
        itemSelecionado.precoTotal = itemExistente.precoTotal;
      }

      console.log('Quantidade aumentada para o produto:', produto);
    } else {
      const novoItem: ItemPedido = {
        id: 0,
        produto: produto,
        quantidade: 1,
        precoUnitario: produto.preco,
        observacao: '',
        precoTotal: produto.preco
      };

      this.pedido.itemPedidos.push(novoItem);
      this.produtosSelecionados.push(novoItem);

      console.log('Produto adicionado ao pedido:', produto);
    }

    this.atualizarCarrinho();
  }


 atualizarCarrinho(): void {
  this.produtosSelecionados = this.pedido.itemPedidos.map((item: ItemPedido) => ({
    id: item.id,
    produto: item.produto,
    quantidade: item.quantidade,
    observacao: item.observacao,
    precoTotal: item.precoTotal
  }));
}


  atualizarQuantidade(item: any) {
    if (item.quantidade <= 0) {
      this.removerProduto(item);
    }
  }

  removerProduto(item: ItemPedido): void {
    const index = this.produtosSelecionados.findIndex(
      (prodSelecionado) => prodSelecionado.produto.id === item.produto.id
    );

    if (index > -1) {
      this.produtosSelecionados.splice(index, 1);
    }

    const indexPedido = this.pedido.itemPedidos.findIndex(
      (pedidoItem: { produto: { id: number; }; }) => pedidoItem.produto.id === item.produto.id
    );

    if (indexPedido > -1) {
      this.pedido.itemPedidos.splice(indexPedido, 1);
    }

    console.log('Produto removido do carrinho:', item);
    this.atualizarCarrinho();
  }

  calcularTotal(): number {
    return this.produtosSelecionados.reduce(
      (total, item) => total + (item.produto.preco * item.quantidade), 0
    );
  }

  finalizarCompra() {
    this.fechar();
  }


  fechar() {
    this.display = false;
    this.adicionarItensAoPedido();
    this.displayChange.emit(this.display);
  }

  adicionarItensAoPedido(): void {
    const itensPedidos: ItemPedido[] = this.pedido.itemPedidos;
    itensPedidos.forEach(item => {const itemPedidoInput = {
            quantidade: item.quantidade,
            produto: {
                id: item.produto.id
            }
        };
        this.itemService.criarItemPedido(itemPedidoInput).subscribe({
            next: (itemPedidoCriado: any) => {
                this.pedidoService.adicionarItemPedidoAoPedido(this.pedido.id, itemPedidoCriado.id).subscribe({
                    next: () => {
                        console.log(`Item ${itemPedidoCriado.id} adicionado ao pedido ${this.pedido.id}`);
                    },
                    error: (erro) => {
                        console.error('Erro ao adicionar item ao pedido:', erro);
                    }
                });
            },
            error: (erro) => {
                console.error('Erro ao criar item pedido:', erro);
            }
        });
    });
  }

  aumentarQuantidade(produto: Produto): void {
    const itemExistente = this.pedido.itemPedidos.find((item: ItemPedido) => item.produto.id === produto.id)!;

    itemExistente.quantidade++;
    itemExistente.precoTotal = itemExistente.quantidade * itemExistente.precoUnitario;

    const itemSelecionado = this.produtosSelecionados.find((item: ItemPedido) => item.produto.id === produto.id);
    itemSelecionado!.quantidade = itemExistente.quantidade;
    itemSelecionado!.precoTotal = itemExistente.precoTotal;

    console.log('Quantidade aumentada para o produto:', produto);
    this.atualizarCarrinho();
  }



  diminuirQuantidade(produto: Produto): void {
    const itemExistente = this.pedido.itemPedidos.find((item: ItemPedido) => item.produto.id === produto.id)!;
    itemExistente.quantidade--;
    itemExistente.precoTotal = itemExistente.quantidade * itemExistente.precoUnitario;

    if (itemExistente.quantidade === 0) {
      this.pedido.itemPedidos = this.pedido.itemPedidos.filter((item: ItemPedido) => item.produto.id !== produto.id);
      this.produtosSelecionados = this.produtosSelecionados.filter((item: ItemPedido) => item.produto.id !== produto.id);
      console.log('Produto removido do carrinho:', produto);
    } else {
      const itemSelecionado = this.produtosSelecionados.find((item: ItemPedido) => item.produto.id === produto.id);
      itemSelecionado!.quantidade = itemExistente.quantidade;
      itemSelecionado!.precoTotal = itemExistente.precoTotal;
    }

    this.atualizarCarrinho();
    console.log('Quantidade diminuída para o produto:', produto);
  }





}
