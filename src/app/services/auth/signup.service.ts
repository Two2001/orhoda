import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private params;
  users: User[] = [];
  usersSubject = new Subject<User[]>();

  constructor(private http: HttpClient) {
    this.http.get('assets/parameters.json').subscribe(data =>{
      this.params = data;
    });
  }

  emitUsers() {
    this.usersSubject.next(this.users);
  }

  public saveUsers(newUser): any{
    const data={};
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    console.log('httpOptions: '+ httpOptions);
    return this.http.post(this.params.url_site + 'signup', newUser , httpOptions);
  }

  codeValidation(code: string) {
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let data = { 'code': code};
    console.log("data: ", data);
    return this.http.post(this.params.url_site + 'confirm-code', data , httpOptions);
  }

  emailValidation(email: string) {
    const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let data = { 'email': email};
    console.log("data: ", data);
    return this.http.post(this.params.url_site + 'user/email', data , httpOptions);
  }


 

}
