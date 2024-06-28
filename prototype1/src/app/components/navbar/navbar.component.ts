import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Lexique Complet',
      icon: 'pi pi-fw pi-book',
      routerLink: '/list'
    },
    {
      label: "Traduction des textes",
      icon: 'pi pi-fw pi-language',
      routerLink: '/texts'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
