import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Product } from 'src/app/modals/product.model';
import { SigninService } from 'src/app/services/auth/signin.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-dialog-two',
  templateUrl: './product-dialog-two.component.html',
  styleUrls: ['./product-dialog-two.component.sass']
})
export class ProductDialogTwoComponent implements OnInit {

  constructor(public dialogDeleteRef: MatDialogRef<ProductDialogTwoComponent>, @Inject(MAT_DIALOG_DATA) public product: Product,
  private auth: SigninService, private productService: ProductsService,private router: Router) { }

  shop: any;
  user: any;
  isCreated: boolean;
  public products           :   Product[] = [];

  ngOnInit(): void {
  }

  public close(): void {
    this.dialogDeleteRef.close();
  }

  deleteProduct() {
  
    console.log('idProduct: ',this.product.id);
  
  
    this.productService.deleteProduct(this.product.id).subscribe(
      (data: any) => {
        console.log('sucess',data)
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
}
