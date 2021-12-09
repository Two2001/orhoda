import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ModalSearchProductsComponent } from 'src/app/components/shared/search-results/modal-search-products/modal-search-products.component';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { Product } from 'src/app/modals/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ProductDialogComponent } from '../../products/product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-carousel-last-product',
  templateUrl: './product-carousel-last-product.component.html',
  styleUrls: ['./product-carousel-last-product.component.sass']
})
export class ProductCarouselLastProductComponent implements OnInit {

  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Input('product') product: Array<Product> = [];
  public config: SwiperConfigInterface = {};
  public productsAll: any ;
  public lastProducts: any;
  public lastItem: any;
  public ratings: any[] = [];
  
  
   constructor(private cartService: CartService, private productsService: ProductService, private wishlistService: WishlistService, private dialog: MatDialog, private router: Router,public products: ProductsService) { }
  //  @ViewChild(SwiperDirective) directiveRef: SwiperDirective;

   ngOnInit() {
    this.products.getLastProducts().subscribe(
        (data: any) => {
          console.log('sucess',data);
          this.lastProducts = data.data;
          this.ratings.push(data.data.rating)
          console.log('lastproduits :', this.lastProducts);
          console.log('ratings :', this.ratings);
          
          // this.lastItem = this.lastProducts.slice(-5);

          // console.log('lastItem: ',this.lastItem);
        },
        (err: any) => {
          console.log('error', err);
          this.lastProducts = null;
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

   // Add to cart
   public addToCart(product: Product,  quantity: number = 1) {
     this.cartService.addToCart(product,quantity);
     console.log(product, quantity);
   }

   // Add to wishlist
   public addToWishlist(product: Product) {
     this.wishlistService.addToWishlist(product);
  }

   // Add to compare
   public addToCompare(product: Product) {
     this.productsService.addToCompare(product);
  }


 public openProductDialog(product){
   let dialogRef = this.dialog.open(ModalSearchProductsComponent, {
       data: product,
       panelClass: 'product-dialog',
   });
   dialogRef.afterClosed().subscribe(product => {
     if(product){
       this.router.navigate(['/products', product.id, product.name]);
     }
   });
 }

}
