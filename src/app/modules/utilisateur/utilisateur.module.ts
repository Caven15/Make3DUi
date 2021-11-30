import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { ProfilUtilisateurComponent } from './components/pages/profil-utilisateur/profil-utilisateur.component';
import { AccueilComponent } from '../main/components/pages/home/accueil/accueil.component';

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
