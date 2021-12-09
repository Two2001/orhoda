import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../services/cart.service';
import { SidebarMenuService } from '../sidebar/sidebar-menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ProductsService } from 'src/app/services/products.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public sidenavMenuItems:Array<any>;

  public currencies = ['XOF'];
  public currency:any;
  public flags = [
    { name:'French', image: 'assets/images/flags/fr.svg' },
    { name:'English', image: 'assets/images/flags/gb.svg' },
    { name:'German', image: 'assets/images/flags/de.svg' },
    { name:'Russian', image: 'assets/images/flags/ru.svg' },
    { name:'Turkish', image: 'assets/images/flags/tr.svg' }
  ]
  public flag:any;

  products: Product[];

  indexProduct: number;
  shoppingCartItems: CartItem[] = [];
  searchForm: FormGroup;
  searchValue: string;
  public results: any;
  public newValues: any;


  constructor(private cartService: CartService,private formBuilder: FormBuilder, private searchG: ProductsService, private route: Router) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
  }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
    this.initForm();
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]],
    })
  }


  change(event) 
  {
    this.searchValue = event.target.value;
    console.log(event.target.value);
  }

  search(){
    console.log('info search: ', this.searchValue);
    // let newValue: any;
    // newValue = this.searchValue.split(' ');
    // console.log('newValue : ', newValue);
    this.searchG.searchInfo(this.searchValue).subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.newValues = JSON.stringify(data.data);
        console.log('newValues',this.newValues);
        let navigationExtras: NavigationExtras = {
          queryParams: {
            shopItems: this.newValues
          }
        };
    
        this.route.navigate(["/search-results"],  navigationExtras);
        // data.forEach(
        //   element => console.log(newValues = element),
        // );

        // data.forEach(function (value) {
        //   console.log(value);
        //   this.newValues = value;
        // });
        // this.route.navigate(['/search-results', this.newValues])


        // let newTable = JSON.stringify(data);
        // console.log('newTable :', newTable);
      //   let name = data[0].name;
      //   let description = data[0].description;
      //   let price = data[0].price;
      //   let results: NavigationExtras = {
      //     queryParams: {
      //         name: name,
      //         description: description, 
      //         price: price, 
      //     }
      // }
        
      },
      (err: any) => {
        console.log('error',err);
      }
    )
  }

  // onSubmit() {
  //   const search = this.searchForm.get('search').value;
  //   console.log('search :', search);
  // }

  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }

}
