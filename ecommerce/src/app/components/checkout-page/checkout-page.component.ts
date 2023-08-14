import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent {
  showSteps: boolean = true;
  public addressForm = false;
  myForm: FormGroup | any;

  constructor() {}

  onSubmit() {
    this.myForm.value;
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
