import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { GuardService } from './shared/services/guard.service';
import { AllProductsPageComponent } from './pages/all-products-page/all-products-page.component';
import { OrderPaymentComponent } from './pages/order-payment/order-payment.component';
import { GuardCheckoutService } from './shared/services/guardCheckout.service';

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
    canActivate: [GuardService, GuardCheckoutService],
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    canActivate: [GuardService, GuardCheckoutService],
  },
  {
    path: 'order-payment',
    component: OrderPaymentComponent,
    canActivate: [GuardService, GuardCheckoutService],
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
