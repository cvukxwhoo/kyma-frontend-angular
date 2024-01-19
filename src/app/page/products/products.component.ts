import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { PriceFormatPipe } from '../../pipe/price-format.pipe';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cookiesService: CookiesService
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products = res.data;
        this.cookiesService.setToken(String(res.data), 7);
      },
      error: (err) => {
        alert('Email or password is incorrect');
      },
    });
  }

  // END
}
