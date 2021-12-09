import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
import { Products } from 'src/app/models/Products.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { ProductService } from '../../shared/services/product.service';
import {SigninService} from "../../../services/auth/signin.service";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {

  isCreated: boolean;
  errorMessage: string = "L'ajout de produit a échoué";
  successMessage: string = "Produit créé avec succès!";
  shop: any;
  user: any;
  searchForm: FormGroup;
  searchValue: string;
  public results: any;
  public newValues: any;
  public newProduct: any;
  @Input() tabProduct:any=[];

  public categories: any ;
  public subcategories: any ;

  constructor(private auth: SigninService, private productService: ProductsService,
    private route: Router, private cat: CategoriesService, private searchG: ProductsService) { }


ngOnInit() {
  this.cat.getCategories().subscribe(
    (data: any) => {
      this.categories = data.data;
    },
    (err: any) => {
      this.categories = null;
      console.log(err);
    });
    if(this.auth.isAuth()){
    this.user = this.auth.getUser();
    if(this.user.shop.length === 0){
      this.route.navigate(['/orhoda/shop-form']);
    }else{
      this.shop = this.user.shop.data[0];
      console.log('La boutique',this.shop);
    }
  }else{
    this.auth.signOut();
  }
  this.subcategories = null;

}


myFunction() {
  var inputValue = (<HTMLInputElement>document.getElementById("mySelect")).value;
  console.log("inputValue: ", inputValue);
  this.searchG.catInfo(inputValue).subscribe(
    (data: any) => {
      console.log('sucess',data);
      this.subcategories  = data.childs_categories;
      
    },
    (err: any) => {
      console.log('error',err);
    }
  )
}


onSubmit(form: NgForm) {
  const name = form.value['name'];
  const description = form.value['description'];
  const current_stock = form.value['current_stock'];
  let category = form.value['category'];
  let child_category = form.value['child_category'];
  let price = form.value['price'];
  let min = form.value['min'];
  let max = form.value['max'];
  let stroked_price = form.value['stroked_price'];
  console.log("this.shop.data.id: ", this.shop.id);
  let shoplink = '/api/shops/' + this.shop.id;

  this.newProduct = new Products(name, description, current_stock,category, price, shoplink, stroked_price, min, max, child_category );

  console.log('newProduct: ',this.newProduct);

  this.tabProduct.push(this.newProduct);


  console.log('tabProduct: ',this.tabProduct);



  
}

validation(){
  this.productService.saveProduct(this.tabProduct).subscribe(
    (data: any) => {
      console.log('sucess',data)
      this.isCreated = true;
      // this.auth.updateUser();
      this.user = this.auth.getUser();
      this.shop = this.user.shop;
      // this.route.navigate(['/orhoda/shop']);
    },
    (err: any) => {
      console.log('error',err);
      this.isCreated = false;
    }
  );
}

}
