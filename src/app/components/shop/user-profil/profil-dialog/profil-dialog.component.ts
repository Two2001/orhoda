import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/modals/product.model';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/auth/signin.service';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { UpdateProduct } from 'src/app/models/UpdateProduct.model';
import {NgxSpinnerService} from 'ngx-spinner';
import { UpdateProfil } from 'src/app/models/UpdateProfil.model';
import { ProfilService } from 'src/app/services/profil.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Component({
  selector: 'app-profil-dialog',
  templateUrl: './profil-dialog.component.html',
  styleUrls: ['./profil-dialog.component.sass']
})
export class ProfilDialogComponent implements OnInit {


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
      email: ['', [Validators.required, Validators.email]],
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      birthday: ['', Validators.required],
      cni: ['', Validators.required],
    })
    this.modiForm.setValue({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      address: this.user.address,
      email:  this.user.email,
      phone:  this.user.phone,
      birthday:  this.user.birthday,
      cni:  this.user.birthday,
    });
  }

  onSubmit(form: NgForm) {
    this.spinner.show();

    if (form.value['first_name'] === ''){ form.value['first_name'] = this.user.first_name;  }
    if (form.value['last_name'] === ''){ form.value['last_name'] = this.user.last_name;  }
    if (form.value['address'] === ''){ form.value['address'] = this.user.address;  }
    if (form.value['email'] === ''){ form.value['email'] = this.user.email;  }
    if (form.value['phone'] === ''){ form.value['phone'] = ''+this.user.phone;  }
    if (form.value['birthday'] === ''){ form.value['birthday'] = this.user.birthday;  }
    if (form.value['cni'] === ''){ form.value['cni'] = this.user.cni;  }

    const newProfil = new UpdateProfil(this.user.id,form.value['first_name'], form.value['last_name'], form.value['address'], form.value['email'],
                                        form.value['cni'],form.value['phone'], form.value['birthday']);

    console.log('newProfil', newProfil);

    let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);

    this.profil.updateProfil(newProfil).subscribe(
      (data: any) => {
        console.log('sucess',data)
        // this.auth.updateUser();
        this.user = this.auth.getUser();
        console.log('userUpdated',this.user)
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
