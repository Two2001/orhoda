import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';
import {  SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductsService } from 'src/app/services/products.service';
import { ProductDetailsComponent } from '../../products/product-details/product-details.component';
import { ModalProductComponent } from './modal-product/modal-product.component';

@Component({
  selector: 'app-product-carousel-two',
  templateUrl: './product-carousel-two.component.html',
  styleUrls: ['./product-carousel-two.component.sass']
})
export class ProductCarouselTwoComponent implements OnInit {

  products: any[];
  public config: SwiperConfigInterface = {};

  public productsAll: any ;
  @Input('product') product: Array<Product> = [];

  constructor(
      private dialog: MatDialog,
      private wishlistService: WishlistService,
      private route: Router ,
      private cartService: CartService,
      private productService: ProductService,
      private productsService: ProductsService
  ) {
    this.products = productsService.getCurentUserProducts();
    console.log('p', this.products);
  }

  ngOnInit(): void {
    this.productsService.getProductsPromo().subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.productsAll = data.data;
        console.log('produit en promo :', this.productsAll);
      },
      (err: any) => {
        console.log('error', err);
        this.productsAll = null;
        console.log('IN ERROR');
        console.log(err);
      }
    );
  }

  ngAfterViewInit(){
    this.config = {
      observer: true,
      slidesPerView: 5,
      spaceBetween: 16,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },


      }
    }
  }


  public addToCart(products,  quantity: number = 1) {
    console.log('voila mon produit: ', products);
    this.cartService.addToCart(products,quantity);
    console.log(products, quantity);
  }


  public openProductDialog(products, id){
    console.log('my product:', products);
    console.log('my product id:', id);
    let dialogDeleteRef = this.dialog.open(ModalProductComponent, {
        data: products,
        panelClass: 'details-product-dialog',
    });
    console.log("dialogDeleteRef: ", dialogDeleteRef);
    console.log("products: ", products);

    dialogDeleteRef.afterClosed().subscribe(products => {
      if(products){
        this.route.navigate(['/products', products.id, products.name]);
      }
    });
  }


    






















































































//   productsCurrent: any[];
//   public prod: any;
//   public config: SwiperConfigInterface = {};
//   public productsAll: any ;
//   public lastProducts: any;
//   public lastItem: any;
//    constructor(private cartService: CartService, 
//                 private productsService: ProductService, 
//                 private wishlistService: WishlistService, 
//                 private dialog: MatDialog, 
//                 private router: Router,
//                 public products: ProductsService) { 
//     this.products = products.getProductsPromo();
//     // console.log('promo :',this.product)
   
//    }

//    ngOnInit() {
   
//     this.products.getProductsPromo().subscribe(
//       (data: any) => {
//         console.log('sucess',data);
//         this.productsAll = data;
//         console.log('produit en promo :', this.productsAll[0].productListPrice[0].price);
//       },
//       (err: any) => {
//         console.log('error', err);
//         this.productsAll = null;
//         console.log('IN ERROR');
//         console.log(err);
//       }
//     );
//    }

//    // Add to cart
//    public addToCart(product: Product,  quantity: number = 1) {
//      this.cartService.addToCart(product,quantity);
//      console.log(product, quantity);
//    }

//  public openProductModal(products){
//    console.log('in modal :', products);
//    let dialogRef = this.dialog.open(ModalProductComponent, {
//        data: this.products,
//        panelClass: 'product-dialog',
//    });
//    console.log('dialogRef :', dialogRef);
//    dialogRef.afterClosed().subscribe(products => {
//      if(products){
//        this.router.navigate(['/products', products.id, products.name]);
//      }
//    });
//  }
}
