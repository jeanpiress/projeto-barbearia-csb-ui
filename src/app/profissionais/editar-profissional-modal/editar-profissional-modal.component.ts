import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profissional, Endereco, ProfissionalInput } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { ProfissionalService } from '../profissional.service';

@Component({
  selector: 'app-editar-profissional-modal',
  templateUrl: './editar-profissional-modal.component.html',
  styleUrl: './editar-profissional-modal.component.css'
})
export class EditarProfissionalModalComponent implements OnInit{
  @Input() profissional: Profissional = new Profissional();
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() atualizarProfissionais = new EventEmitter<void>();


   constructor(
      private profissionalService: ProfissionalService,
      private notificationService: NotificationService,
      private errorHandler: ErrorHandlerService,
    ){}

    ngOnInit( ) {
    }

      editar(){
        const profissionalInput = new ProfissionalInput(this.profissional);
        this.profissionalService.editarProfissional(profissionalInput, this.profissional.id).subscribe({
          next: () => {
            this.notificationService.showSuccess('Sucesso', 'Profissional criado com sucesso!');
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
        this.atualizarProfissionais.emit();
      }

      resetForm() {
        this.profissional = new Profissional();
      }
}
