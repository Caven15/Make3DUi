import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginUtilisateurComponent } from './components/pages/login-utilisateur/login-utilisateur.component';
import { RegisterUtilisateurComponent } from './components/pages/register-utilisateur/register-utilisateur.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginUtilisateurComponent,
    RegisterUtilisateurComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,   // ajout pour gerer les form group
    AuthRoutingModule
  ], 
  bootstrap : [RegisterUtilisateurComponent]
})
export class AuthModule { }
