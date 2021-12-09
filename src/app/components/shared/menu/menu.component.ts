import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(public cat: CategoriesService) { }

  public categories: any ;
  public showCategories: any;

  ngOnInit() {
    this.cat.getCategories().subscribe(
      (data: any) => {
        this.categories = data['hydra:member'];
        console.log('categorie:' , this.categories);
        // this.showCategories = this.categories.slice(0, this.i);
      },
      (err: any) => {
        this.categories = null;
        console.log(err);
      }
  );
  }
  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }
    });
  }
}
