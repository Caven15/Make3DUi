import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUtilisateurComponent } from './components/pages/Auth/login-utilisateur/login-utilisateur.component';
import { RegisterUtilisateurComponent } from './components/pages/Auth/register-utilisateur/register-utilisateur.component';
import { AccueilComponent } from './components/pages/home/accueil/accueil.component';


const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: AccueilComponent },
  { path: 'register', component: RegisterUtilisateurComponent},
  { path: 'login', component: LoginUtilisateurComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
