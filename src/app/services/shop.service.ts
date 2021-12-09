import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const AUTH_API = 'http://192.168.1.110:8000/api/';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const SHOP_KEY = 'auth-shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  public saveShop(newShop,token): any{
    console.log('donnée enregistré',newShop);
    let t = 'Bearer ' + token;
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: t
      })
    };
    // console.log('httpOptions: '+ httpOptions);
    return this.http.post(AUTH_API + 'shop/create', newShop, httpOptions);
  }

  public getShop(){
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    let t = 'Bearer ' + token;
    let data = {};
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: t
      })
    };
    this.http.post(AUTH_API + 'current/shop', data , httpOptions).subscribe(
        (dataShop: any) => {
          let shop = JSON.parse(dataShop)[0];
          console.log('La boutique',shop);
          return shop;
        },
        (err: any) => {
          console.log('erreur',err);
          return null;
        }
    );
  }
}
