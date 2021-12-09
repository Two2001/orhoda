import { animate, query, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories-products',
  templateUrl: './categories-products.component.html',
  styleUrls: ['./categories-products.component.sass'],
  animations: [
    trigger('fade', [ 
      transition('void => *', [
        style({ opacity: 0.2 }), 
        animate(5000, style({opacity: 1}))
      ]) 
    ])
  ]
})
export class CategoriesProductsComponent implements OnInit {

  private categories: any ;
  private i: number;
  public showCategories: any;
  searchText = '';

  constructor(private cat: CategoriesService) {
    this.i = 9;
   }

  ngOnInit() {
     this.cat.getCategories().subscribe(
        (data: any) => {
          this.categories = data['hydra:member'];
          console.log('categorie:' + this.categories);
          this.showCategories = this.categories.slice(0, this.i);
        },
        (err: any) => {
          this.categories = null;
          console.log(err);
        }
    );

  }

  loadMore() {
    this.i+=3;
    this.showCategories = this.categories.slice(0, this.i);
  }

}
