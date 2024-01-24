import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss'],
})
export class HeaderTopComponent implements OnInit {
  isSignHidden = true;
  isLoggedIn: boolean = false; // Add this line

  constructor(private router: Router, private cookiesService: CookiesService) {}

  ngOnInit(): void {
    // Check if token exists
    this.isLoggedIn = this.cookiesService.getToken() !== null;
  }

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
