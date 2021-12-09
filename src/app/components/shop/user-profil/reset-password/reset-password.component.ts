import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProfilDialogComponent } from '../profil-dialog/profil-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SigninService } from 'src/app/services/auth/signin.service';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProfilService } from 'src/app/services/profil.service';
import { ResestPassword } from 'src/app/models/ResetPassword.model';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {

  modiForm = this.fb.group({
    name: [''],
    description: [''],
    code: [''],
    category: [''],
    price: [''],
  });

  constructor(
      private spinner: NgxSpinnerService,
      private fb: FormBuilder,
      private router: Router,
      private cartService: CartService,
      public dialogRef: MatDialogRef<ProfilDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public user,
      private auth: SigninService, private productService: ProductsService,
      private route: Router, private cat: CategoriesService,
      private profil: ProfilService) {
    console.log('Utilisater a modifié',user);
  }

  ngOnInit(): void {
    console.log(this.user);
    this.modiForm = this.fb.group({
      old_password: ['', Validators.required],
      new_password: ['', Validators.required],
    })
  }

  onSubmit(form: NgForm) {
    this.spinner.show();

    const old_password = form.value['old_password'];
    const new_password = form.value['new_password'];

    const newPassword = new ResestPassword(old_password, new_password,this.user.id);

    console.log('newProfil', newPassword);

    let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);

    this.profil.resetPassword(newPassword).subscribe(
      (data: any) => {
        console.log('sucess',data)
        // this.auth.updateUser();
        this.user = this.auth.getUser();
        this.close();
        window.location.reload();
      },
      (err: any) => {
        console.log('error',err);
      }
    );
  }

  public close(): void {
    this.dialogRef.close();
  }

}
