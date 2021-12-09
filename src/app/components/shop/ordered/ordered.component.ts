import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product } from 'src/app/modals/product.model';
import { SigninService } from 'src/app/services/auth/signin.service';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from '../../shared/services/cart.service';
import { ProductService } from '../../shared/services/product.service';
import { WishlistService } from '../../shared/services/wishlist.service';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const AUTH_API = 'http://192.168.1.110:8000/api/';

@Component({
  selector: 'app-ordered',
  templateUrl: './ordered.component.html',
  styleUrls: ['./ordered.component.sass']
})
export class OrderedComponent implements OnInit {

  closeResult = '';
  user: any|null;
  shop = [];
//   products: any[];
  @Input() products:any=[];
  @Input() productLine:any=[];
//   productLine = [];
  countProduct: number;
  countPage: number[];
  currency: string;
  imgTmp: any|null;
  loader: boolean;
  loaderBottom: boolean;
  private params;
  public currentPage;
  @Input('product') product: Array<Product> = [];
  refuseMessage: string = "Non livré";
  refusesMessage: string = "Décliné";
  acceptMessage: string = "Livré";
  refuseMessageStatus: boolean;
  acceptMessageStatus: boolean;
  buttonStatus: boolean ;

  constructor(
    private spinner: NgxSpinnerService,
      private http: HttpClient,
      private auth: SigninService,
      private wishlistService: WishlistService,
      private route: Router ,
      private cartService: CartService,
      private productService: ProductService,
      private productsService: ProductsService
  ) {
    this.user = null;
    this.currency = this.productService.currency;
    this.params = this.http.get('assets/parameters.json');
    console.log('p', this.products);
  }

  ngOnInit(): void {
      this.spinner.show();
    if(this.auth.isAuth()){
      this.user = this.auth.getUser();
      this.getCountProducts();
    //   this.getProductsOrdered();
      if(this.user.shop.data.length > 0){
          this.shop = this.user.shop.data[0];
          
      }else{
          this.route.navigate(['/orhoda/shop-form']);
      }
      this.showpProductsPage(1);
    }else{
        this.auth.signOut();
    }
    console.log('view shop: ', this.shop);
  }

  public showpProductsPage(page: number): void{
      this.currentPage = page;
      this.spinner.show();
      let start = 1 + (page - 1)*4;
      let end = start + 4;
      this.productLine = [];
      for (let i=start; i<end; i++){
          this.showpProductsLine(i);
      }
  }

  public showpProductsLine(page: number): void{
          let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);
          let data = {
            seller_id: this.user.id,
            // shop_id: this.user.shop.data[0].id
          }
          let httpOptions = {
              headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  Authorization: token
              })
          };
          this.params.subscribe(p =>{
              this.http.post(p.url_site + 'seller/orders', data , httpOptions).subscribe(
                  (dataProduct: any) => {
                    let line = dataProduct.data
                      console.log('line: ', line)
                      this.loader = true;
                      // this.productLine = [];
                      this.products = line;
                      console.log('productLine avant: ', this.productLine)
                      console.log('productLine: ', this.productLine)
                      this.productLine = line;
                      this.spinner.hide();
                  },
                  (err: any) => {
                    this.product = null;
                    this.productLine = null;
                      console.log('shop erreur',err);
                      if(err.error.code === 401 && err.error.message === 'Expired JWT Token'){
                          this.auth.signOut();
                      }
                  });
          });

  }

  public getCountProducts(){
      let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);
      let httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
              Authorization: token
          })
      };
      this.params.subscribe(p =>{
          this.http.get(p.url_site + 'current/count/products' , httpOptions).subscribe(
              (data: any) => {
                  this.countProduct = data;
                  let x = Math.floor(data / 16);
                  let y = data % 16;
                  if (y > 0){
                    this.countPage = Array(x + 1);
                  }else {
                      this.countPage = Array(x);
                  }
              },
              (err: any) => {
                  console.log('Nombre de produit erreur',err);
                  if(err.error.code === 401 && err.error.message === 'Expired JWT Token'){
                      this.auth.signOut();
                  }else{
                      this.countProduct = 0;
                      this.getCountProducts();
                  }
              });
      });
  }

  public previousPage(){
      let page = this.currentPage - 1;
      if (page > 0){
          this.showpProductsPage(page);
      }
  }

    public nextPage(){
        let page = this.currentPage + 1;
        if (page <= this.countPage.length){
            this.showpProductsPage(page);
        }
    }

  public goToAddForm(){
    this.route.navigate(['orhoda/product-form']);
  }

  public addToCompare(product: Product) {
    this.productService.addToCompare(product);
  }

  public addToCart(products,  quantity: number = 1) {
    console.log('voila: ', products);
    this.cartService.addToCart(products,quantity);
    console.log(products, quantity);
  }

   // Add to wishlist
   public addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product);
 }

  public removeItem(product: Product) {
    this.productService.removeFromCompare(product);
  }

  public accept(id){
      this.productsService.acceptOrdered(id).subscribe(
          (dataProduct: any) => {
              console.log('success');
              this.acceptMessageStatus = true;
              this.buttonStatus = false;
              window.location.reload();
              // this.products = dataProduct['hydra:member'];
              // return this.products;
          },
          (err: any) => {
              console.log('erreur',err);
              this.buttonStatus = true;
              // this.products = null;
              // return null;
          }
      );
  }

  public refuseOrder(id){
      this.productsService.refuseOrdered(id).subscribe(
          (dataProduct: any) => {
              console.log('success');
              this.refuseMessageStatus = true;
              this.buttonStatus = false;
              window.location.reload();
              // this.products = dataProduct['hydra:member'];
              // return this.products;
          },
          (err: any) => {
              console.log('erreur',err);
              this.buttonStatus = true;
              // this.products = null;
              // return null;
          }
      );
  }




//   public getProductsOrdered(){
//       let idShop = this.user.shop[0].id;
//         this.productsService.getProductOrdered(idShop).subscribe(
//             (dataProduct: any) => {
//                 console.log('success',dataProduct);
//                 this.products = dataProduct['hydra:member'];
//                 return this.products;
//             },
//             (err: any) => {
//                 console.log('erreur',err);
//                 this.products = null;
//                 return null;
//             }
//         );
//     }

  

}
