import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUtilisateurComponent } from './components/pages/login-utilisateur/login-utilisateur.component';
import { RegisterUtilisateurComponent } from './components/pages/register-utilisateur/register-utilisateur.component';

const routes: Routes = [
  { path: '', redirectTo : 'register', pathMatch : 'full'},
  { path: 'register', component: RegisterUtilisateurComponent},
  { path: 'login', component: LoginUtilisateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
