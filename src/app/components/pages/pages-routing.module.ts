import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqComponent } from './faq/faq.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SuccessComponent } from './signup/success/success.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { CodeValidationComponent } from './code-validation/code-validation.component';
import { EmailValidationComponent } from './email-validation/email-validation.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'about', component: AboutUsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'compare', component: CompareComponent },
      { path: 'my-account', component: MyAccountComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forget-password', component: ForgetPasswordComponent },
      { path: 'code-validation', component: CodeValidationComponent },
      { path: 'email-verification', component: EmailValidationComponent },
      { path: 'confirm-email', component: ConfirmEmailComponent },
      { path: 'success', component: SuccessComponent },
      { path: 'error', component: ErrorPageComponent },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
