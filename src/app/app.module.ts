import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './tools/intercepteur/jwt.Interceptor';
import { AuthModule } from './auth/auth.module';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { ArticleModule } from './article/article.module';
import { NavItemComponent } from './components/shared/nav-item/nav-item.component';
import { NavigationMenuComponent } from './components/shared/navigation-menu/navigation-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    NavItemComponent,
    NavigationMenuComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,    // ajout pour gerer les form group
    //module enfant
    AuthModule,
    UtilisateurModule,
    ArticleModule
  ],
  exports: [
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
