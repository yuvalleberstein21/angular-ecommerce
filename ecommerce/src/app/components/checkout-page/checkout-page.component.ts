import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  showSteps: boolean = true;
  addressForm: FormGroup | any;
  myData: any;
  userId!: number;

  constructor(private OrderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    //getIdFromStorage
    const userString = sessionStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      if (user.id) {
        this.userId = user.id;
      }
    }
    //Form input validation
    this.addressForm = new FormGroup({
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });

    //Get countries list
    this.OrderService.getCountriesList().subscribe((res: any) => {
      const countries = [];
      for (let i = 0; i < res.length; i++) {
        const country = res[i];
        countries.push({ text: country.text, value: country.value });
      }
      this.myData = countries;
    });
  }

  onSubmit() {
    this.addressForm.value;

    console.log(this.addressForm.value);

    this.OrderService.getOrder(this.userId, this.addressForm.value).subscribe(
      (res: any) => {
        sessionStorage.setItem('address', JSON.stringify(res));
        this.addressForm.reset();
        this.router.navigate(['/order-payment']);
      }
    );
  }
}
