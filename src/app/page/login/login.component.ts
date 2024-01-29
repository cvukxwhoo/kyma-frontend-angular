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
  loading = false;

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
    this.loading = true;

    const { email, password, fullName } = this.registerForm.value;

    this.authService.signUp(email, password, fullName).subscribe({
      next: (res) => {
        this.loading = false;
        const token = res.token;
        const userId = res.userId;
        this.cookiesService.setToken(token, 7);
        this.cookiesService.setUserId(userId, 7);
        alert('Login Successfully!');
        this.loginForm.reset();
        this.router.navigate(['']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Error during sign-up:', error);
        alert('Email has existed');
      },
    });
  }

  signIn() {
    this.loading = true;

    const { email, password } = this.loginForm.value;

    this.authService.signIn(email, password).subscribe({
      next: (res) => {
        this.loading = false;
        const token = res.token;
        const userId = res.userId; // Assuming your API response has a 'token' property
        this.cookiesService.setToken(token, 7);
        this.cookiesService.setUserId(userId, 7);
        alert('Login Successfully!');
        this.loginForm.reset();
        this.router.navigate(['']); // Navigate to the home page or user dashboard
      },
      error: (err) => {
        this.loading = false;
        alert('Email or password is incorrect');
      },
    });
  }
}
