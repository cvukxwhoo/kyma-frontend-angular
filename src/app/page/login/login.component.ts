import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  selectedTab = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookiesService: CookiesService
  ) {
    this.createFormLogin();
    this.createFormRegister();
  }

  ngOnInit(): void {}
  toggleTabs(): void {
    this.selectedTab = 1 - this.selectedTab; // Toggle between 0 and 1
  }

  // FORM LOGIN
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

  // REGISTER FORM
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

  signUp() {
    this.authService.signUp(this.registerForm.value).subscribe({
      next: (res) => {
        alert('Sign Up Successfully. Please Log In!');
        this.registerForm.reset();
        location.reload();
      },
      error: (error) => {
        console.error('Error during sign-up:', error);
        alert('Email has existed');
      },
    });
  }

  signIn() {
    this.authService.signIn(this.loginForm.value).subscribe({
      next: (res) => {
        this.cookiesService.setToken(String(res.data), 7);
        alert('Login Successfully!');
        this.loginForm.reset();
        this.router.navigate(['']);
      },
      error: (err) => {
        alert('Email or password is incorrect');
      },
    });
  }
}
