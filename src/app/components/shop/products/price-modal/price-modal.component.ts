import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { Product } from 'src/app/modals/product.model';
import { ListPrice } from 'src/app/models/ListPrice.model';
import { UpdateProduct } from 'src/app/models/UpdateProduct.model';
import { SigninService } from 'src/app/services/auth/signin.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';

@Component({
  selector: 'app-price-modal',
  templateUrl: './price-modal.component.html',
  styleUrls: ['./price-modal.component.sass']
})
export class PriceModalComponent implements OnInit {

  public products           :   Product[] = [];
  public categories: any ;
  shop: any;
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
      @Inject(MAT_DIALOG_DATA) public product,
      private auth: SigninService, private productService: ProductsService,
      private route: Router, private cat: CategoriesService) {
      console.log('Produit a modifié',product);
  }

  ngOnInit() {
    this.cat.getCategories().subscribe(
        (data: any) => {
            this.categories = data['hydra:member'];
        },
        (err: any) => {
            this.categories = [];
            console.log(err);
        }
    );
    this.modiForm.setValue({
      name: this.product.name,
      description: this.product.description,
      code:  this.product.code,
      category:  this.product.category.id,
      price: this.product.price,
    });

    console.log('name',this.modiForm.value);

    this.initForm();
  }

  initForm() {
    this.modiForm = this.fb.group({
      price: ['', [Validators.required, Validators.email]],
      devise: ['', Validators.required],
      valid_from: ['', Validators.required],
      valid_to: ['', Validators.required]
    })
  }

  onSubmit(form: NgForm) {
      this.spinner.show();

      const price = this.modiForm.get('price')?.value;
      const devise = this.modiForm.get('devise')?.value;
      const valid_from = this.modiForm.get('valid_from')?.value;
      const valid_to = this.modiForm.get('valid_to')?.value;
  
    const newProduct = new ListPrice(price , devise, valid_from, valid_to);
  
    console.log('modif product: ',newProduct);
    console.log('idProduct: ',this.product.id);


    this.productService.newListPrice(newProduct, this.product.id).subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.isCreated = true;
        // this.auth.updateUser();
        this.user = this.auth.getUser();
        this.shop = this.user.shop;
        this.close();
        window.location.reload();
      },
      (err: any) => {
        console.log('error',err);
        this.isCreated = false;
      }
    );
  }


  public addToCart(product: Product, quantity) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity));
  }

  public close(): void {
    this.dialogRef.close();
  }


}
