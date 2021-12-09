import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/auth/signin.service';
import {NgxSpinnerService} from 'ngx-spinner';

interface Alert {
    type: string;
    message: string;
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  user: any|null;
  signinAlert: Alert|null;
  signinForm: FormGroup;
  loading = false;
  private tokken;

  constructor(private spinner: NgxSpinnerService,private signinService: SigninService, private route: Router,private formBuilder: FormBuilder) {
      this.signinAlert = null;
  }

  ngOnInit() {
      if(this.signinService.isAuth()){
          this.route.navigate(['/orhoda/user-profil']);
      }else{
          this.initForm();
      }
  }

  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }


    onSubmit() {
        this.spinner.show();
        this.loading = true;
        const email = this.signinForm.get('email').value;
        const password = this.signinForm.get('password').value;
        this.signinAlert = null;
        this.signinService.signIn(email, password).subscribe(
        (data: any) => {
            console.log('data: ', data);
            this.tokken = data.token;
            this.signinService.saveToken(data.token);
            this.signinService.getPromiseUser(data.token).subscribe(
              (dataUser: any) => {
                console.log('dataUser: ', dataUser);
                this.signinService.saveUser(dataUser);
                console.log('User',dataUser);
                window.location.href = '/orhoda/user-profil';
              },
              (err: any) => {
                  // this.spinner.hide();
                  // this.loading =false;
                  console.log('erreur',err);
                // if(err.error.code === 401){
                    // if(err.error.message === 'Please verify your account'){
                    //     // this.signinAlert = {
                    //     //     type: 'danger',
                    //     //     message: 'Une erreur s\'est produite.Reéssayez plus tard ou Contactez l\'administrateur',
                    //     // }
                    //     this.route.navigate(['/pages/confirm-email']);
                    //     window.location.href = '/pages/confirm-email';
                    //     this.signinAlert = {
                    //         type: 'danger',
                    //         message: 'Une erreur s\'est produite. Vous n\'avez pas encore vérifié votre adresse email ',
                    //     }
                    // } else {
                    //   this.signinAlert = {
                    //     type: 'danger',
                    //     message: 'Une erreur s\'est produite.',
                    // }
                    // }
                }
              // }
          );
        },
        (err: any) => {
            console.log('erreur',err);
            console.log('erreur debug',err.error.message);
            this.spinner.hide();
            this.loading = false;
                if(err.error.message === 'Please verify your account'){
                  // this.signinAlert = {
                  //     type: 'danger',
                  //     message: 'Une erreur s\'est produite.Reéssayez plus tard ou Contactez l\'administrateur',
                  // }
                  // this.route.navigate(['/pages/confirm-email']);
                  window.location.href = '/pages/confirm-email';
                  this.signinAlert = {
                      type: 'danger',
                      message: 'Une erreur s\'est produite. Vous n\'avez pas encore vérifié votre adresse email ',
                  }
                }

                if (err.error.message === 'Invalid login credential'){
                    console.log(err.error.message);
                    this.signinAlert = {
                        type: 'danger',
                        message: 'Login ou Mot de passe incorrect',
                    }
                }

                if(err.error.message === 'Authentication request could not be processed due to a system problem.'){
                    this.signinAlert = {
                        type: 'danger',
                        message: 'Désolé nous ne trouvons pas les données de votre compte',
                    }
                }
        }
    );
};

  // onSignIn() {
  //   this.signinService.signIn().then(
  //     () => {
  //       // this.authStatus = this.signinService.isAuth;
  //       this.router.navigate(['/shop']);
  //     }
  //   );
  // }

  onSignOut() {
    this.signinService.signOut();
  }

  goToSignup(){
      this.route.navigate(['/pages/signup']);
  }

  goToForgetPassword(){
    this.route.navigate(['/pages/forget-password']);
}
}
