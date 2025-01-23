import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profissional, Endereco, ProfissionalInput, ocupacao } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { NotificationService } from '../../core/notification.service';
import { ProfissionalService } from '../profissional.service';
import { UsuarioService } from '../../core/usuario.service';

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

  selectedFile: File | null = null;
  usuario: any;


   constructor(
      private profissionalService: ProfissionalService,
      private notificationService: NotificationService,
      private errorHandler: ErrorHandlerService,
      private usuarioService: UsuarioService
    ){}

    ngOnInit( ) {
    }

      editar(){
        const profissionalInput = new ProfissionalInput(this.profissional);
        this.profissionalService.editarProfissional(profissionalInput, this.profissional.id).subscribe({
          next: () => {
            this.notificationService.showSuccess('Sucesso', 'Profissional Editado com sucesso!');
            if (this.selectedFile) {
              this.uploadPorProfissional();
            }
            this.resetForm();
            this.close();
          },
          error: erro => {
            this.errorHandler.handle(erro)
          }
        });
      }

      uploadPorProfissional(){
        this.usuarioService.buscarUsuario(this.profissional.id, ocupacao.PROFISSIONAL).subscribe({
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
        this.atualizarProfissionais.emit();
      }

      resetForm() {
        this.profissional = new Profissional();
      }
}
