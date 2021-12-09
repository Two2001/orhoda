import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { Product } from 'src/app/modals/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ModalProductComponent } from '../../home-two/product-carousel-two/modal-product/modal-product.component';

@Component({
  selector: 'app-product-vertical',
  templateUrl: './product-vertical.component.html',
  styleUrls: ['./product-vertical.component.sass']
})
export class ProductVerticalComponent implements OnInit {

 @Input() products: Product[];
 public productsAll: any;
 public productsChoice: any;
 

  constructor(private productsService: ProductsService,private dialog: MatDialog, private route: Router ) { }

  ngOnInit() {
    // this.productsService.getProducts()
    // .subscribe (
    // product => this.products = product
    // )
    this.productsService.getLastProducts().subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.productsAll = data.data;
        console.log('vertical :', this.productsAll);
      },
      (err: any) => {
        console.log('error', err);
        this.productsAll = null;
        console.log('IN ERROR');
        console.log(err);
      }
    );

    this.productsService.getProductsChoiceByTeam().subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.productsChoice = data.data;
        console.log('vertical :', this.productsChoice);
      },
      (err: any) => {
        console.log('error', err);
        this.productsChoice = null;
        console.log('IN ERROR');
        console.log(err);
      }
    );
  }

  public openModalProduct1(products, id){
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

  public openModalProduct(products, id){
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

}
