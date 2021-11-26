import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { AccueilComponent } from '../components/pages/home/accueil/accueil.component';
import { ProfilUtilisateurComponent } from './components/pages/profil-utilisateur/profil-utilisateur.component';

@NgModule({
  declarations: [
    AccueilComponent,
    ProfilUtilisateurComponent
  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule

  ]
})
export class UtilisateurModule { }
