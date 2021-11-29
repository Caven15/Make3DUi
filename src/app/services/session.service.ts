import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public get currentUser() : User{
    var userJson = sessionStorage.getItem('currentUser');
    if(userJson){
      return JSON.parse(userJson, null);
    }
    return null;
  }

  public set currentUser(user:User){
    sessionStorage.setItem('currentUser', JSON.stringify(user));
  }


  constructor() { }

  logout(){
    sessionStorage.clear();
    this.currentUser = null;
  }

  isConnected() : boolean {
    return this.currentUser && this.currentUser != null;
  } 
}
