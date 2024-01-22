import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { ActivatedRoute } from '@angular/router';
import { PriceFormatPipe } from 'src/app/pipe/price-format.pipe';

interface Product {
  _id: string;
  title: string;
  imageUrl: string;
  code: string;
  price: number;
  discountPrice: number;
  brands: Brand;
  warrantyPeriod: number;
  origin: string;
  quanities: number;
  salientFeatures: string[];
  // Add other properties as needed
}

interface Brand {
  brandName: string;
}

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss'],
})
export class DetailsProductComponent {
  product: Product;
  productId: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cookiesService: CookiesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      // Fetch the product by its ID
      this.getProductById();
    });
  }

  getProductById() {
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res.data;
        this.cookiesService.setToken(String(res.data), 7);
      },
      error: (err) => {
        alert('Email or password is incorrect');
      },
    });
  }
}
