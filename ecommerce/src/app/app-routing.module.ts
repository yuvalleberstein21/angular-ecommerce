import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartPageComponent } from './components/cart-page/cart-page.component';
import { OrderPageComponent } from './components/order-page/order-page.component';
import { CheckoutPageComponent } from './components/checkout-page/checkout-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { GuardService } from './shared/services/guard.service';
import { AllProductsPageComponent } from './components/all-products-page/all-products-page.component';
import { OrderPaymentComponent } from './components/order-payment/order-payment.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductViewComponent,
  },
  {
    path: 'product-detail/:productId',
    component: ProductDetailsComponent,
  },
  {
    path: 'cart-page',
    component: CartPageComponent,
  },
  {
    path: 'order-page',
    component: OrderPageComponent,
    canActivate: [GuardService],
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [GuardService],
  },
  {
    path: 'order-payment',
    component: OrderPaymentComponent,
    canActivate: [GuardService],
  },
  {
    path: 'login-page',
    component: LoginPageComponent,
  },
  {
    path: 'register-page',
    component: RegisterPageComponent,
  },
  {
    path: 'products',
    component: AllProductsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
