import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavItem } from 'src/app/models/inav-item';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  public routes : INavItem[] = [];

  constructor(private _sessionService : SessionService, private _route: Router) { }

  public isConnected: boolean;
  
  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void{
    this.isConnected = this._sessionService.isConnected();
    console.log('Est connecté 1: ' + this.isConnected);
    this.routes = [
      {title: "Acceuil", url: "home", isVisible: true},
      {title: "Auth", url: "/auth", isVisible: !this.isConnected, children: [
        {title: "Inscription", url: "/register", isVisible: true},
        {title: "Connexion", url: "/login", isVisible: true}
      ]},
      {title: "Article", url: "/article", isVisible: this.isConnected, children: [
        {title: "Créer", url: "/create", isVisible: true}
      ]},
      {title: "Utilisateur", url: "/utilisateur", isVisible: this.isConnected, children: [
        {title: "Profil ", url: "/utilisateur", isVisible: true}
      ]}
    ];
  }

  logout(){
    this._sessionService.logout();
    console.log('Est connecté logout: ' + this.isConnected);
    console.log(this._sessionService.currentUser);
    this.refresh();
    this._route.navigate(['home']);
  }
}