import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private messageService: MessageService,
              private router: Router
  ) {}

  showSuccess() {
    this.messageService.add({severity:'success', summary:'Success', detail:'Message Content'});
  }

  exibindoNavBar(){
    return this.router.url !== '/login';
  }
}
