import { Component, EventEmitter, Input, Output } from '@angular/core';
import { map } from 'rxjs';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Pedido, Profissional } from '../../core/model';
import { NotificationService } from '../../core/notification.service';
import { ProfissionalService } from '../../profissionais/profissional.service';
import { AtendimentoComponent } from '../atendimento/atendimento.component';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-alterar-profissional-modal',
  templateUrl: './alterar-profissional-modal.component.html',
  styleUrl: './alterar-profissional-modal.component.css'
})
export class AlterarProfissionalModalComponent {
  @Input() pedido: any = new Pedido();
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  nomeClienteBusca: string = '';
  clientes: any[] = [];
  clienteSelecionado: any;
  profissionais: any[] = [];
  profissionalSelecionado: any;


  constructor(
    private pedidoService: PedidoService,
    private profissionalService: ProfissionalService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private atendimentoComponent: AtendimentoComponent
  ){}
  ngOnInit() {
    this.carregarProfissionais();
   }

  carregarProfissionais() {
    this.profissionalService.pesquisar('ativos')
      .pipe(
        map((profissionais: Profissional[]) =>
          profissionais.map(profissional => ({ label: profissional.nome, value: profissional.id }))
        )
      )
      .subscribe(profissionaisFormatados => {
        this.profissionais = profissionaisFormatados;
      });

  }

  alterarProfissional() {
    if (!this.profissionalSelecionado || !this.pedido) {
      this.notificationService.showError('Erro', 'Profissional ou pedido não selecionado');
      return;
    }
    console.log(this.profissionalSelecionado.value)

    this.pedidoService.alterarProfissional(this.pedido.id, this.profissionalSelecionado.value).subscribe({
      next: () => {
        this.notificationService.showSuccess('Sucesso', 'Profissional alterado com sucesso!');
        this.atendimentoComponent.pesquisarPedidosAgurdando();
        this.atendimentoComponent.pesquisarPedidosEmAtendimento();
        this.close();
      },
      error: erro => {
        this.errorHandler.handle(erro);
      }
    });
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
  }
}
