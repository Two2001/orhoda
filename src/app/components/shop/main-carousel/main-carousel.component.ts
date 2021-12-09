import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.sass']
})
export class MainCarouselComponent implements OnInit {

  @Input('slides') slides: Array<any> = [];

  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  public sliders: any;

  constructor(private product: ProductsService) { }

  ngOnInit() {
    this.product.getSliders().subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.sliders = data.data;
        console.log('sliders :', this.sliders);
        console.log("https://192.168.43.125/"+this.sliders[0].image);
      },
      (err: any) => {
        console.log('error', err);
        this.sliders = null;
        console.log('IN ERROR');
        console.log(err);
      }
    );

  }

  ngAfterViewInit(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
      grabCursor: true,
      loop: false,
      preloadImages: false,
      lazy: true,
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide"
    }
  }




}
