import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { ClienteService } from '../cliente.service';
import { Cliente, ClienteInput, Endereco } from '../../core/model';


@Component({
  selector: 'app-novo-cliente',
  templateUrl: './novo-cliente.component.html',
  styleUrl: './novo-cliente.component.css'
})
export class NovoClienteComponent implements OnInit{
  @Input() cliente = new Cliente();
  @Input() endereco = new Endereco();
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  constructor(
    private clienteService: ClienteService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService
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
