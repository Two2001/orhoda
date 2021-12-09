import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SigninService } from 'src/app/services/auth/signin.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/modals/product.model';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.sass']
})
export class DetailOrderComponent implements OnInit {

  public products           :   Product[] = [];
  public categories: any ;
  shop: any;
  user: any;
  isCreated: boolean;
  public ordersAll: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartService: CartService,
    public dialogRef: MatDialogRef<DetailOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public product,
    private auth: SigninService, private productsService: ProductService,
    private route: Router, private cat: CategoriesService,
    private prod: ProductsService) {
    console.log('Détail du Produit',this.product);
  }
  

  ngOnInit(): void {
    this.productsService.getProducts().subscribe(product => this.products = product);

    this.prod.getProducts().subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.ordersAll = data.data;
        console.log('orders :', this.ordersAll);
      },
      (err: any) => {
        console.log('error', err);
        this.ordersAll = null;
        console.log('IN ERROR');
        console.log(err);
      }
    );
  }

  public close(): void {
    this.dialogRef.close();
  }

}
