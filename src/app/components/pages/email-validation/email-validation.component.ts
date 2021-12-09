import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../shared/services/cart.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SignupComponent } from '../signup/signup.component';
import { SignupService } from 'src/app/services/auth/signup.service';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.sass']
})
export class EmailValidationComponent implements OnInit {
  id: any;
  user: any|null;
  signinAlert: Alert|null;
  codeForm: FormGroup;
  loading = false;
  private tokken;

  constructor(private signupService: SignupService,private cartService: CartService, public route: ActivatedRoute,private router: Router, private formBuilder: FormBuilder) { 
    this.signinAlert = null;
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.id = params;
    //   console.log('results dedans: ', this.id);
    // });
    // console.log('results: ', this.id);
    this.initForm();
  }

  initForm() {
    this.codeForm = this.formBuilder.group({
      code: ['', Validators.required]
    });
  }
  
  
    onSubmit() {
        // this.spinner.show();
        this.loading = true;
        const code = this.codeForm.get('code').value;
        this.signinAlert = null;
        this.signupService.codeValidation(code).subscribe(
        (data: any) => {
            console.log('data: ', data);
            this.router.navigate(['/pages/signin']);
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
