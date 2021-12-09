import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const PARAM = 'parameters';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  public parameter: any;
  public params: any;

  constructor(private http: HttpClient) {
      this.http.get('parameters.json').subscribe(data =>{
          console.log('p',data);
          this.params = data;
      });
  }

  public getParam(){
      const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      let parameters = this.http.get(this.params.url_site + 'parameters',  httpOptions);
      parameters.subscribe(
          (data: any) => {
              console.log('parametres',data['hydra:member'][0]);
              this.parameter = data['hydra:member'][0];
              return data['hydra:member'][0];
          },
          (err: any) => {
              console.log(err);
          }
      );
  }

  private saveParam(p){
      window.sessionStorage.removeItem(PARAM);
      window.sessionStorage.setItem(PARAM, p);
  }
}
