import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss'],
})
export class HeaderTopComponent {
  isSignHidden = true;

  constructor(private router: Router) {}

  handleSignIn() {
    this.isSignHidden = !this.isSignHidden;
  }

  hideSignInMenu() {
    this.isSignHidden = true;
  }

  changeDirectLogin() {
    const login = '/login';
    this.router.navigate([login]);
  }
}
