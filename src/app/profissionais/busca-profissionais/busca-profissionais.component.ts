import { Component, OnInit } from '@angular/core';
import { ProfissionalService } from '../profissional.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';


@Component({
  selector: 'app-busca-profissionais',
  templateUrl: './busca-profissionais.component.html',
  styleUrl: './busca-profissionais.component.css'
})
export class BuscaProfissionaisComponent implements OnInit{

  profissionais = [];
  isAtivo: string = 'ativos';
  displayNovoProfissional: boolean = false;
  selectedProfissional: any = null;

  constructor(
    private profissionalService: ProfissionalService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService) {}


  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.profissionalService.pesquisarProfissionais(this.isAtivo).subscribe(profissionais => this.profissionais = profissionais);
  }

  ativarDesativar(profissionalId: any){
    this.profissionalService.ativarInativar(this.isAtivo, profissionalId).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Profissional alterado com sucesso!');
        this.pesquisar();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

  modalNovoProfissional(profissional: any) {
    this.displayNovoProfissional = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedProfissional = profissional;
      this.displayNovoProfissional  = true;
    }, 0);
  }

  toggleAtivo() {
    this.isAtivo = this.isAtivo === 'ativos' ? 'inativos' : 'ativos';
    this.pesquisar();
  }
}
