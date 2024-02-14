import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { PriceFormatPipe } from 'src/app/pipe/price-format.pipe';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
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
  searchTerm: string = '';
  searchResults: any[] = [];
  private searchTerms = new Subject<string>();

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private userService: UserService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private authService: AuthService,
    private searchService: SearchService
  ) {
    this.setupSearch();
  }

  ngOnInit(): void {
    // Check if token exists
    this.isLoggedIn = !!this.cookieService.get('token');
    this.cartService.cartItems$.subscribe((cartItems) => {
      // Do something with the updated cart items
      this.cartItems = cartItems;
    });
  }

  search() {
    this.searchTerms.next(this.searchTerm);
    console.log(this.searchTerms);
  }

  private setupSearch() {
    this.searchTerms
      .pipe(
        debounceTime(3000), // Adjust the delay time (in milliseconds) as needed
        distinctUntilChanged(),
        switchMap((term: string) => this.searchService.search(term))
      )
      .subscribe((results: any[]) => {
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
}
