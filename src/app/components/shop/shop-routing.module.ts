import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import {AccueilComponent} from './home-two/accueil.component';
import { HomeThreeComponent } from './home-three/home-three.component';
import { HomeFourComponent } from './home-four/home-four.component';
import { HomeFiveComponent } from './home-five/home-five.component';
import { ProductComponent } from './products/product/product.component';
import { CategoriesProductsComponent } from './categories-products/categories-products.component';
import { ShopComponent } from './shop/shop.component';
import { ShopFormComponent } from './shop-form/shop-form.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { AuthGuardService } from 'src/app/services/auth/auth-guard.service';
import { SearchResultsComponent } from '../shared/search-results/search-results.component';
import { OrderedComponent } from './ordered/ordered.component';
import { MyorderedComponent } from './myordered/myordered.component';
// import { CategoriesComponent } from './categories/categories.component';

// Routes
const routes: Routes = [
  { path: 'one', component: HomeComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'three', component: HomeThreeComponent },
  { path: 'four', component: HomeFourComponent },
  { path: 'five', component: HomeFiveComponent },
  { path: 'categories-products', component: CategoriesProductsComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'shop-form', component: ShopFormComponent },
  { path: 'category-form', component: CategoryFormComponent },
  { path: 'product-form', component: ProductFormComponent },
  { path: 'user-profil', component: UserProfilComponent },
  { path: 'products', component: ProductComponent },
  { path: 'products/:category', component: ProductLeftSidebarComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'product-left-sidebar', component: ProductLeftSidebarComponent },
  { path: 'search-results', component: SearchResultsComponent },
  { path: 'ordered', component: OrderedComponent },
  { path: 'myordered', component: MyorderedComponent }


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
