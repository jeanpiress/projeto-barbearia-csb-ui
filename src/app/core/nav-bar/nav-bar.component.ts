import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { AuthService } from '../../seguranca/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  exibindoMenu: boolean = false;
  constructor(private notificationService: NotificationService,
              public auth: AuthService,
              private router: Router
  ) {}

  ngOnInit() {
    this.notificationService.hideNavBar$.subscribe(hide => {
      if (hide) {
        this.exibindoMenu = false;
      }
    });
  }

  logout() {
    this.auth.logout();  // Chama o método logout do AuthService para remover o token
    this.router.navigate(['/login']);  // Redireciona o usuário para a página de login
  }

}
