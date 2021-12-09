import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const AUTH_API = 'http://192.168.1.110:8000/api/';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';


@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }

  public updateProfil(newProfil): any{
    let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);
    // const profilCurrentId = id;
    console.log('profilCurrentId: ', newProfil.id);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: token
      })
    };
    return this.http.put(AUTH_API + 'user/profile-update/' + [newProfil.id] , newProfil, httpOptions);

  };

  public resetPassword(newPassword): any{
    console.log("newPassword: ", newPassword);
    console.log("newPasswordId: ", newPassword.user_id);
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    let t = 'Bearer ' + token;
    let data = {};
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: t
      })
    };
    return this.http.put(AUTH_API + 'password/update/' + [newPassword.user_id], newPassword , httpOptions);

  };
}
