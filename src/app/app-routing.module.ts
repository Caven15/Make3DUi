import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/pages/home/accueil/accueil.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: AccueilComponent },
  { path: 'auth', loadChildren: ()=>import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'utilisateur', loadChildren: ()=>import('./utilisateur/utilisateur.module').then(m => m.UtilisateurModule)},
  { path: 'article', loadChildren: ()=>import('./article/article.module').then(m => m.ArticleModule)}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
