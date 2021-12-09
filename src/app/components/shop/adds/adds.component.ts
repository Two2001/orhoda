import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-adds',
  templateUrl: './adds.component.html',
  styleUrls: ['./adds.component.sass']
})
export class AddsComponent implements OnInit {

  @Input('slides') slides: Array<any> = [];



  public sliders: any;

  constructor(private adds: ProductsService) { }

  ngOnInit() {
    this.adds.getAddSliders().subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.sliders = data.data;
        console.log('adds sliders :', this.sliders);
        console.log("https://192.168.43.125/"+this.sliders[0].banner);
      },
      (err: any) => {
        console.log('error', err);
        this.sliders = null;
        console.log('IN ERROR');
        console.log(err);
      }
    );

  }



}
