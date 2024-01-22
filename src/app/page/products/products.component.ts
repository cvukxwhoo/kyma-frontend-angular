import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { PriceFormatPipe } from '../../pipe/price-format.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[];
  categoryId: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cookiesService: CookiesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.getAllProducts();
    this.route.params.subscribe((params) => {
      this.categoryId = params['categoryId'];
      // Fetch the product by its ID
      this.getProductByCategory();
    });
  }

  // GET ALL PRODUCT
  // getAllProducts() {
  //   this.productService.getAllProducts().subscribe({
  //     next: (res) => {
  //       console.log(res.data);
  //       this.products = res.data;
  //       this.cookiesService.setToken(String(res.data), 7);
  //     },
  //     error: (err) => {
  //       alert(' Get product is failed');
  //     },
  //   });
  // }

  // GET PRODUCT BY CATEGORY ID
  getProductByCategory() {
    this.productService.getProductsByCategory(this.categoryId).subscribe({
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

  // END
}
