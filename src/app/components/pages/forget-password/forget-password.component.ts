import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { SigninService } from 'src/app/services/auth/signin.service';
import { Router } from '@angular/router';
import { ForgetPasswordService } from 'src/app/services/auth/forget-password.service';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.sass']
})
export class ForgetPasswordComponent implements OnInit {

  user: any|null;
  signinAlert: Alert|null;
  forgetPasswordForm: FormGroup;
  loading = false;
  private tokken;

  constructor(private spinner: NgxSpinnerService,private forget: ForgetPasswordService, private route: Router,private formBuilder: FormBuilder) {
      this.signinAlert = null;
  }

  ngOnInit() {
      this.initForm();
  }

  initForm() {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


    onSubmit() {
        this.spinner.show();
        this.loading = true;
        const email = this.forgetPasswordForm.get('email').value;
        this.signinAlert = null;
        this.forget.forgetPassword(email).subscribe(
        (data: any) => {
            console.log('data: ', data);
            this.route.navigate(['/pages/code-validation']);
        },
        (err: any) => {
            console.log('erreur',err);
            this.spinner.hide();
                if (err.error.message === 'User not found'){
                    console.log(err.error.message);
                    this.signinAlert = {
                        type: 'danger',
                        message: 'L\'adresse mail saisie ne correspond à aucun compte. Veuillez réssayer !',
                    }
                }
        }
    );
};

}
