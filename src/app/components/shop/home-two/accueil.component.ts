
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { CartService } from '../../shared/services/cart.service';
import { ModalCategoriesComponent } from '../categories-products/modal-categories/modal-categories.component';
import { MatDialog } from '@angular/material';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.sass']
})
export class AccueilComponent implements OnInit {


  products: Product[];
  public banners = [];
  results: any;

  shoppingCartItems: CartItem[] = [];
  wishlistItems  :   Product[] = [];

  public services: any;

  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;

  public slides = [
    { title: 'Promo', subtitle: 'à partir de 50%', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Meilleur Qualité', subtitle: 'Meilleur Prix', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'Déstocage de produits', subtitle: 'A Ne pas raté ', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Nos meilleurs produits', subtitle: 'Sélectionnés pour vous', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'Grande vente', subtitle: 'Aujourd\'hui', image: 'assets/images/carousel/banner5.jpg' }
  ];

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService, private product: ProductsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.productService.getProducts()
    .subscribe(
      (product: Product[]) => {
        this.products = product;
      }
    )
    this.productService.getBanners()
    .subscribe(
      data => this.banners = data
    );

    this.product.getServices().subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.services = data;
        console.log('services :', this.services);
      },
      (err: any) => {
        console.log('error', err);
        this.services = null;
        console.log('IN ERROR');
        console.log(err);
      }
    );

    
  }

  public openCategorieModalDialog(products){
    let dialogRef = this.dialog.open(ModalCategoriesComponent, {
        data: products,
        panelClass: 'product-dialog',
    });
    console.log("dialodRef: ", dialogRef);
    dialogRef.afterClosed().subscribe(products => {
      if(products){
        // this.route.navigate(['/products', products.id, products.name]);
      }
    });
    
  }

}

