import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_CONFIGURATION } from '@angular/router';
import { User } from 'src/app/models/utilisateur/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UtilisateurService } from 'src/app/services/utilisateur.service';

@Component({
  selector: 'app-profil-utilisateur',
  templateUrl: './profil-utilisateur.component.html',
  styleUrls: ['./profil-utilisateur.component.scss']
})
export class ProfilUtilisateurComponent implements OnInit {
  public utilisateur : User = new User;
// Router sers a rediriger si l'utilisateur n'est pas connecter
// sessionService va consulter les variables de session (sessionStorage)
// UtilisateurService est lié au service du components en question
  constructor(private _route : Router, private _authService : AuthService, private _utilisateurService : UtilisateurService) { }

  ngOnInit(): void {
    this.chargerUtilisateur();
  }

chargerUtilisateur(): void {
  if(this._authService.isConnected()){
    this._utilisateurService.GetOne().subscribe(user => {
      this.utilisateur = user;
      console.log(this.utilisateur);
    });
    return;
  }
  this._route.navigate(['login'])
}

}
