import { Component, Inject, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SigninService } from 'src/app/services/auth/signin.service';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: './delete-product-dialog.component.html',
  styleUrls: ['./delete-product-dialog.component.sass']
})
export class DeleteProductDialogComponent implements OnInit {

  constructor(public dialogDeleteRef: MatDialogRef<DeleteProductDialogComponent>, @Inject(MAT_DIALOG_DATA) public product: Product,
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
