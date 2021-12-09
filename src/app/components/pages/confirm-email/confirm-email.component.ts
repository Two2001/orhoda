import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from 'src/app/services/auth/signup.service';
import { CartService } from '../../shared/services/cart.service';

interface Alert {
  type: string;
  message: string;
}

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.sass']
})
export class ConfirmEmailComponent implements OnInit {

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
      email: ['', [Validators.required, Validators.email]],
    });
  }
  
  
    onSubmit() {
        // this.spinner.show();
        this.loading = true;
        const email = this.codeForm.get('email').value;
        this.signinAlert = null;
        this.signupService.emailValidation(email).subscribe(
        (data: any) => {
            console.log('data: ', data);
            this.router.navigate(['/pages/email-verification']);
        },
        (err: any) => {
            console.log('erreur',err);
            // this.spinner.hide();
                if (err.error.message === 'User not found'){
                    console.log(err.error.message);
                    this.signinAlert = {
                        type: 'danger',
                        message: 'L\'email est invalide ou ne correspond à aucun compte. Réessayer !',
                    }
                }
        }
    );
  };

 
}
