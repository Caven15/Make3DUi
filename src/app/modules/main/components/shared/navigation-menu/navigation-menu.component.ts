import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavItem } from 'src/app/models/inav/inav-item';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  public routes : INavItem[] = [];

  public isConnected: boolean = false;

  constructor(private _authService : AuthService, private _route: Router) {
    this.refresh();
    this._authService.currentUser.subscribe(
      {
        next : (user) => {
          this.isConnected = this._authService.isConnected();
          this.refresh();
          console.log('Est connecté 1: ' + this.isConnected);
        }
      }
    )
  }
  
  ngOnInit(): void {
    console.log('ngOnInit : ' + this.isConnected);
    
  }

  refresh(): void{
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
    this._authService.logout();/*
    console.log('Est connecté logout: ' + this.isConnected);
    console.log(this._authService.currentUser);
    this.refresh();
    this._route.navigate(['home']);*/
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