import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-modal-categories',
  templateUrl: './modal-categories.component.html',
  styleUrls: ['./modal-categories.component.sass']
})
export class ModalCategoriesComponent implements OnInit {

  public categories: any ;
  public categoriesProducts: any ;
  

  constructor(private cat: CategoriesService,private prod: ProductsService, private route: Router, public dialogRef: MatDialogRef<ModalCategoriesComponent>) {
    
   }

  ngOnInit() {
     this.cat.getCategories().subscribe(
        (data: any) => {
          this.categories = data.data;
          console.log('catégorie :', this.categories)
        },
        (err: any) => {
          this.categories = null;
          console.log(err);
        }
    );

  }
  public close(): void {
    this.dialogRef.close();
  }

  redirection(id){
    let idCat = id;
    console.log('cat id:', idCat);
    this.prod.getProductsCategories(idCat).subscribe(
      (data: any) => {
        console.log('success: ',data);
        this.categoriesProducts = data;
        // let categoriesProductsJson = JSON.stringify(this.categoriesProducts);
        // console.log('categoriesProductsJson: ',categoriesProductsJson);
          this.route.navigate(['/product-left-sidebar', this.categoriesProducts]);
        // this.route.navigate(['/search-results']);
      },
      (err: any) => {
        this.categoriesProducts = null;
        console.log(err);
      }
    );
    
  }

}
