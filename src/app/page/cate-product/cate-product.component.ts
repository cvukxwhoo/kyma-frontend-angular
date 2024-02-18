import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { PriceFormatPipe } from '../../pipe/price-format.pipe';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cate-product',
  templateUrl: './cate-product.component.html',
  styleUrls: ['./cate-product.component.scss'],
})
export class CateProductComponent implements OnInit {
  categoryName: string;
  products: any[];
  cartItems: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cookiesService: CookiesService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });

    this.route.params.subscribe((params) => {
      this.categoryName = params['categoryName'];
      // Fetch the product by its Name
      this.getProductByCategory();
    });

    this.getProductByCategory();
  }

  // GET PRODUCT BY CATEGORY ID
  getProductByCategory() {
    this.productService.getProductsByCategory(this.categoryName).subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
      },
      error: (err) => {
        alert(' Get product is failed');
      },
    });
  }

  navigateToDetails(productId: string) {
    this.router.navigate(['/products/details', productId]);
  }

  addToCart(productId: string) {
    const selectedProduct = this.products.find(
      (product) => product._id === productId
    );

    if (selectedProduct) {
      this.cartService.addToCart(selectedProduct);
      alert('Thêm sản phẩm thành công');
    }
    this.router.navigate(['/cart']);
  }
}
