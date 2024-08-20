import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { FormatoDataService } from '../../core/formato-data.service';
import { Cliente, ClienteInput } from '../../core/model';
import { NotificationService } from '../../core/notification.service';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-clientes-editar-modal',
  templateUrl: './clientes-editar-modal.component.html',
  styleUrl: './clientes-editar-modal.component.css'
})
export class ClientesEditarModalComponent {
  @Input() cliente: any = new Cliente();
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  constructor(
    private clienteService: ClienteService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService
  ){}
  ngOnInit() {}

  salvar(){
    const clienteImput = new ClienteInput(this.cliente);
    console.log(clienteImput.dataNascimento);
    this.clienteService.editarCliente(this.cliente.id, clienteImput).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Cliente editado com sucesso!');
        console.log(this.cliente);
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
  }
}
