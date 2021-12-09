import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})


export class FooterComponent implements OnInit {

  newsletterForm: FormGroup;
  newsletterValue: string;
  newValues: any;

  constructor(private formBuilder: FormBuilder,private newsletterG: ProductsService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.newsletterForm = this.formBuilder.group({
      newsletter: ['', [Validators.required]],
    })
  }

  change(event) 
  {
    this.newsletterValue = event.target.value;
    console.log(event.target.value);
  }

  addNewsletter(){
    console.log('info search: ', this.newsletterValue);
    this.newsletterG.newsletter(this.newsletterValue).subscribe(
      (data: any) => {
        console.log('sucess',data);
        this.newValues = data;
        window.location.reload();
      },
      (err: any) => {
        console.log('error',err);
      }
    )
  }

}
