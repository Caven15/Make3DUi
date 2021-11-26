import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilUtilisateurComponent } from './components/pages/profil-utilisateur/profil-utilisateur.component';

const routes: Routes = [
  { path: 'utilisateur', component: ProfilUtilisateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilisateurRoutingModule { }
