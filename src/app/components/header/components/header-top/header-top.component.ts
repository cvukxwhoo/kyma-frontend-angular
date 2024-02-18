import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

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

  // SEARCH TEXT
  searchQuery: string = '';
  searchResults: any[] = [];
  private searchTerms = new Subject<string>();

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private cartService: CartService,
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    // Check if token exists
    this.isLoggedIn = !!this.cookieService.get('token');
    this.cartService.cartItems$.subscribe((cartItems) => {
      // Do something with the updated cart items
      this.cartItems = cartItems;
    });

    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.searchService.searchProducts(term))
      )
      .subscribe((results: any[]) => {
        console.log(this.searchResults);
        this.searchResults = results;
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

  onSearch(): void {
    this.searchTerms.next(this.searchQuery);
  }
}
