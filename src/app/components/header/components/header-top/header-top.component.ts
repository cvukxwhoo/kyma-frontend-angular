import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
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

  cartItems: CartItem[];

  constructor(
    private router: Router,
    private cookiesService: CookiesService,
    private userService: UserService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Check if token exists
    this.isLoggedIn = !!this.cookiesService.getToken();
    this.loadCartItems();
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

  loadCartItems(): void {
    this.cartItems = this.cartService.getCartItemsFromLocalStorage();
    console.log(this.cartItems);
  }

  SignOut(): void {
    this.cookiesService.removeCookie('myToken');
    // You might want to add additional cleanup steps here
    this.router.navigate(['']);
  }
}
