import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { HeaderComponent } from './components/header/header.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { ProductCardsComponent } from './components/product-cards/product-cards.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';

import { SaleSectionComponent } from './utils/sale-section/sale-section.component';
import { AllProductsPageComponent } from './pages/all-products-page/all-products-page.component';
import { MbscModule } from '@mobiscroll/angular';
import { OrderPaymentComponent } from './pages/order-payment/order-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductViewComponent,
    ProductDetailsComponent,
    HeaderComponent,
    CartPageComponent,
    OrderPageComponent,
    ProductCardsComponent,
    FooterComponent,
    LoaderComponent,
    CheckoutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    SaleSectionComponent,
    AllProductsPageComponent,
    OrderPaymentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MbscModule,

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [],
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
