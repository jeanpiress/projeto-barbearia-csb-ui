import { ProfissionalUsuarioInput } from './../../core/model';
import { BuscaProfissionaisComponent } from './../busca-profissionais/busca-profissionais.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Endereco, ocupacao, Profissional, ProfissionalInput, UsuarioInput } from '../../core/model';
import { ProfissionalService } from '../profissional.service';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { UsuarioService } from '../../core/usuario.service';

@Component({
  selector: 'app-novo-profissional',
  templateUrl: './novo-profissional.component.html',
  styleUrl: './novo-profissional.component.css'
})
export class NovoProfissionalComponent {
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  profissional: any = new Profissional();
  selectedFile: File | null = null;
  usuario: any;
  usuarioInput: any = new UsuarioInput({});


  constructor(
    private profissionalService: ProfissionalService,
    private notificationService: NotificationService,
    private errorHandler: ErrorHandlerService,
    private buscaProfissionais: BuscaProfissionaisComponent,
    private usuarioService: UsuarioService
  ){}

  ngOnInit( ) {
  }

  salvar(){
    const profissionalInput = new ProfissionalInput(this.profissional);
    const profissionalUsuarioInput = new ProfissionalUsuarioInput();
    this.usuarioInput.nome = this.profissional.nome;
    profissionalUsuarioInput.profissional = profissionalInput;
    profissionalUsuarioInput.usuario = this.usuarioInput;

    console.log(profissionalUsuarioInput);
    this.profissionalService.novoProfissional(profissionalUsuarioInput).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Sucesso', 'Profissional criado com sucesso!');
        if (this.selectedFile) {
          this.uploadPorProfissional(response.id);
        }
        this.resetForm();
        this.close();
      },
      error: erro => {
        this.errorHandler.handle(erro)
      }
    });
  }

  uploadPorProfissional(profissionalId: number){
    this.usuarioService.buscarUsuario(profissionalId, ocupacao.PROFISSIONAL).subscribe({
      next:(usuario) => {
        this.usuario = usuario;
        this.onUpload(this.selectedFile!, this.usuario.id);
      },
      error: erro => console.error('Erro ao buscar usuario', erro)
    });
  }

  onFileSelected(event: any): void {
    const files = event.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      console.log('Arquivo selecionado:', this.selectedFile);
    } else {
      console.error('Nenhum arquivo foi selecionado.');
    }
  }

  onUpload(file: File, usuarioId: number): void {
    this.usuarioService.uploadFotoUsuario(usuarioId, file).subscribe({
      next: () => console.log('Foto enviada com sucesso!'),
      error: (err) => console.error('Erro ao enviar a foto', err)
    });
  }

  close() {
    this.display = false;
    this.displayChange.emit(this.display);
    this.buscaProfissionais.pesquisarProfissionais();
  }

  resetForm() {
    this.profissional = new Profissional();
    this.usuarioInput = new UsuarioInput({});
  }
}
