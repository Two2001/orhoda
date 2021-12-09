import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {SigninService} from '../../../services/auth/signin.service';
import {MatDialog} from '@angular/material';
import {ProfilDialogComponent} from './profil-dialog/profil-dialog.component';
import {FormBuilder} from '@angular/forms';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const AUTH_API = 'http://192.168.1.110:8000/api/';

@Component({
  selector: 'app-user-profil',
  templateUrl: './user-profil.component.html',
  styleUrls: ['./user-profil.component.sass']
})
export class UserProfilComponent implements OnInit {

  user: any;
  isAuth:boolean;
  imgTmp: any|null;
  imgUpdateTmp: any|null;
  shopDecision: any;


  constructor(private route: Router,private auth: SigninService,private dialog: MatDialog,private http: HttpClient) { }

  ngOnInit(): void {
    this.isAuth = this.auth.isAuth();
    this.user = JSON.parse(window.sessionStorage.getItem(USER_KEY));
    console.log('user', this.user);
    this.getImage(this.user.id);

    let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);
    let httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: token
        })
    };

    this.http.get(AUTH_API + 'user/has-shop' , httpOptions).subscribe(
      (data: any) => {
          this.shopDecision = data
          console.log("shopDecision: ", this.shopDecision);
      },
      (err: any) => {
          console.log('shop erreur',err);
          if(err.error.code === 401 && err.error.message === 'Expired JWT Token'){
              this.auth.signOut();
          }
    });
  }

  goToCreateShop(){
    this.route.navigate(['/orhoda/shop-form']);
  }

  goToShop(){
    console.log('In to function');  
    this.route.navigate(['/orhoda/shop']);
  }

  goToOrdered(){
    this.route.navigate(['/orhoda/ordered']);
  }

  goToMyOrdered(){
    this.route.navigate(['/orhoda/myordered']);
  }

  deconnexion(){
    this.auth.signOut();
  }

  public openProfilDialog(){
    let dialogRef = this.dialog.open(ProfilDialogComponent, {
      data: this.user,
      panelClass: 'profil-dialog',
    });
    dialogRef.afterClosed().subscribe(profil => {
      console.log(profil);
    });

  }

  public openResetPasswordDialog(){
    let dialogRef = this.dialog.open(ResetPasswordComponent, {
      data: this.user,
      panelClass: 'profil-dialog',
    });
    dialogRef.afterClosed().subscribe(profil => {
      console.log(profil);
    });

  }

  private addProfilPhoto(p: any){
    if ( !this.auth.isAuth() ){
      this.auth.signOut();
    }
    else{
      console.log('Je suis dans mon else, ras');
      console.log('valeur de p: ', p);
      let token = window.sessionStorage.getItem(TOKEN_KEY);
      console.log(token);
      let t = 'Bearer '+token;
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: t
        })
      };
      if ( p != null ){
        console.log('Je suis dans mon if, p est != null');
        console.log('id of user: ', this.user.id);
        console.log('p: ', p);
        this.http.post(
            AUTH_API + 'user/image-upload',
            {
              image: p,
              // user: '/api/users/'+[this.user.id]
              id: this.user.id
            },
            // AUTH_API + 'users/'+[this.user.id] ,
            // {
            //   image: p,
            // }, 
            httpOptions).subscribe(
            (dataPhoto: any) => {
              console.log('Profil Ajouter ', dataPhoto);
              window.location.reload();
            },
            (err: any) => {
              console.log(err);
              if(err.error.code === 401){
                if(err.error.message === "Expired JWT Token"){
                    this.auth.signOut();
                }
              }
            }
        );
      }

    }
  }

  public imageChangeEvent(event: any,p: any):any {
    let reader = new FileReader();
    reader.onload = ( event: any) => {
      this.imgTmp = event.target.result;
      console.log('profil for image', this.imgTmp );
      this.addProfilPhoto(this.imgTmp);

    };
    reader.readAsDataURL(event.target.files[0]);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  private updateProfilPhoto(p: any){
    if ( !this.auth.isAuth() ){
      this.auth.signOut();
    }
    else{
      console.log('Je suis dans mon else, ras');
      console.log('valeur de p: ', p);
      let token = window.sessionStorage.getItem(TOKEN_KEY);
      console.log(token);
      let t = 'Bearer '+token;
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: t
        })
      };
      if ( p != null ){
        console.log('Je suis dans mon if, p est != null');
        console.log('id of user: ', this.user.id);
        this.http.post(
            AUTH_API + 'user/image-update',
            {
              image: p,
              id: [this.user.id]
              // user: '/api/users/'+[this.user.id]
            },
            // AUTH_API + 'users/'+[this.user.id] ,
            // {
            //   image: p,
            // }, 
            httpOptions).subscribe(
            (dataPhoto: any) => {
              // console.log("nestor");
              console.log('Profil Ajouter ', dataPhoto);
              // this.user = null;
              // console.log("user before:", this.user);
              
              // this.user = this.auth.destroyUser(this.user);
              // console.log("user before destroy:", this.user);
              // this.user = this.auth.saveUser(JSON.parse(window.sessionStorage.getItem(USER_KEY)));
              // console.log("user after:", this.user);
              // console.log("user before:", window.sessionStorage[2]);
              // this.user = JSON.parse(window.sessionStorage.getItem(USER_KEY));
              // console.log("user after:", this.user);
              // window.location.reload();
            },
            (err: any) => {
              console.log(err);
              if(err.error.code === 401){
                if(err.error.message === "Expired JWT Token"){
                    this.auth.signOut();
                }
              }
            }
        );
      }

    }
  }

  public imageUpdateChangeEvent(event: any,p: any):any {
    let reader = new FileReader();
    reader.onload = ( event: any) => {
      this.imgUpdateTmp = event.target.result;
      console.log('profil for image', this.imgUpdateTmp );
      this.updateProfilPhoto(this.imgUpdateTmp);

    };
    reader.readAsDataURL(event.target.files[0]);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  public getImage(id){
    console.log('user id: ', id);
    let data = {};
    let token = window.sessionStorage.getItem(TOKEN_KEY);
      console.log(token);
      let t = 'Bearer '+token;
      const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: t })
  };
    this.http.post(AUTH_API + 'user/image/'+id, data , httpOptions).subscribe(
        (dataImage: any) => {
            console.log('success', dataImage);
            let img = JSON.parse(dataImage);
            console.log('image',img[0].image64);
            return img[0].image64;
        },
        (err: any) => {
            console.log(err);
            return '';
        }
    );
}

}
