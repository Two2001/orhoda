import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { getMaxListeners } from 'process';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { Product } from 'src/app/modals/product.model';
import { Ratings } from 'src/app/models/Ratings.model';
import { SigninService } from 'src/app/services/auth/signin.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductDialogComponent } from '../../../products/product-dialog/product-dialog.component';

@Component({
  selector: 'app-modal-product',
  templateUrl: './modal-product.component.html',
  styleUrls: ['./modal-product.component.sass']
})
export class ModalProductComponent implements OnInit {

  public products           :   Product[] = [];
  public categories: any ;
  shop: any;
  user: any;
  isCreated: boolean;

  private dialog: MatDialog;
    modiForm = this.fb.group({
        name: [''],
        description: [''],
        code: [''],
        category: [''],
        price: [''],
    });
  // @Input('product') product: Array<Product> = [];

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private cartService: CartService,
      public dialogRef: MatDialogRef<ProductDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public product,
      private auth: SigninService, private productsService: ProductService,
      private route: Router, private cat: CategoriesService,
      private prod: ProductsService) {
      console.log('Détail du Produit',this.product);
  }


  public image: any;
   public zoomImage: any;

  public counter            :   number = 1;

  index: number;
  bigProductImageIndex = 0;
  public productsAll: any;
  racingValue: number;
  counterCurrent: number = 1;
  errorMessage: any;


  ngOnInit() {
    this.productsService.getProducts().subscribe(product => this.products = product);


    this.getRelatedProducts();

    this.prod.getProducts().subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.productsAll = data.data;
        console.log('produit :', this.productsAll);
      },
      (err: any) => {
        console.log('error', err);
        this.productsAll = null;
        console.log('IN ERROR');
        console.log(err);
      }
    );
  }



  public close(): void {
    this.dialogRef.close();
  }

  change(event) 
  {
    this.racingValue = event.target.value;
    console.log(event.target.value);
  }

  rating(){
    if(this.auth.isAuth()){
      this.user = this.auth.getUser();
      console.log('info rating: ', this.counterCurrent);
      console.log('info user: ', this.user.id);
      console.log('info product: ', this.product.id);
      this.racingValue = this.counterCurrent;
      let idUser = this.user.id;
      let idProduct = this.product.id;

      const ratings = new Ratings(idUser , idProduct, this.counterCurrent);

      this.prod.ratingProducts(ratings).subscribe(
        (data: any) => {
          console.log('sucess',data);

          if(data.success == false){
            this.errorMessage = data.message;
          } else {
            window.location.reload();
          }
          
          // window.location.reload();
        },
        (err: any) => {
          console.log('error',err);
        }  
      )
    }else{
        this.auth.signOut();
    }
    
  }


public increment() {
  this.counter += 1;
  this.counterCurrent = this.counter;
}

public decrement() {
  if(this.counter >1){
     this.counter -= 1;
     this.counterCurrent = this.counter;
  }
}

getRelatedProducts() {
  this.prod.getProducts()
  .subscribe(
    (product: Product[]) => {
      this.products = product
    });
}

  // Add to cart
  public addToCart(product: Product,  quantity: number = 1) {
    this.cartService.addToCart(product,quantity);
    console.log(product, quantity);
  }

   // Add to cart
   public buyNow(product: Product, quantity) {
    if (quantity > 0)
      this.cartService.addToCart(product,parseInt(quantity));
      this.router.navigate(['/pages/checkout']);
 }


  
}
