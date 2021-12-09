import { Component, OnInit, ViewChild, Output, EventEmitter, Inject, Input } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CartService } from 'src/app/components/shared/services/cart.service';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { ProductsService } from 'src/app/services/products.service';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SigninService } from 'src/app/services/auth/signin.service';
import { FormBuilder } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.sass']
})
export class ProductDetailsComponent implements OnInit {


  public products           :   Product[] = [];
  public categories: any ;
  shop: any;
  user: any;
  isCreated: boolean;
  private dialog: MatDialog;
    modiForm = this.fb.group({
        name: [''],
        description: [''],
        code: [''],
        category: [''],
        price: [''],
    });
  // @Input('product') product: Array<Product> = [];

  constructor(
      private spinner: NgxSpinnerService,
      private fb: FormBuilder,
      private router: Router,
      private cartService: CartService,
      public dialogRef: MatDialogRef<ProductDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public product,
      private auth: SigninService, private productsService: ProductService,
      private route: Router, private cat: CategoriesService,
      private prod: ProductsService) {
      console.log('Détail du Produit',this.product);
  }

  public config: SwiperConfigInterface={};

  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;

  // // public product            :   Product = {};
  // public products           :   Product[] = [];

  public image: any;
   public zoomImage: any;

  public counter            :   number = 1;

  index: number;
  bigProductImageIndex = 0;
  public productsAll: any;


  ngOnInit() {
    this.productsService.getProducts().subscribe(product => this.products = product);


    this.getRelatedProducts();

    this.prod.getProducts().subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.productsAll = data['hydra:member'];
        console.log('produit :', this.productsAll);
      },
      (err: any) => {
        console.log('error', err);
        this.productsAll = null;
        console.log('IN ERROR');
        console.log(err);
      }
    );
  }


  ngAfterViewInit() {
    this.config = {
      observer: true,
      slidesPerView: 3,
      spaceBetween: 10,
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 3,
        },


      }
    }
  }


  public openProductDialog(product, bigProductImageIndex) {
    let dialogRef = this.dialog.open(ProductZoomComponent, {
      data: {product, index: bigProductImageIndex },
      panelClass: 'product-dialog',
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.name]);
      }
    });
  }

  public close(): void {
    this.dialogRef.close();
  }


  public selectImage(index) {
    console.log(this.product)
    console.log(index)
    this.bigProductImageIndex = index;
  }




public increment() {
  this.counter += 1;
}

public decrement() {
  if(this.counter >1){
     this.counter -= 1;
  }
}

getRelatedProducts() {
  this.prod.getProducts()
  .subscribe(
    (product: Product[]) => {
      this.products = product
    });
}

  // Add to cart
  public addToCart(product: Product,  quantity: number = 1) {
    this.cartService.addToCart(product,quantity);
    console.log(product, quantity);
  }

   // Add to cart
   public buyNow(product: Product, quantity) {
    if (quantity > 0)
      this.cartService.addToCart(product,parseInt(quantity));
      this.router.navigate(['/pages/checkout']);
 }



 public onMouseMove(e){
  if(window.innerWidth >= 1280){
    var image, offsetX, offsetY, x, y, zoomer;
    image = e.currentTarget;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
    x = offsetX/image.offsetWidth*100;
    y = offsetY/image.offsetHeight*100;
    zoomer = this.zoomViewer.nativeElement.children[0];
    if(zoomer){
      zoomer.style.backgroundPosition = x + '% ' + y + '%';
      zoomer.style.display = "block";
      zoomer.style.height = image.height + 'px';
      zoomer.style.width = image.width + 'px';
    }
  }
}

public onMouseLeave(event){
  this.zoomViewer.nativeElement.children[0].style.display = "none";
}

public openZoomViewer(){
  this.dialog.open(ProductZoomComponent, {
    data: this.zoomImage,
    panelClass: 'zoom-dialog'
  });
}



}




