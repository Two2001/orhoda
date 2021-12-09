import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SigninService } from './signin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private signinService: SigninService,
    private router: Router) {

} 

canActivate(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if(this.signinService.isAuth) {
      return true;
    } else {
      this.router.navigate(['/orhoda/accueil']);
      return false;
    }
  } 
}
