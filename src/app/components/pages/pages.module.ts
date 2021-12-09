import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { BlogModule } from '../blog/blog.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SuccessComponent } from './signup/success/success.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CodeValidationComponent } from './code-validation/code-validation.component';
import { EmailValidationComponent } from './email-validation/email-validation.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { FedaPayCheckoutModule } from 'fedapay-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    SharedModule,
    BlogModule,
    FedaPayCheckoutModule.forRoot({ public_key: 'pk_sandbox_XXXXXX', app_id: 'ionic.app' })
  ],
  declarations: [
    CartComponent,
    ContactComponent,
    WishlistComponent,
    CompareComponent,
    CheckoutComponent,
    MyAccountComponent,
    FaqComponent,
    AboutUsComponent,
    ErrorPageComponent,
    SigninComponent,
    SignupComponent,
    SuccessComponent,
    ForgetPasswordComponent,
    CodeValidationComponent,
    EmailValidationComponent,
    ConfirmEmailComponent

  ]
})
export class PagesModule { }
