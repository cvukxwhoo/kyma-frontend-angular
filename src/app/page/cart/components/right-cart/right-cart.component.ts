import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillService } from 'src/app/services/bill.service';
import { CartService } from 'src/app/services/cart.service';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-right-cart',
  templateUrl: './right-cart.component.html',
  styleUrls: ['./right-cart.component.scss'],
})
export class RightCartComponent implements OnInit {
  paymentForm: FormGroup;
  cartItems: any[] = [];
  userId: string | null = '';

  @Output() submitForm: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private billService: BillService,
    private cookiesService: CookiesService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItems) => {
      // Do something with the updated cart items
      this.cartItems = cartItems;
    });

    this.cookiesService
      .getUserIdObservable()
      .subscribe((userId: string | null) => {
        this.userId = userId;
      });

    this.createFormPayment();
  }

  getTotalPrice(): number {
    // Calculate the total price
    return this.cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
  }

  createFormPayment() {
    this.paymentForm = this.fb.group({
      // USER
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(12),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      address: ['', [Validators.required]],

      // COMPANY
      buyerCompany: [false],
      buyerIndividual: [false],
      companyName: [''],
      taxCode: [''],
      addressCompany: [''],
      textareaContent: [''],
      payments: ['', Validators.required],
    });
  }

  // --------- INFOR BUYER ----------- //
  get emailPaymentControl() {
    return this.paymentForm.get('email');
  }

  get fullNamePaymentControl() {
    return this.paymentForm.get('fullName');
  }

  get phoneNumberPaymentControl() {
    return this.paymentForm.get('phoneNumber');
  }
  get addressPaymentControl() {
    return this.paymentForm.get('address');
  }

  // ---------- INFOR COMPANY ----------- //
  get companyNamePaymentControl() {
    return this.paymentForm.get('companyName');
  }

  get taxCodePaymentControl() {
    return this.paymentForm.get('taxCode');
  }

  get addressCompanyPaymentControl() {
    return this.paymentForm.get('addressCompany');
  }
  get textareaContentPaymentControl() {
    return this.paymentForm.get('textareaContent');
  }

  // ------------ Buyer ---------------- //
  onCheckboxChange(option: string) {
    if (
      option === 'buyerCompany' &&
      this.paymentForm.get('buyerCompany').value
    ) {
      // If "Option 1" is selected, deselect "Option 2"
      this.paymentForm.get('buyerIndividual').setValue(false);
    } else if (
      option === 'buyerIndividual' &&
      this.paymentForm.get('buyerIndividual').value
    ) {
      // If "Option 2" is selected, deselect "Option 1"
      this.paymentForm.get('buyerCompany').setValue(false);
    }
  }

  // ---------------- Payment -------------- //
  subscribeToPaymentChanges() {
    const bankingControl = this.paymentForm.get('Banking');
    const atmControl = this.paymentForm.get('Atm');
    const codControl = this.paymentForm.get('Cod');

    this.paymentForm.get('payments').valueChanges.subscribe((value) => {
      if (value === 'Banking') {
        atmControl.disable();
        codControl.disable();
      } else if (value === 'Atm') {
        bankingControl.disable();
        codControl.disable();
      } else {
        bankingControl.disable();
        atmControl.disable();
      }
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const billData = {
        fullName: this.paymentForm.get('fullName').value,
        email: this.paymentForm.get('email').value,
        phoneNumber: this.paymentForm.get('phoneNumber').value,
        address: this.paymentForm.get('address').value,
        invoice: this.paymentForm.get('buyerCompany' || 'buyerIndividual')
          .value,
        companyName: this.paymentForm.get('companyName').value,
        taxCode: this.paymentForm.get('taxCode').value,
        addressCompany: this.paymentForm.get('addressCompany').value,
        textareaContent: this.paymentForm.get('textareaContent'),
        cartData: this.cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          title: item.title,
          price: item.price,
          imageUrl: item.imageUrl,
        })),
        customer: this.userId,
      };

      console.log(billData);

      // Emit an event with the form values
      // this.submitForm.emit(this.paymentForm.value);

      this.billService.createBill(billData).subscribe({
        next: (res) => {
          console.log('Bill created successfully', res);
          this.paymentForm.reset();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
