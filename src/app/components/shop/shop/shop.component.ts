import { Component, Input, OnInit } from '@angular/core';
import {SigninService} from '../../../services/auth/signin.service';
import {Router} from '@angular/router';
import {Product} from '../../../modals/product.model';
import {ProductService} from '../../shared/services/product.service';
import {CartService} from '../../shared/services/cart.service';
import {WishlistService} from '../../shared/services/wishlist.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductDialogComponent} from '../products/product-dialog/product-dialog.component';
import {MatDialog} from '@angular/material/dialog'
import {ProductsService} from '../../../services/products.service';
import { DeleteProductDialogComponent } from '../products/delete-product-dialog/delete-product-dialog.component';
import { ProductDialogTwoComponent } from '../products/product-dialog-two/product-dialog-two.component';
import { ModalDismissReasons, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import {NgxSpinnerService} from 'ngx-spinner';
import { PriceModalComponent } from '../products/price-modal/price-modal.component';
import { ProductDetailsComponent } from '../products/product-details/product-details.component';
import { SologanModalComponent } from './sologan-modal/sologan-modal.component';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const AUTH_API = 'http://192.168.1.110:8000/api/';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.sass'],
  providers: [NgbModalConfig, NgbModal]
})
export class ShopComponent implements OnInit {
  closeResult = '';
  user: any|null;
  shop = [];
  products: any[];
  productLine = [];
  countProduct: number;
  countPage: number[];
  currency: string;
  imgTmp: any|null;
  imgUpdateTmp: any|null;
  loader: boolean;
  loaderBottom: boolean;
  private params;
  public currentPage;
  @Input('product') product: Array<Product> = [];

  constructor(
      private spinner: NgxSpinnerService,
      config: NgbModalConfig,
      private modalService: NgbModal,
      private dialog: MatDialog,
      private http: HttpClient,
      private auth: SigninService,
      private wishlistService: WishlistService,
      private route: Router ,
      private cartService: CartService,
      private productService: ProductService,
      private productsService: ProductsService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.user = null;
    this.currency = this.productService.currency;
    this.products = productsService.getCurentUserProducts();
    this.params = this.http.get('assets/parameters.json');
    console.log('p', this.products);
  }

  ngOnInit(): void {
      this.spinner.show();
    if(this.auth.isAuth()){
      this.user = this.auth.getUser();
      this.getCountProducts();
      if(this.user.shop.data.length > 0){
          this.shop = this.user.shop.data[0];
      }else {
          this.route.navigate(['/orhoda/shop-form']);
      }
      this.showpProductsPage(1);
    }else{
        this.auth.signOut();
    }
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
          let httpOptions = {
              headers: new HttpHeaders({
                  'Content-Type':  'application/json',
                  Authorization: token
              })
          };
          this.params.subscribe(p =>{
              this.http.post(p.url_site + 'current/products?page=' + page, {} , httpOptions).subscribe(
                  (dataProduct: any) => {
                      let line = dataProduct.data
                      console.log("products  line alls: ", line);
                      this.loader = true;
                      this.products = line;
                      this.productLine.push(line);
                      this.spinner.hide();
                  },
                  (err: any) => {
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
                console.log("data count products: ", data.totalProducts);
                  this.countProduct = data.totalProducts;
                  let x = Math.floor(data.totalProducts / 16);
                  let y = data.totalProducts % 16;
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

  public openProductDialog(products){
    console.log('in modal product :', products)
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: products,
        panelClass: 'product-dialog',
    });
    console.log("dialodRef: ", dialogRef);
    dialogRef.afterClosed().subscribe(products => {
      if(products){
        this.route.navigate(['/products', products.id, products.name]);
      }
    });
    
  }

  //openProductDetailDialog

  public openProductDetailDialog(products){
    let dialogDeleteRef = this.dialog.open(ProductDetailsComponent, {
        data: products,
        panelClass: 'details-product-dialog',
    });
    console.log("dialogDeleteRef: ", dialogDeleteRef);
    console.log("products: ", products);

    dialogDeleteRef.afterClosed().subscribe(products => {
      if(products){
        this.route.navigate(['/products', products.id, products.name]);
      }
    });
  }

  public openDeleteProductDialog(products){
    let dialogDeleteRef = this.dialog.open(DeleteProductDialogComponent, {
        data: products,
        panelClass: 'delete-product-dialog',
    });
    console.log("dialogDeleteRef: ", dialogDeleteRef);
    dialogDeleteRef.afterClosed().subscribe(products => {
      if(products){
        this.route.navigate(['/products', products.id, products.name]);
      }
    });
  }

  public openSologanModal(shop){
    let dialogDeleteRef = this.dialog.open(SologanModalComponent, {
        data: shop,
        panelClass: 'delete-product-dialog',
    });
    console.log("dialogDeleteRef: ", dialogDeleteRef);
    dialogDeleteRef.afterClosed().subscribe(shop => {
      if(shop){
        this.route.navigate(['/products', shop.id, shop.name]);
      }
    });
  }

  public removeItem(product: Product) {
    this.productService.removeFromCompare(product);
  }

  private addProduitPhoto(p: any){
    if ( !this.auth.isAuth() ){
      this.auth.signOut();
    }
    else{
      let token = window.sessionStorage.getItem(TOKEN_KEY);
      console.log(token);
      let t = 'Bearer '+token;
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: t
        })
      };
      if ( p != null ){
        this.http.post(
            AUTH_API + 'product/image-upload',
            {
              // description: p.name,
              image: this.imgTmp,
              // imageName: p.name,
              // product: '/api/products/'+p.id
              id: p.id
            },
            httpOptions).subscribe(
            (dataPhoto: any) => {
              console.log('Image Ajouter ', dataPhoto);
              window.location.reload();
            },
            (err: any) => {
              console.log(err);
              if(err.error.code === 401){
                if(err.error.message === "Expired JWT Token"){
                    this.auth.signOut();
                }
              }
            }
        );
      }

    }
  }

