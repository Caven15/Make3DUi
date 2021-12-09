import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/utilisateur/user.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private _currentUserSubject : BehaviorSubject<User>
  public currentUser : Observable<User>

  /*
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
*/

  constructor() { 
    //var userJson = sessionStorage.getItem('currentUser');
    this._currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this._currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this._currentUserSubject.value;
  }

  logout(){
    sessionStorage.removeItem('currentUser');
    this._currentUserSubject.next(null);
  }

  isConnected() : boolean {
    return this.currentUserValue && this.currentUserValue != null;
  } 
}
