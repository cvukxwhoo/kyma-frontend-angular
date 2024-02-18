import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { PriceFormatPipe } from '../../pipe/price-format.pipe';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[];
  pathName: string;
  cartItems: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });

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

  // END
}
