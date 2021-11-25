import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { LoginUtilisateurComponent } from './components/pages/Auth/login-utilisateur/login-utilisateur.component';
import { RegisterUtilisateurComponent } from './components/pages/Auth/register-utilisateur/register-utilisateur.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccueilComponent } from './components/pages/home/accueil/accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginUtilisateurComponent,
    RegisterUtilisateurComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // ajout pour gerer les form group
    ReactiveFormsModule
  ],
  exports: [
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
