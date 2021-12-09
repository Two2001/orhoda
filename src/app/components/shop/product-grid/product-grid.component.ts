import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Product } from 'src/app/modals/product.model';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';
import { WishlistService } from '../../shared/services/wishlist.service';
import { ProductDialogComponent } from '../products/product-dialog/product-dialog.component';

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.sass']
})
export class ProductGridComponent implements OnInit {

  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();

  @Input() productsResults:any=[];
 
   constructor(private cartService: CartService,private route: ActivatedRoute, public productsService: ProductService, private wishlistService: WishlistService, private dialog: MatDialog, private router: Router ) {
    
    }
 
   ngOnInit() {
    this.productsResults = this.route
    .data
    .subscribe(value => console.log(value));

    console.log('productsResultsGrid:', this.productsResults);
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
     let dialogRef = this.dialog.open(ProductDialogComponent, {
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
