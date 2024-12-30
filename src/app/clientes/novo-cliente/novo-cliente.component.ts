import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { ClienteService } from '../cliente.service';
import { Cliente, ClienteInput, Endereco, StatusPedido } from '../../core/model';
import { PedidoService } from '../../pedidos/pedido.service';
import { switchMap } from 'rxjs';


@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrl: './novo-cliente.component.css'
})
export class NovoClienteComponent implements OnInit{
  @Input() endereco = new Endereco();
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  cliente = new Cliente();
  clienteId: number = 0;

  constructor(
    private clienteService: ClienteService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private pedidoService: PedidoService
  ){}

  ngOnInit() {
  }

  salvar(){
    const clienteImput = new ClienteInput(this.cliente);
    clienteImput.endereco = this.endereco;
    this.clienteService.novoCliente(clienteImput).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Cliente criado com sucesso!');
        this.resetForm();
        this.close();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });
  }

  salvarClienteEAdicionarNaFila() {
    const clienteInput = new ClienteInput(this.cliente);
    clienteInput.endereco = this.endereco;

    this.clienteService.novoCliente(clienteInput).pipe(
      switchMap((response) => {
        this.clienteId = response.id;
        console.log('Cliente criado com Sucesso')
        const novoPedido = {
          cliente: { id: this.clienteId },
          profissional: { id: null }
        };

        return this.pedidoService.novoPedido(novoPedido, StatusPedido.AGUARDANDO);
      })
    ).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Pedido enviado para a fila com sucesso!');
        this.resetForm();
        this.close();
      },
      error: (erro) => {
        this.errorHandler.handle(erro);
      }
    });
  }


  close() {
    this.display = false;
    this.displayChange.emit(this.display);
    this.clienteService.pesquisarClientes(this.cliente.nome, true);
  }

  resetForm() {
    this.cliente = new Cliente();
    this.endereco = new Endereco();
  }

}
