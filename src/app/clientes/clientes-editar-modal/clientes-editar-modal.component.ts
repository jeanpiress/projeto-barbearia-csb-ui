import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Cliente, ClienteInput, Endereco } from '../../core/model';
import { NotificationService } from '../../core/notification.service';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-clientes-editar-modal',
  templateUrl: './clientes-editar-modal.component.html',
  styleUrl: './clientes-editar-modal.component.css'
})
export class ClientesEditarModalComponent {
  @Input() cliente: any = new Cliente();
  @Input() endereco: any = new Endereco();
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  dataNascimento = new Date();

  constructor(
    private clienteService: ClienteService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService
  ){}
  ngOnInit() {

   }

  salvar(){
    const clienteInput = new ClienteInput(this.cliente);
    clienteInput.endereco = this.endereco;
    clienteInput.celular = this.limparMascara(this.cliente.celular);
    this.clienteService.editarCliente(this.cliente.id, clienteInput).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Cliente editado com sucesso!');
        this.close();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });
  }

  limparMascara(celular: string): string {
    return celular.replace(/[\s()-]/g, '');
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
