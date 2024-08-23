import { BuscaProfissionaisComponent } from './../busca-profissionais/busca-profissionais.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Endereco, Profissional, ProfissionalInput } from '../../core/model';
import { ProfissionalService } from '../profissional.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { FormatoDataService } from '../../core/formato-data.service';
import { NotificationService } from '../../core/notification.service';

@Component({
  selector: 'app-novo-profissional',
  templateUrl: './novo-profissional.component.html',
  styleUrl: './novo-profissional.component.css'
})
export class NovoProfissionalComponent {
  @Input() profissional = new Profissional();
  @Input() endereco = new Endereco();
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

  salvar(){
    this.profissional.dataNascimento = this.profissional.dataNascimento.substring(0, 10) + 'T13:00:00-03:00';
    this.profissional.endereco = this.endereco;
    const profissionalInput = new ProfissionalInput(this.profissional);
    console.log(ProfissionalInput)
    this.profissionalService.novoProfissional(profissionalInput).subscribe({
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
