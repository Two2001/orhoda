import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

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

  forgetPassword(email: string) {
      const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      let data = { 'email': email};
      return this.http.post(this.params.url_site + 'password/forget', data , httpOptions);
  }

  codeValidation(code: string, password: String) {
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let data = { 'code': code, 'password': password};
    return this.http.post(this.params.url_site + 'password/confirm-reset', data , httpOptions);
  }
}
