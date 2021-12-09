import { Component, OnInit, Inject } from '@angular/core';
import { NgForm, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/auth/signin.service';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sologan-modal',
  templateUrl: './sologan-modal.component.html',
  styleUrls: ['./sologan-modal.component.sass']
})
export class SologanModalComponent implements OnInit {

  public categories: any ;
  user: any;
  isCreated: boolean;
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
      public dialogRef: MatDialogRef<ProductDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public shop,
      private auth: SigninService, private productService: ProductsService,
      private route: Router, private cat: CategoriesService) {
      console.log('shop:',shop);
  }

  ngOnInit() {
    console.log('name',this.modiForm.value);

    this.initForm();
  }

  initForm() {
    this.modiForm = this.fb.group({
      sologan: ['', Validators.required],
    })
  }

  onSubmit(form: NgForm) {
      this.spinner.show();

      const sologan = this.modiForm.get('sologan')?.value;
      console.log('idProduct: ',this.shop.id);


    this.productService.addSologan(sologan, this.shop.id).subscribe(
      (data: any) => {
        console.log('sucess',data);
        // this.auth.updateUser();
        this.user = this.auth.getUser();
        this.shop = this.user.shop;
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
