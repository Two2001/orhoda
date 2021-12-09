import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsComponent } from '../../shop/products/products.component';
import { Payment } from 'src/app/models/Payment.model';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SigninService } from 'src/app/services/auth/signin.service';
import { Router, NavigationExtras } from '@angular/router';
import { CheckoutOptions } from 'fedapay-angular';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const AUTH_API = 'http://192.168.1.110:8000/api/';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

//   checkoutButtonOptions: CheckoutOptions = {
//     transaction: {
//         amount: 100,
//         description: 'Airtime'
//     },
//     currency: {
//         iso: 'XOF'
//     },
//     button: {
//         class: 'btn btn-primary',
//         text: 'Payer 100 FCFA'
//     },
//     onComplete(resp) {
//         const FedaPay = window['FedaPay'];
//         if (resp.reason === FedaPay.DIALOG_DISMISSED) {
//             alert('Vous avez fermé la boite de dialogue');
//         } else {
//             alert('Transaction terminée: ' + resp.reason);
//         }

//         console.log(resp.transaction);
//     }
// };

// checkoutEmbedOptions: CheckoutOptions = {
//     transaction: {
//         amount: 100,
//         description: 'Airtime'
//     },
//     currency: {
//         iso: 'XOF'
//     }
// };

  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];
  productForm: FormGroup;
  @Input() quantity:any=[];
  @Input() prodElement:any=[];
  @Input() prodElementPrice:any=[];
  @Input() prodElementNew:any=[];
  @Input() prodElementNewP:any=[];
  @Input() qtys:any=[];
  errorMessage: any;
  retour: string ;
  status: any;
  combined_order_id: any;
  valeur: any;

  amount: number;
  // payments: string[] = ['Create an Account?', 'Flat Rate'];
  // paymantWay: string[] = ['Mobile Money', 'Carte Bancaire'];
  user: any|null;
  public shopItems: boolean ;

  

  constructor(private auth: SigninService,private route: Router,private http: HttpClient,private cartService: CartService, private formBuilder: FormBuilder, public productService: ProductService, public prod: ProductsService) { }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    console.log('cartItem:', this.cartItems);
    this.cartItems.subscribe(products => this.buyProducts = products);
    this.getTotal().subscribe(amount => this.amount = amount);
    this.initForm();
    if(this.auth.isAuth()){
      this.user = this.auth.getUser();
    }else{
        this.auth.signOut();
    }

    this.productForm.setValue({
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      address: this.user.address,
      email:  this.user.email,
      phone:  this.user.phone,
    });
  }

  
  clicked(){

      this.valeur = (<HTMLInputElement>document.querySelector('input[name="test"]:checked')).value
      console.log("actif :", this.valeur);
      
  }

  pay(){
    this.prod.payments(this.valeur, this.combined_order_id).subscribe(
      (data: any) => {
        console.log('sucess',data)
        let navigationExtras: NavigationExtras = {
          queryParams: {
            shopItems: this.shopItems
          }
        };

        this.route.navigate(["/pages/cart"],  navigationExtras);

      },
      (err: any) => {
        console.log('error',err);
      }
    );
  }


  initForm() {
    this.productForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      last_name: ['', Validators.required],
      first_name: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      subject: ['', Validators.required],
      postcode: ['', Validators.required],
      content: ['', Validators.required],
    })
  }

  onSubmit() {
    // const first_name = form.value['first_name'];
    // const last_name = form.value['last_name'];
    // const email = form.value['email'];
    // const phone = form.value['phone'];
    // const address = form.value['address'];
    // let birthday = form.value['birthday'];

    let email = this.productForm.get('email')?.value;
    let first_name = this.productForm.get('first_name')?.value;
    let last_name = this.productForm.get('last_name')?.value;
    let address = this.productForm.get('address')?.value;
    let phone = this.productForm.get('phone')?.value;
    let state = this.productForm.get('state')?.value;
    
 

    let city = this.productForm.get('city')?.value;
    let subject = this.productForm.get('subject')?.value;
    let postcode = this.productForm.get('postcode')?.value;
    let content = this.productForm.get('content')?.value;

    if (first_name === ''){ first_name = this.user.first_name;  }
    if (last_name === ''){ last_name = this.user.last_name;  }
    if (address === ''){ address = this.user.address;  }
    if (email === ''){ email = this.user.email;  }
    if (phone === ''){ phone = ''+this.user.phone;  } 

    console.log('first_name: '+ first_name);
    console.log('last_name: '+ last_name);
    console.log('subject: '+  subject);
    console.log('address: '+  address);
    console.log('email: '+  email);
    console.log('city: '+  city);
    console.log('state: '+  state);
    console.log('postcode: '+  postcode);
    console.log('phone: '+  phone);
    console.log('content: '+  content);

    const paymentInfo = new Payment(first_name, last_name, email, phone, address, subject, city, state, postcode, content);

    console.log('paymentInfo: ',paymentInfo);

      this.prod.payment(paymentInfo).subscribe(
        (data: any) => {
          console.log('sucess',data)
          this.productForm.reset();
        },
        (err: any) => {
          console.log('error',err);
          this.productForm.reset();
        }
      );
  
};

