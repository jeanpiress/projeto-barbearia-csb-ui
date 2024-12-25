import { Component, OnInit } from '@angular/core';
import { ProfissionalService } from '../profissional.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-busca-profissionais',
  templateUrl: './busca-profissionais.component.html',
  styleUrl: './busca-profissionais.component.css'
})
export class BuscaProfissionaisComponent implements OnInit{

  profissionais = [];
  isAtivo: boolean = true;
  displayNovoProfissional: boolean = false;
  displayEditarProfissional: boolean = false;
  selectedProfissional: any = null;
  ativoInativo = 'ativos';
  constructor(
    private profissionalService: ProfissionalService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private confirmation: ConfirmationService) {}


  ngOnInit() {
    this.pesquisar();
  }

  pesquisar() {
    this.profissionalService.pesquisarProfissionais(this.ativoInativo).subscribe(profissionais => this.profissionais = profissionais);
  }

  confirmarAtivacaoDesativacao(profissionalId: any) {
    const ativarDesativar = this.isAtivo ? 'desativar' : 'ativar';
    this.confirmation.confirm({
      message: `Tem certeza que deseja ${ativarDesativar} este Profissional?`,
      accept: () => {
        this.ativarDesativar(profissionalId);
      }
    });
  }

  ativarDesativar(profissionalId: any){
    const ativadoDesativado = this.isAtivo ? 'desativado' : 'ativado';
    this.profissionalService.ativarInativar(this.ativoInativo, profissionalId).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', `Profissional ${ativadoDesativado} com sucesso!`);
        this.pesquisar();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

  modalNovoProfissional() {
    this.displayNovoProfissional = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.displayNovoProfissional  = true;
    }, 0);
  }

  editarProfissional(profissional: any) {
    this.displayEditarProfissional = false;
    this.notificationService.hideNavBar(true);
    setTimeout(() => {
      this.selectedProfissional = profissional;
      this.displayEditarProfissional  = true;
    }, 0);
  }

  toggleAtivo() {
    this.isAtivo = !this.isAtivo;
    this.ativoInativo = this.isAtivo ? 'ativos' : 'inativos';

    this.pesquisar();
  }
}
