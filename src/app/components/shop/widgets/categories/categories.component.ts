import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import {CategoriesService} from '../../../../services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {
  public categories: any ;
  public categoriesProducts: any ;
  @Input() subcategories:any=[];

  constructor(private cat: CategoriesService, private prod: ProductsService, private route: Router) { }

  ngOnInit() {
     this.cat.getCategories().subscribe(
        (data: any) => {
          console.log('catégorie: ', data);
          this.categories = data.data;
          // this.subcategories = data.data.sub_categories;

          // this.categories.forEach(function (value) {
          //   console.log(value.sub_categories);
          //   this.subcategories = this.subcategories.push(value);
          // });

          // console.log('subcategories: ' , this.subcategories);

          // for(let i=0; i< this.categories.length; i++){
          //   this.subcategories.push(this.categories[i].sub_categories)
          //   console.log('subcategories: ' ,  this.subcategories);
          // }

          
          
          
        },
        (err: any) => {
          this.categories = null;
          console.log(err);
        }
    );

  }

  redirection(id){
    let idCat = id;
    console.log('cat id:', idCat);
    this.prod.getProductsCategories(idCat).subscribe(
      (data: any) => {
        console.log('success: ',data);
        this.categoriesProducts = JSON.stringify(data.data);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            shopItems: this.categoriesProducts
          }
        };
    
        this.route.navigate(["/product-left-sidebar"],  navigationExtras);
        // let categoriesProductsJson = JSON.stringify(this.categoriesProducts);
        // console.log('categoriesProductsJson: ',categoriesProductsJson);
          // this.route.navigate(['/product-left-sidebar', this.categoriesProducts]);
        // this.route.navigate(['/search-results']);
      },
      (err: any) => {
        this.categoriesProducts = null;
        console.log(err);
      }
    );
    
  }

  

}
