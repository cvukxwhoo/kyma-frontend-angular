import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  selectedTab = 0;

  constructor(private fb: FormBuilder) {
    this.createFormLogin();
    this.createFormRegister();
  }

  ngOnInit(): void {}
  toggleTabs(): void {
    this.selectedTab = 1 - this.selectedTab; // Toggle between 0 and 1
  }

  createFormLogin() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get emailLoginFormControl() {
    return this.loginForm.get('email');
  }

  get passwordLoginFormControl() {
    return this.loginForm.get('password');
  }

  createFormRegister() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.minLength(6),
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]+$/),
        ],
      ],
      fullName: ['', [Validators.required]],
    });
  }

  get emailRegisterFormControl() {
    return this.registerForm.get('email');
  }

  get passwordRegisterFormControl() {
    return this.registerForm.get('password');
  }
  get fullnameRegisterFormControl() {
    return this.registerForm.get('fullName');
  }
}
