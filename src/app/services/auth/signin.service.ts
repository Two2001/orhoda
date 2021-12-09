import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  user: any;
  private tokken = null;
  private token = null;
  private params;

  constructor(private route: Router, private http: HttpClient) {
        this.token = '';
      this.http.get('assets/parameters.json').subscribe(data =>{
          this.params = data;
      });
  }

  signIn(email: string, password: string) {
      const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      let data = { 'email': email, 'password': password };
      return this.http.post(this.params.url_site + 'login', data , httpOptions);
  }

    signOut() {
        window.sessionStorage.clear();
        window.location.href = '/pages/signin';
        // this.route.navigate(['/pages/signin']);
    }

    public saveToken(token: string): void {
        window.sessionStorage.removeItem(TOKEN_KEY);
        window.sessionStorage.setItem(TOKEN_KEY, token);
    }

    public getToken(): string | null {
        return window.sessionStorage.getItem(TOKEN_KEY);
    }

    public getUser(): any {
        const user = window.sessionStorage.getItem(USER_KEY);
        console.log("getUser: ", user);
        if (user != null) {
            return JSON.parse(user);
        }
        return null;
    }

    public getPromiseUser(token: string|null): any{
        console.log('token',token);
        if(token == null){
            window.location.href = '/';
        }else{
            let t = 'Bearer ' + token;
            console.log('token in else:',token);
            console.log('Bearer token:::',t);
            let data = {};
            let httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    Authorization: t
                })
            };
            return this.http.post(this.params.url_site + 'current/user', data , httpOptions);
        }
    }

    private getCurrentUser(token: string|null): void{
        this.getPromiseUser(token).subscribe(
            (dataUser: any) => {
                console.log(dataUser);
                this.saveUser(JSON.stringify(dataUser));
            },
            (err: any) => {
                console.log('erreur',err);
            }
        );
    }
     public saveUser(user: any): void {
         let users  = user;
         console.log("users: ", users);
         window.sessionStorage.removeItem(USER_KEY);
         window.sessionStorage.setItem(USER_KEY, JSON.stringify(users));
         console.log("Window: ", window.sessionStorage);
     }

    //  public destroyUser(user: any): void {
    //     window.sessionStorage.removeItem(user);
    // }

     public updateUser(){
      if(window.sessionStorage.getItem(TOKEN_KEY)){
            let t = window.sessionStorage.getItem(TOKEN_KEY);
            let u = this.getCurrentUser(t);
            console.log('Update user',u);
            return u;
        }
         console.log('Update failde');
      return null;
     }

     public isAuth(){
        if(window.sessionStorage.getItem(TOKEN_KEY) != null && window.sessionStorage.getItem(USER_KEY)){
            return true;
        }else{
            return false;
        }
     }
}
