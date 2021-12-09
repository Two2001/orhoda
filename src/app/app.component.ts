import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // animation triggers go here
  ]
})
export class AppComponent {

  title = 'ORHODA';
  params;

  constructor(private spinner: NgxSpinnerService,private http: HttpClient) {
    this.http.get('assets/parameters.json').subscribe(data =>{
      this.params = data;
    });
  }


  ngOnInit() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);

    window.scroll(0,0);
  }

}
