import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ForgetPasswordService } from 'src/app/services/auth/forget-password.service';
import { Router } from '@angular/router';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-code-validation',
  templateUrl: './code-validation.component.html',
  styleUrls: ['./code-validation.component.sass']
})
export class CodeValidationComponent implements OnInit {
  user: any|null;
  signinAlert: Alert|null;
  codeForm: FormGroup;
  loading = false;
  private tokken;

  constructor(private spinner: NgxSpinnerService,private signinService: ForgetPasswordService, private route: Router,private formBuilder: FormBuilder) {
      this.signinAlert = null;
  }
  ngOnInit() {
    this.initForm();
}

initForm() {
  this.codeForm = this.formBuilder.group({
    code: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
  });
}


  onSubmit() {
      // this.spinner.show();
      this.loading = true;
      const code = this.codeForm.get('code').value;
      const password = this.codeForm.get('password').value;
      this.signinAlert = null;
      this.signinService.codeValidation(code, password).subscribe(
      (data: any) => {
          console.log('data: ', data);
          this.route.navigate(['/pages/signin']);
      },
      (err: any) => {
          console.log('erreur',err);
          // this.spinner.hide();
              if (err.error.message === 'Invalid code'){
                  console.log(err.error.message);
                  this.signinAlert = {
                      type: 'danger',
                      message: 'Le code est invalide. Réessayer !',
                  }
              }
      }
  );
};

}
