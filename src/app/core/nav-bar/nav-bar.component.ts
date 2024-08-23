import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  exibindoMenu: boolean = false;
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.hideNavBar$.subscribe(hide => {
      if (hide) {
        this.exibindoMenu = false;
      }
    });
  }

}