  public imageChangeEvent(event: any,p: any):any {
    let reader = new FileReader();
    reader.onload = ( event: any) => {
      this.imgTmp = event.target.result;
      console.log('product for image', this.imgTmp );
      this.addProduitPhoto(p);

    };
    reader.readAsDataURL(event.target.files[0]);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  private addUpdateProduitPhoto(p: any){
    if ( !this.auth.isAuth() ){
      this.auth.signOut();
    }
    else{
      let token = window.sessionStorage.getItem(TOKEN_KEY);
      console.log(token);
      let t = 'Bearer '+token;
      let httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: t
        })
      };
      if ( p != null ){
        this.http.post(
            AUTH_API + 'product/image-update/',
            {
              // description: p.name,
              image: this.imgUpdateTmp,
              // imageName: p.name,
              id: p.id
            },
            httpOptions).subscribe(
            (dataPhoto: any) => {
              console.log('Image Ajouter ', dataPhoto);
              window.location.reload();
            },
            (err: any) => {
              console.log(err);
              if(err.error.code === 401){
                if(err.error.message === "Expired JWT Token"){
                    this.auth.signOut();
                }
              }
            }
        );
      }

    }
  }

  public imageUpdateChangeEvent(event: any,p: any):any {
    let reader = new FileReader();
    reader.onload = ( event: any) => {
      this.imgUpdateTmp = event.target.result;
      console.log('product for image', this.imgUpdateTmp );
      this.addUpdateProduitPhoto(p);

    };
    reader.readAsDataURL(event.target.files[0]);
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  public getShop(){
      let token = window.sessionStorage.getItem(TOKEN_KEY);
      let t = 'Bearer ' + token;
      let data = {};
      let httpOptions = {
          headers: new HttpHeaders({
              'Content-Type':  'application/json',
              Authorization: t
          })
      };
      this.http.post(AUTH_API + 'current/shop', data , httpOptions).subscribe(
          (dataShop: any) => {
              let shop = JSON.parse(dataShop)[0];
              console.log('La boutique',shop);
              return shop;
          },
          (err: any) => {
              console.log('erreur',err);
              return null;
          }
      );
  }

  public getProducts(){
        // let indexPage = 1;
        let token = window.sessionStorage.getItem(TOKEN_KEY);
        let t = 'Bearer ' + token;
        let data = {};
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                Authorization: t
            })
        };
        // this.http.post(AUTH_API + 'current/products?' + 'page=' + [indexPage] , data , httpOptions).subscribe(
        this.http.post(AUTH_API + 'current/products', data , httpOptions).subscribe(
            (dataProduct: any) => {
                let product = dataProduct.data;
                console.log("products alls: ", product);
                return product;
            },
            (err: any) => {
                console.log('erreur',err);
                return null;
            }
        );
    }

  public getImage(id){
        let data = {};
      const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
        this.http.post(AUTH_API + 'product/image/'+id, data , httpOptions).subscribe(
            (dataImage: any) => {
                let img = JSON.parse(dataImage);
                console.log('image',img[0].image64);
                return img[0].image64;
            },
            (err: any) => {
                return '';
            }
        );
    }

  

    

}
