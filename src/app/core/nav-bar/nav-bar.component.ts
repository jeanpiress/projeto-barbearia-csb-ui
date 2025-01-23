import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { AuthService } from '../../seguranca/auth.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  exibindoMenu: boolean = false;
  exibindoRelatorios: boolean = false;
  fotoUsuarioUrl: any = null;
  semFotoUsuarioUrl: any = 'https://csb-cansei-ser-barbeiro-dev.s3.us-east-2.amazonaws.com/Sem_imagem.jpg';

  constructor(private notificationService: NotificationService,
              public auth: AuthService,
              private router: Router,
              private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.notificationService.hideNavBar$.subscribe(hide => {
      if (hide) {
        this.exibindoMenu = false;
      }
      this.carregarFotoUsuario();
    });
  }

  carregarFotoUsuario(): void {
    const usarioId = this.auth.usuarioId();
    this.usuarioService.getFotoUsuario(usarioId).subscribe(
      (res: ArrayBuffer) => {
        const blob = new Blob([res], { type: 'image/*' });
        this.fotoUsuarioUrl = URL.createObjectURL(blob);
        console.log(this.fotoUsuarioUrl);
      },
      (err) => {
        console.error('Erro ao carregar a imagem:', err);
        this.fotoUsuarioUrl = null;
      }
    );
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
