import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profissional, Endereco, ProfissionalInput } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { BuscaProfissionaisComponent } from '../busca-profissionais/busca-profissionais.component';
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


   constructor(
      private profissionalService: ProfissionalService,
      private notificationService: NotificationService,
      private errorHandler: ErrorHandlerService,
      private buscaProfissionais: BuscaProfissionaisComponent
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
        this.buscaProfissionais.pesquisar();
      }

      resetForm() {
        this.profissional = new Profissional();
      }
}
