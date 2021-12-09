import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const AUTH_API = 'http://192.168.1.110:8000/api/';
const AUTH_WITHOUT_API = 'https://192.168.1.111:8000/';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getProducts(): any{
    const indexPage = 1;
    const data={};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(AUTH_API + 'products', httpOptions);
  }

  public getProductsPromo(): any{
    const data={};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(AUTH_API + 'products/promotions', httpOptions);
  }

  public getLastProducts(): any{
    const data={};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(AUTH_API + 'products/last', httpOptions);
  }

  public getServices(): any{
    const data={};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(AUTH_API + 'services', httpOptions);
  }

  public getProductsChoiceByTeam(): any{
    const data={};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(AUTH_API + 'products/team_choices', httpOptions);
  }

  public getSliders(): any{
    const data={};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(AUTH_API + 'sliders', httpOptions);
  }

  public getAddSliders(): any{
    const data={};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(AUTH_API + 'ads', httpOptions);
  }

  public getProductsAds(): any{
    const data={};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(AUTH_API + 'product_ads', httpOptions);
  }

 

  public getCurentUserProducts(): any{
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    let t = 'Bearer ' + token;
    let data = {};
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: t
      })
    };
    this.http.post(AUTH_API + 'current/products', data , httpOptions).subscribe(
        (dataProduct: any) => {
          let products = dataProduct.data;
          console.log('La boutique',products);
          return products;
        },
        (err: any) => {
          console.log('erreur',err);
          if(err.error.code === 401 && err.error.message === 'Expired JWT Token.'){
            return [];
          }
        });
    return this.http.get(AUTH_API + 'products' , httpOptions);
  }

  public saveProduct(newProduct): any{
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    let t = 'Bearer ' + token;
    let data = {};
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: t
      })
    };
    return this.http.post(AUTH_API + 'add/product', newProduct , httpOptions);

  };

  
  public searchInfo(searchValue): any{
    console.log('valeur :', searchValue);
    let data = {
      'words': searchValue
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(AUTH_API + 'search', data , httpOptions);

  };

  public catInfo(InputValue): any{
    console.log('valeur :', InputValue);
    let data = {
      'category_id': InputValue
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(AUTH_API + 'sub-categories', data , httpOptions);

  };

  public newsletter(newsletterValue): any{
    console.log('valeur :', newsletterValue);
    let data = {
      'email': newsletterValue
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(AUTH_API + 'user/subscribe', data , httpOptions);

  };

  public ratingProducts(ratings): any{
    console.log('valeur :', ratings);
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    let t = 'Bearer ' + token;
    let data = {};
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: t
      })
    };
    return this.http.post(AUTH_API + 'product_ratings', ratings , httpOptions);

  };

  public searchResults(): any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(AUTH_API + 'search', httpOptions);

  };

  public getProductsCategories(id): any{
    let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);
    console.log('idCat:', id);
    let data = {
      id: id
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
          // Authorization: token
      })
    };
    return this.http.post(AUTH_API + 'products/category' ,data, httpOptions);

  };

  public payment(paymentInfo): any{
    let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);
    console.log('paymentInfo:', paymentInfo);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
          // Authorization: token
      })
    };
    return this.http.post(AUTH_API + 'payment', paymentInfo, httpOptions);

  };

  public payments(valeur: string, combined_order_id: number): any{
    let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);
    let data = {
      payment_type: valeur,
      combined_order_id: combined_order_id
    }
    console.log('payementdataInfo:', data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
          // Authorization: token
      })
    };
    return this.http.post(AUTH_API + 'fedapay/payment/pay', data, httpOptions);

  };

  public acceptOrdered(id): any{
    let status = true;
    let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);
    console.log('status:', status);
    console.log('id:', id);
    let data = {
      order_id: id,
      status: status
    }
    console.log('data order id:', data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
          Authorization: token
      })
    };
    return this.http.post(AUTH_API + 'order/validation', data, httpOptions);

  };

  public refuseOrdered(id): any{
    let status = false;
    let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);
    console.log('status:', status);
    console.log('id:', id);
    let data = {
      order_id: id,
      status: status
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
          Authorization: token
      })
    };
    return this.http.post(AUTH_API + 'order/validation', data, httpOptions);

  };


  
  

  public updateProduct(newProduct, id): any{
    console.log('productCurrentId: ', id);
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    let t = 'Bearer ' + token;
    let data = {
      name: newProduct.name,
      description: newProduct.description,
      currentstock: newProduct.currentstock,
      price: newProduct.price,
      category: newProduct.category,
      strokedprice: newProduct.strokedprice,
      id: id
    };
    // console.log("data: ", data);
    console.log('dataPProduct: ', data);
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: t
      })
    };
    return this.http.post(AUTH_API + 'update/product' , data , httpOptions);

  };

  public newListPrice(newProduct, id): any{
    const productCurrentId = id;
    console.log('productCurrentId: ', productCurrentId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(AUTH_API + 'product_list_prices', newProduct , httpOptions);

  };

  public deleteProduct(id): any{
    const productCurrentId = id;
    console.log('productCurrentId: ', productCurrentId);
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    let t = 'Bearer ' + token;
    let data = {};
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: t
      })
    };
    return this.http.delete(AUTH_API + 'delete/product/' + [productCurrentId] , httpOptions);
    // return this.http.post(AUTH_API + 'product/delete' , productCurrentId  , httpOptions);

  };

  public addSologan(sologan,id): any{
    // let token = 'Bearer ' + window.sessionStorage.getItem(TOKEN_KEY);
    const shopCurrentId = id;
    console.log('shopCurrentId: ', shopCurrentId);
    console.log('sologan: ', sologan);
    let data = {
      slogan: sologan
    }
    let token = window.sessionStorage.getItem(TOKEN_KEY);
    let t = 'Bearer ' + token;
   
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: t
      })
    };
    // return this.http.delete(AUTH_API + 'products/' + [productCurrentId] , httpOptions);
    return this.http.put(AUTH_API + 'shop/update/' + [id] , data , httpOptions);

  };

  public saveProductById(newProduct, id): any{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(AUTH_API + 'products/{id}', newProduct , httpOptions);

  };

  public getProductsById(): any{
    const data={};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.get(AUTH_API + 'products/{id}' , httpOptions);
  }

  
}
