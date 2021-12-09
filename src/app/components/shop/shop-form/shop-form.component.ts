import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, PatternValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Shop } from 'src/app/models/Shop.model';
import { ShopService } from 'src/app/services/shop.service';
import {SigninService} from "../../../services/auth/signin.service";

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.sass']
})
export class ShopFormComponent implements OnInit {

  isCreated: boolean;
  errorMessage: string = "La création de la boutique a échoué";
  successMessage: string = "Boutique créée avec succès!";
  shopForm: FormGroup;
  user: any;
  private tokken: string;

  constructor(private shop: ShopService, private formBuilder: FormBuilder,
              private router: Router,private auth: SigninService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.shopForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      rrcm: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    })
  }

  onSubmit() {
    if(this.auth.isAuth()){
      this.user = this.auth.getUser();
      this.tokken = this.auth.getToken();
    }else {
      this.auth.signOut();
    }
    const email = this.shopForm.get('email').value;
    const name = this.shopForm.get('name').value;
    const telephone = this.shopForm.get('phone').value;
    const address = this.shopForm.get('address').value;
    const rrcm = this.shopForm.get('rrcm').value;

    console.log('email: '+ email);
    // console.log('address: '+ address);

    const newShop = new Shop(name, email, telephone, address, rrcm, '/api/users/'+this.user.id);

    console.log('laboutique: ',newShop);


    this.shop.saveShop(newShop,this.tokken).subscribe(
      (data: any) => {
        console.log('sucess create shop',data);
        console.log(data['@id']);
        this.isCreated = true;
        this.router.navigate(['/orhoda/user-profil']);
      },
      (err: any) => {
        console.log('error create shop',err);
        if (err.error.code === 401){
          if(err.error.message === 'Expired JWT Token'){
            this.auth.signOut();
          }
        }
        this.isCreated = false;
      }
    );
}

}
