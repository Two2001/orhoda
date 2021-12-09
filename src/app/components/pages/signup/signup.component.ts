import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { SignupService } from 'src/app/services/auth/signup.service';
import { User } from '../../../models/User.model';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { DatePipe } from '@angular/common';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {

  isSignup: boolean;
  signUpForm: FormGroup;
  private value: string = '';
  closeResult = '';
  samePassword: boolean = true;

  public etatModal: string;
  public etatAriaLabelledBy: string;

  errorMessage: string = "Inscription non réussie, veuillez réessayer svp!";
  successMessage: string = "Inscription réussie, vous pouvez àccéder à votre espace personnel en vous authentifiant!";
  errorMessagePassword: string = "Mot de passe inconforme!";

  constructor(private signup: SignupService, private formBuilder: FormBuilder,
              private router: Router,private modalService: NgbModal, private route: Router) { }


  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      cni: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      password_confirm: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    })
  }


  onKey(event: any) {
    this.value = event.target.value;
    console.log('value: '+ this.value);
  }

  onSubmit() {
    let d = new Date();
    // const first_name = form.value['first_name'];
    // const last_name = form.value['last_name'];
    // const email = form.value['email'];
    // const phone = form.value['phone'];
    // const address = form.value['address'];
    // let birthday = form.value['birthday'];

    const email = this.signUpForm.get('email')?.value;
    const first_name = this.signUpForm.get('first_name')?.value;
    const last_name = this.signUpForm.get('last_name')?.value;
    const address = this.signUpForm.get('address')?.value;
    const phone = this.signUpForm.get('phone')?.value;
    let birthday = this.signUpForm.get('birthday')?.value;

    // birthday.split('');
    
    // birthday =  birthday[6] + birthday[7] + birthday[8] + birthday[9] + "-" +  birthday[3] + birthday[4] + "-" +  birthday[0] + birthday[1];

    console.log('birthday', birthday)
    // const date=new Date();
    // let latest_date =this.datepipe.transform(date, 'yyyy-MM-dd');
    // console.log('latest_date', latest_date);

    // const now = Date.now();
    // console.log('now', now);

    const cni = this.signUpForm.get('cni')?.value;
    const roles = this.signUpForm.get('roles')?.value;
    const password = this.signUpForm.get('password')?.value;
    const password_confirm = this.signUpForm.get('password_confirm')?.value;

    // const cni = form.value['cni'];
    // const roles = form.value['roles'];
    // const password = form.value['password'];

    console.log('first_name: '+ first_name);
    console.log('last_name: '+ last_name);
    console.log(' password: '+  password);
    console.log(' password_confirm: '+  password_confirm);

    const newUser = new User(first_name, last_name, email, phone, address, birthday, cni, password);

    console.log('newUser: ',newUser);

    if(password === password_confirm){
      this.signup.saveUsers(newUser).subscribe(
        (data: any) => {
          console.log('sucess',data)
          this.signUpForm.reset();
          // this.open(m);
          // this.isSignupTrue();
    
          this.isSignup = true;
          let navigationExtras: NavigationExtras = {
            queryParams: {
              user_id: data.user_id
            }
          };
      
          this.route.navigate(["/pages/confirm-email"]);
          // this.route.navigate(["/pages/signin"]);
          // this.etatModal = 'success';
          // this.etatAriaLabelledBy = 'modal-basic-title-success'
        },
        (err: any) => {
          console.log('error',err);
          // this.open('#error');
          // this.isSignupFalse();
          this.signUpForm.reset();
          this.isSignup = false;
          // this.etatModal = 'errorModal';
          // this.etatAriaLabelledBy = 'modal-basic-title-error'
        }
      );
    } else {
      this.samePassword = false;
    }

    
    
    // console.log('isSignup', isSignup);
    
  
};

// private  isSignupTrue(): void {
//   this.isSignup = true;
// };

// private  isSignupFalse(): void {
//   this.isSignup = false;
// };

open(content) {
  // etat = this.etatModal;
  // let etatAriaLabelledByNow = this.etatAriaLabelledBy;
  // console.log('etat: ', etat);
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  // etat = '';
  // this.etatModal = '';
  // this.etatAriaLabelledBy = '';

  // console.log('etat: ', etat);
  // console.log('etatModal: ', this.etatModal);
  // console.log('etatAriaLabelledBy: ', this.etatAriaLabelledBy);
  // if (this.isSignup === false) {
  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // } else if (this.isSignup === true) {
  //   this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
   
  // } else {}

}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}


}
