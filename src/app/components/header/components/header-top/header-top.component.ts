import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { PriceFormatPipe } from 'src/app/pipe/price-format.pipe';
import { AuthService } from 'src/app/services/auth.service';

interface CartItem {
  productId: string;
  quantity: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrls: ['./header-top.component.scss'],
})
export class HeaderTopComponent implements OnInit {
  fullName: string;
  isSignHidden = true;
  isCartHidden = true;
  isLoggedIn: boolean = false; // Add this line
  cartItems: any[] = [];

  constructor(
    private router: Router,
    private cookiesService: CookiesService,
    private userService: UserService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if token exists
    this.isLoggedIn = !!this.cookiesService.getToken();
    this.cartService.cartItems$.subscribe((cartItems) => {
      // Do something with the updated cart items
      this.cartItems = cartItems;
    });
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

  SignOut(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
