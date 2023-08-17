import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  showSteps: boolean = true;
  public addressForm = false;
  myForm: FormGroup | any;

  constructor() {}
  ngOnInit(): void {
    //form
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.myForm.value;
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}