public sendPanier(){

  const email = this.productForm.get('email')?.value;
    const first_name = this.productForm.get('first_name')?.value;
    const last_name = this.productForm.get('last_name')?.value;
    const address = this.productForm.get('address')?.value;
    const phone = this.productForm.get('phone')?.value;
    let state = this.productForm.get('state')?.value;
    
 

    const city = this.productForm.get('city')?.value;
    const subject = this.productForm.get('subject')?.value;
    const postcode = this.productForm.get('postcode')?.value;
    const content = this.productForm.get('content')?.value;

    console.log('first_name: '+ first_name);
    console.log('last_name: '+ last_name);
    console.log('subject: '+  subject);
    console.log('address: '+  address);
    console.log('email: '+  email);
    console.log('city: '+  city);
    console.log('state: '+  state);
    console.log('postcode: '+  postcode);
    console.log('phone: '+  phone);
    console.log('content: '+  content);

    const paymentInfo = new Payment(first_name, last_name, email, phone, address, subject, city, state, postcode, content);

    console.log('paymentInfo: ',paymentInfo);

      // this.prod.payment(paymentInfo).subscribe(
      //   (data: any) => {
      //     console.log('sucess',data)
      //     this.productForm.reset();
      //   },
      //   (err: any) => {
      //     console.log('error',err);
      //     this.productForm.reset();
      //   }
      // );
  // let qty: number = 0;
  let items: any;
  // console.log('quantity: ',this.buyProducts[0].quantity);
  // this.buyProducts.forEach(function(item, index, array) {
  //   this.qtys.push(item.quantity);
    
  //   // items = item.product;
  //   console.log(this.qtys);
    
  // });

  for(let m = 0; m < this.buyProducts.length; m++){
    this.prodElementPrice.push(this.buyProducts[m].product.price * this.buyProducts[m].quantity);
    console.log('this.prodElementPrice: ',this.prodElementPrice);
  }

  for(let k = 0; k < this.buyProducts.length; k++){
    this.qtys.push(this.buyProducts[k].quantity);
    console.log('this.qtys: ',this.qtys);
  }

  for(let i = 0; i < this.buyProducts.length; i++){
    this.prodElement.push(this.buyProducts[i]);
    console.log('this.prodElement: ',this.prodElement);
  }

  for(let j = 0; j < this.prodElement.length; j++){
    this.prodElementNew.push(this.prodElement[j].product.id);
    console.log('this.prodElementNew: ',this.prodElementNew);

    // for(let k = 0; k < this.prodElement.length; k++){
    //   this.prodElementNewP.push(this.prodElement[k]);
    //   console.log('this.prodElementNew: ',this.prodElementNew);
    // }

  } 
  
  // this.prodElement.push(items);
  
  let token = window.sessionStorage.getItem(TOKEN_KEY);
  let t = 'Bearer ' + token;
  let userCurrent = this.user;
  let data = {
    first_name: first_name,
    last_name: last_name,
    subject: subject,
    address: address,
    email: email,
    city: city,
    state: state,
    postcode: postcode,
    phone: phone,
    content: content,
    total: this.amount,
    nbrProduit: this.qtys,
    livraison: 0,
    person: userCurrent.id,
    product:  this.prodElementNew,
    amount: this.prodElementPrice
  };
  console.log('data: ',data);
  let Json = JSON.stringify(data);
  console.log('Json: ',Json);
  let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          Authorization: t
      })
  };
  this.http.post(AUTH_API + 'carts/add', data , httpOptions).subscribe(
      (dataProduct: any) => {
        console.log('success',dataProduct);
        // this.cartItems = null;
        // window.location.reload();
        this.combined_order_id = dataProduct.combined_order_id;
        this.status = true;
        this.shopItems = true;
        

        if(dataProduct.success == false){
          this.errorMessage = dataProduct.message;
          this.retour = "Retour";
        } else {
          // 
        }
    
        
        
        // this.route.navigate(['/pages/cart', { queryParams: this.shopItems}]);
        
          // let product = dataProduct['hydra:member'];
          let product = dataProduct;
          return product;
      },
      (err: any) => {
          console.log('erreur',err);
          this.status = false;
          this.prodElement = null;
          this.prodElementNew = null;
          return null;
      }
  );
}


  public getTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
    }

}
