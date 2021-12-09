import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Category } from '../models/Category.model';

const AUTH_API = 'http://192.168.1.110:8000/api/';
const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  users: Category[] = [];

  public getCategories(): any{
    const data={};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(AUTH_API + 'category_products' , httpOptions);
  }

  public saveCategory(newCategory): any{

    // console.log('data: '+ data);
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    let t = 'Bearer ' + token;
    let data = {};
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: t
      })
    };
    console.log('httpOptions: '+ httpOptions);
    return this.http.post(AUTH_API + 'add/category', newCategory , httpOptions);
  }
}
