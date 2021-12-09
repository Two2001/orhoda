import { Component, OnInit, Inject } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Product } from 'src/app/modals/product.model';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { Router } from '@angular/router';
import { SigninService } from 'src/app/services/auth/signin.service';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { UpdateProduct } from 'src/app/models/UpdateProduct.model';
import {NgxSpinnerService} from 'ngx-spinner';
import { PriceComponent } from '../price/price.component';
import { PriceModalComponent } from '../price-modal/price-modal.component';

@Component({
    selector: 'app-product-dialog',
    templateUrl: './product-dialog.component.html',
    styleUrls: ['./product-dialog.component.sass']
})
export class ProductDialogComponent implements OnInit {

  public products           :   Product[] = [];
  public categories: any ;
  shop: any;
  user: any;
  isCreated: boolean;
  private dialog: MatDialog;
    modiForm = this.fb.group({
        name: [''],
        description: [''],
        category: [''],
        price: [''],
        currentstock: [''],
        strokedprice: [''],
    });
    form: FormGroup;

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
    this.initForm();
    this.cat.getCategories().subscribe(
        (data: any) => {
            this.categories = data.data;
        },
        (err: any) => {
            this.categories = [];
            console.log(err);
        }
    );
    this.modiForm.patchValue({
      name: this.product.name,
      description: this.product.description,
      category:  this.product.category[0].id,
      price: this.product.price,
      currentstock: this.product.current_stock,
      strokedprice: this.product.stroked_price,
    });

    console.log('name',this.modiForm.value);
    console.log('currentstock',this.modiForm.value.currentstock);
  }


  initForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      currentstock: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      strokedprice: ['', Validators.required],
    })
  }

  onSubmit(form: NgForm) {
      this.spinner.show();
      // const name = form.value['name'];
      // const description = form.value['description'];
      // const currentstock = form.value['currentstock'];
      // let category = form.value['category'];
      // let price = form.value['price'];
      // let strokedprice = form.value['strokedprice'];
      
      if (form.value['name'] === ''){ form.value['name'] = this.product.name;  } 
      if (form.value['description'] === ''){ form.value['description'] = this.product.description;  } 
      if (form.value['currentstock'] === ''){ form.value['currentstock'] = this.modiForm.value.currentstock;  } 
      if (form.value['category'] === ''){ form.value['category'] = this.product.category[0].id;  } 
      if (form.value['price'] === ''){ form.value['price'] = this.product.price;  } 
      if (form.value['strokedprice'] === ''){ form.value['strokedprice'] = this.modiForm.value.strokedprice;  } 
    
      console.log('category: ',form.value['category']);
      console.log('strokedprice: ',form.value['strokedprice']);
      console.log('this.product.currentstock: ',this.product.currentstock);
    const newProduct = new UpdateProduct(form.value['name'], form.value['description'], form.value['currentstock'], form.value['category'], form.value['price'], form.value['strokedprice']);
  
    console.log('modif product: ',newProduct);
    console.log('idProduct: ',this.product.id);


    this.productService.updateProduct(newProduct, this.product.id).subscribe(
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

  public openDialog(products){
    let dialogRef = this.dialog.open(PriceModalComponent, {
        data: products,
        panelClass: 'price-dialog',
    });
    console.log("dialodRef: ", dialogRef);
    dialogRef.afterClosed().subscribe(products => {
      if(products){
        this.route.navigate(['/products', products.id, products.name]);
      }
    });
    
  }


}
