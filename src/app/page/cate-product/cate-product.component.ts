import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { PriceFormatPipe } from '../../pipe/price-format.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cate-product',
  templateUrl: './cate-product.component.html',
  styleUrls: ['./cate-product.component.scss'],
})
export class CateProductComponent implements OnInit {
  products: any[];
  categoryName: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cookiesService: CookiesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryName = params['categoryName'];
      // Fetch the product by its Name
      this.getProductByCategory();
    });
  }

  // GET PRODUCT BY CATEGORY ID
  getProductByCategory() {
    this.productService.getProductsByCategory(this.categoryName).subscribe({
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
