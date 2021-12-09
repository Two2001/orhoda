import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsComponent } from '../../shop/products/products.component';
import { ModalSearchProductsComponent } from './modal-search-products/modal-search-products.component';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.sass']
})
export class SearchResultsComponent implements OnInit {

  // public productsResults: any;
  public results: any;
  @Input() Results:any=[];
  @Input() productsResults:any=[];
  @Input() productsResultsNew:any=[];
  @Input() shopResults:any=[];
  @Input() shopResultsNew:any=[];
  @Input() categoryResults:any=[];
  @Input() categoryResultsNew:any=[];
  productsResultsLength: boolean;
  shopResultsLength: boolean;
  categoryResultsLength: boolean;
  products: any[];
      


  constructor(private dialog: MatDialog,private search: ProductsService, private router: ActivatedRoute, private route: Router ) {
               }

  ngOnInit(): void {
    // this.results = this.router
    //       .params
    //       .subscribe(
    //         params => this.Results = params,
            
    //       );
    //       console.log('Results :' ,this.Results);

    this.router.queryParams.subscribe(params => {
      this.Results = params;
      console.log('Results dedans: ', this.Results);
    });
    console.log('Results: ', this.Results);

          this.productsResults = JSON.parse(this.Results.shopItems);
          for(var i in this.productsResults)
            this.productsResultsNew.push([i, this.productsResults [i]]);
            if(this.productsResults.length > 0){
              this.productsResultsLength = false;
            }else{
              this.productsResultsLength = true;
            }
            // console.log('productsResultsNew :' ,this.productsResultsNew);


          this.categoryResults = JSON.parse(this.Results.catResult);
          for(var i in this.categoryResults)
            this.categoryResultsNew.push([i, this.categoryResults [i]]);
            if(this.categoryResults.length > 0){
              this.categoryResultsLength = false;
            }else{
              this.categoryResultsLength = true;
            }
            // console.log('categoryResultsNew :' ,this.categoryResultsNew);


          this.shopResults = JSON.parse(this.Results.shopResult);
          for(var i in this.shopResults)
            this.shopResultsNew.push([i, this.shopResults [i]]);
            if(this.shopResults.length > 0){
              this.shopResultsLength = false;
            }else{
              this.shopResultsLength = true;
            }
            // console.log('shopResultsNew :' ,this.shopResultsNew);
          

          console.log('productsResults :' ,this.productsResults);
          console.log('categoryResults :' ,this.categoryResults);
          console.log('shopResults :' ,this.shopResults);
          // console.log('Results :', JSON.parse(this.Results));
          // this.productsResultsJson = JSON.parse(this.productsResults);
          // console.log('productsResults Json :', this.productsResultsJson);
    
    // this.search.searchResults().subscribe(
    //   (data: any) => {
    //     console.log('sucess');
    //     this.productsResults = data;
    //     console.log('searchResults :', this.productsResults);
    //   },
    //   (err: any) => {
    //     console.log('error',err);
    //     this.productsResults = null;
    //   }
    // )
  }

  public openProductSearchDialog(products, id){
    console.log('my product:', products);
    console.log('my product id:', id);
    let dialogDeleteRef = this.dialog.open(ModalSearchProductsComponent, {
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

}
