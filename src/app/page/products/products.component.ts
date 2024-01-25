import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { PriceFormatPipe } from '../../pipe/price-format.pipe';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartInfoService } from 'src/app/services/cart-info.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[];
  pathName: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cookiesService: CookiesService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private cartInfoService: CartInfoService
  ) {}

  ngOnInit(): void {
    // this.getAllProducts();
    this.route.params.subscribe((params) => {
      this.pathName = params['pathName'];
      // Fetch the product by its ID
      this.getProductByPath();
    });
  }

  // GET PRODUCT BY CATEGORY ID
  getProductByPath() {
    this.productService.getProductsByPath(this.pathName).subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
        this.cookiesService.setToken(String(res.data), 7);
      },
      error: (err) => {
        alert(' Get product is failed');
      },
    });
  }

  navigateToDetails(productId: string) {
    // Navigate to the details page with the product ID
    this.router.navigate(['/products/details', productId]);
  }

  addToCart(_id: string): void {
    this.cartService.addToCart(_id).subscribe(
      (response) => {
        // Update local storage with the latest cart items
        const cartItems = response.cartItem;
        this.cartService.updateLocalStorage(cartItems);

        // Update the cart info in the header
        this.cartInfoService.updateCartItems(cartItems);
      },
      (error) => {
        console.error('Error adding to cart:', error);
      }
    );
  }

  // END
}
