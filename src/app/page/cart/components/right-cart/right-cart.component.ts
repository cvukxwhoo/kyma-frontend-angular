import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-right-cart',
  templateUrl: './right-cart.component.html',
  styleUrls: ['./right-cart.component.scss'],
})
export class RightCartComponent implements OnInit {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createFormPayment();
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
        ],
      ],
      address: ['', [Validators.required]],
      deliveryMethod: ['', [Validators.required]],

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

  get deliveryMethodPaymentControl() {
    return this.paymentForm.get('deliveryMethod');
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
    const bankingControl = this.paymentForm.get('banking');
    const atmControl = this.paymentForm.get('atm');
    const codControl = this.paymentForm.get('cod');

    this.paymentForm.get('payments').valueChanges.subscribe((value) => {
      if (value === 'banking') {
        atmControl.disable();
        codControl.disable();
      } else if (value === 'atm') {
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
      // Perform actions when the form is submitted
      console.log(this.paymentForm.value);
    }
  }
}
