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

  ngOnInit(  ) {
  }

  salvar(){
    this.cliente.dataNascimento = this.cliente.dataNascimento.substring(0, 10) + 'T13:00:00-03:00';
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
    this.clienteService.pesquisar(this.cliente.nome);
  }

  resetForm() {
    this.cliente = new Cliente();
  }

}
