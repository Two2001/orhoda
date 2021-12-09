import { Component, OnInit, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../../shared/services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {

  public cartItems : Observable<CartItem[]> = of([]);
  public shoppingCartItems  : CartItem[] = [];
  results: any;
  tabMessage: any = null;
  searchValue: string;
  message: string = "";
  @Input() tMessage:any=[];

  constructor(private cartService: CartService, public route: ActivatedRoute, public router: Router) { 
    // this.message = null;
  }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    console.log('cartItems:', this.cartItems);
    this.cartItems.subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    console.log('shoppingCartItems:', this.shoppingCartItems);
    // this.route
    // .params
    // .subscribe(
    //   params => this.results = params,  
    // );
    // console.log('results: ', this.results);
    this.route.queryParams.subscribe(params => {
      this.results = params;
      console.log('results dedans: ', this.results);
    });
    console.log('results: ', this.results);
    if(this.results.shopItems == "true"){
      // this.removeItem(true);
      // this.shoppingCartItems = null;
      let a = JSON.stringify(this.shoppingCartItems);
      let b = this.shoppingCartItems.toString();
      console.log("a: ", a);
      console.log("b: ", b);
      window.localStorage.removeItem(a);
      console.log('ok');
      // window.location.reload();
    }
  }

  change() 
  {
    var inputValue = (<HTMLInputElement>document.getElementById("mySelect")).value;
    console.log("inputValue: ", inputValue);
    
  }

  verification(){
    console.log("quantity: ", this.shoppingCartItems);
    for(let i=0; i < this.shoppingCartItems.length; i++){
      // console.log(this.shoppingCartItems[i].product.description);
      if(!(this.shoppingCartItems[i].quantity >= this.shoppingCartItems[i].product.min_qty && this.shoppingCartItems[i].quantity <= this.shoppingCartItems[i].product.max_qty)){
        this.message = "La quantité du produit "+this.shoppingCartItems[i].product.name+" doit être comprise entre "+this.shoppingCartItems[i].product.min_qty+" et "+this.shoppingCartItems[i].product.max_qty+" .";
        this.tMessage.push(this.message);
        this.tabMessage = false;
      } 

      // if(this.shoppingCartItems[i].quantity >= this.shoppingCartItems[i].product.min_qty || this.shoppingCartItems[i].quantity <= this.shoppingCartItems[i].product.max_qty){
      //   this.router.navigate(["/pages/checkout"]);
      // }
      else if(this.shoppingCartItems[i].quantity >= this.shoppingCartItems[i].product.min_qty && this.shoppingCartItems[i].quantity <= this.shoppingCartItems[i].product.max_qty){
        this.tabMessage = true;
        
      }

      console.log("tMessage: ", this.tMessage);
    }

    console.log("tabMessage: ", this.tabMessage);

    if(this.tabMessage == true){
      this.router.navigate(["/pages/checkout"]);
    }

    
    
  }


    // Remove cart items
    public removeItem(item: CartItem) {
      this.cartService.removeFromCart(item);
    }


   // Increase Product Quantity
   public increment(product: any, quantity: number = 1) {
    this.cartService.updateCartQuantity(product,quantity);
  }

  // Decrease Product Quantity
  public decrement(product: any, quantity: number = -1) {
    this.cartService.updateCartQuantity(product,quantity);
  }
   // Get Total
   public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

}
