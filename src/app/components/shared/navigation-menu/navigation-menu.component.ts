import { Component, OnInit } from '@angular/core';
import { INavItem } from 'src/app/models/inav-item';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  public routes : INavItem[] = [];

  constructor(private _sessionService : SessionService) { }

  ngOnInit(): void {
    this.routes = [
      {title: "Acceuil", url: "home", isVisible: true},
      {title: "Auth", url: "/auth", isVisible: !this._sessionService.isConnected(), children: [
        {title: "Inscription", url: "/register", isVisible: true},
        {title: "Connexion", url: "/login", isVisible: true}
      ]},
      {title: "Article", url: "/article", isVisible: this._sessionService.isConnected(), children: [
        {title: "Créer", url: "/create", isVisible: true}
      ]},
      {title: "Utilisateur", url: "/utilisateur", isVisible: this._sessionService.isConnected(), children: [
        {title: "Profil ", url: "/utilisateur", isVisible: true}
      ]}
    ];
  }

}
