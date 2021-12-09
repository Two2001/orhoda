import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainCarouselComponent } from './main-carousel/main-carousel.component';
import { PriceComponent } from './products/price/price.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { ProfilDialogComponent } from './user-profil/profil-dialog/profil-dialog.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { ProductVerticalComponent } from './products/product-vertical/product-vertical.component';
import { CommonModule } from '@angular/common';
import { ShopRoutingModule } from './shop-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxPaginationModule} from 'ngx-pagination';
import {AccueilComponent} from './home-two/accueil.component';
import { HomeThreeComponent } from './home-three/home-three.component';
// Import the library
import { NgxImageZoomModule } from 'ngx-image-zoom';

import { ProductCarouselComponent } from './../shop/home/product-carousel/product-carousel.component';
import { from } from 'rxjs';
import { ProductCarouselTwoComponent } from './home-two/product-carousel-two/product-carousel-two.component';
import { ProductCarouselThreeComponent } from './home-three/product-carousel-three/product-carousel-three.component';
import { BrandsComponent } from './widgets/brands/brands.component';
import { CategoriesComponent } from './widgets/categories/categories.component';
import { PopularProductsComponent } from './widgets/popular-products/popular-products.component';
import { HomeFourComponent } from './home-four/home-four.component';
import { ProductZoomComponent } from './products/product-details/product-zoom/product-zoom.component';
import { HomeFiveComponent } from './home-five/home-five.component';
import { CategoriesProductsComponent } from './categories-products/categories-products.component';
import { FilterPipe } from './categories-products/filter.pipe';
import { ShopComponent } from './shop/shop.component';
import { ShopFormComponent } from './shop-form/shop-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { DeleteProductDialogComponent } from './products/delete-product-dialog/delete-product-dialog.component';
import { ProductDialogTwoComponent } from './products/product-dialog-two/product-dialog-two.component';
import { PriceModalComponent } from './products/price-modal/price-modal.component';
import { ProductCarouselLastProductComponent } from './home-two/product-carousel-last-product/product-carousel-last-product.component';
import { ModalCategoriesComponent } from './categories-products/modal-categories/modal-categories.component';
import { ModalProductComponent } from './home-two/product-carousel-two/modal-product/modal-product.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
import { OrderedComponent } from './ordered/ordered.component';
import { MyorderedComponent } from './myordered/myordered.component';
import { SologanModalComponent } from './shop/sologan-modal/sologan-modal.component';
import { DetailOrderComponent } from './myordered/detail-order/detail-order.component';
import { ResetPasswordComponent } from './user-profil/reset-password/reset-password.component';
import { ResestPassword } from 'src/app/models/ResetPassword.model';
import { AddsComponent } from './adds/adds.component';


@NgModule({
  declarations: [
    HomeComponent,
    MainCarouselComponent,
    ProductsComponent,
    PriceComponent,
    ProductComponent,
    ProductDetailsComponent,
    ProductDialogComponent,
    ProfilDialogComponent,
    ProductLeftSidebarComponent,
    ProductVerticalComponent,
    AccueilComponent,
    HomeThreeComponent,

    ProductCarouselComponent,
    ProductCarouselTwoComponent,
    ProductCarouselThreeComponent,
    BrandsComponent,
    CategoriesComponent,
    PopularProductsComponent,
    HomeFourComponent,
    ProductZoomComponent,
    HomeFiveComponent,
    CategoriesProductsComponent,
    FilterPipe,
    ShopComponent,
    ShopFormComponent,
    CategoryFormComponent,
    ProductFormComponent,
    UserProfilComponent,
    DeleteProductDialogComponent,
    ProductDialogTwoComponent,
    ProfilDialogComponent,
    PriceModalComponent,
    ProductCarouselLastProductComponent,
    ModalCategoriesComponent,
    ModalProductComponent,
    ProductGridComponent,
    OrderedComponent,
    MyorderedComponent,
    SologanModalComponent,
    DetailOrderComponent,
    ResetPasswordComponent,
    AddsComponent
    
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    SharedModule,
    SwiperModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    NgxImageZoomModule.forRoot() // <-- Add this line

  ],
  exports: [
    ProductDialogComponent,
    ProfilDialogComponent,
    ProductZoomComponent,
    DeleteProductDialogComponent,
    PriceModalComponent,
    ProductDetailsComponent,
    ModalCategoriesComponent,
    ModalProductComponent,
    SologanModalComponent,
    DetailOrderComponent,
    ResetPasswordComponent

  ],

  entryComponents:[
    ProductDialogComponent,
    ProfilDialogComponent,
    ProductZoomComponent,
    DeleteProductDialogComponent,
    PriceModalComponent,
    ProductDetailsComponent,
    ModalCategoriesComponent,
    ModalProductComponent,
    SologanModalComponent,
    DetailOrderComponent,
    ResetPasswordComponent
  ],
})

export class ShopModule { }
