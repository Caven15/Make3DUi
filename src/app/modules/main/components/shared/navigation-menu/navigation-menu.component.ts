import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavItem } from 'src/app/models/inav/inav-item';
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
    if(this.isConnected){
      this.routes = [
        {title: "Acceuil", url: "home", isVisible: true},
        {title: "Tous les articles", url: "/article/index", isVisible: true},
        {title: "Mes articles", url: "/article/listeByUser/", isVisible: true},
        {title: "Créer un article", url: "/article/create", isVisible: true},
        {title: "Profil Utilisateur", url: "/utilisateur/utilisateur", isVisible: this.isConnected}
      ];
    }
    else{
      this.routes = [
        {title: "Acceuil", url: "home", isVisible: true},
        {title: "Inscription", url: "/auth/register", isVisible: !this.isConnected},
        {title: "Connexion", url: "/auth/login", isVisible: !this.isConnected}
      ];
    }
    
  }

  logout(){
    this._sessionService.logout();
    console.log('Est connecté logout: ' + this.isConnected);
    console.log(this._sessionService.currentUser);
    this.refresh();
    this._route.navigate(['home']);
  }

  Inscription(){
    this._route.navigate(["auth", "register"]);
  }

  Connexion(){
    this._route.navigate(["auth", "login"]);
  }

  MesArticle(){
    this._route.navigate(["article", "listeByUser"]);
  }

  CreationArticle(){
    this._route.navigate(["article", "create"]);
  }
}

/*
this.routes = [
        {title: "Acceuil", url: "home", isVisible: true},
        {title: "Inscription", url: "/auth/register", isVisible: !this.isConnected},
        {title: "Connexion", url: "/auth/login", isVisible: !this.isConnected},
        {title: "Article", url: "/article", isVisible: this.isConnected, children: [
          {title: "Tous les articles", url: "/index", isVisible: true},
          {title: "Mes articles", url: "/listeByUser/", isVisible: true},
          {title: "Créer un article", url: "/create", isVisible: true}
        ]},
        {title: "Profil Utilisateur", url: "/utilisateur/utilisateur", isVisible: this.isConnected}
      ];

*/