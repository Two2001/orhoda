import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { WishlistService } from 'src/app/components/shared/services/wishlist.service';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Product } from 'src/app/modals/product.model';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import {ProductsService} from '../../../../services/products.service';
import { DeleteProductDialogComponent } from '../delete-product-dialog/delete-product-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit {

  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Output() onOpenDeleteProductDialog: EventEmitter<any> = new EventEmitter();
 @Input() product: Product;

 public productsAll: any ;

  constructor(private cartService: CartService,
              public productsService: ProductService,
              private wishlistService: WishlistService,
              private dialog: MatDialog,
              private router: Router,
              public products: ProductsService ) { }

  ngOnInit() {
    this.products.getProducts().subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.productsAll = data['hydra:member'];
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

  public openDeleteProductDialog(products){
    let dialogDeleteRef = this.dialog.open(DeleteProductDialogComponent, {
        data: products,
        panelClass: 'delete-product-dialog',
    });
    console.log("dialogDeleteRef: ", dialogDeleteRef);
    dialogDeleteRef.afterClosed().subscribe(products => {
      if(products){
        this.router.navigate(['/products', products.id, products.name]);
      }
    });
  }

}
