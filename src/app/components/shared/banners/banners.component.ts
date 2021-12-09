import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.sass']
})
export class BannersComponent implements OnInit {

  @Input('banners') banner: Array<any> = [];
  public banners: any;

  constructor(private product: ProductsService) { }

  ngOnInit() {
    this.product.getProductsAds().subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.banners = data;
        console.log('Les banners :', this.banners);
      },
      (err: any) => {
        console.log('error', err);
        this.banners = null;
        console.log('IN ERROR');
        console.log(err);
      }
    );
  }

  public getBannerTextColor(index){
    // console.log('color:', this.banners[index].adsTextColor.color);
    return this.banners[index].adsTextColor.color;
  }

  public getBanner(index){
    return this.banners[index];
  }

  public getBg(index){
    let url = this.banners[index].image;
    return 'https://192.168.1.111:8000/' + url;
    // return this.banner[index].image;
  }


  public getBgImage(index){
    let bgImage = {
      'background-image': index != null ? "url(https://192.168.1.111:8000/" + this.banner[index].image + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)"
    };
    // console.log('bg: ', this.banner[index].image);
    return bgImage;
  }
}
