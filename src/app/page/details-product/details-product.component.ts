import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

interface Product {
  _id: string;
  title: string;
  imageUrl: string;
  code: string;
  price: number;
  discountPrice: number;
  warrantyPeriod: number;
  origin: string;
  quanities: number;
  features: string[];
  byBrand: Brand;
  // Add other properties as needed
}

interface Brand {
  name: string;
}

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.scss'],
})
export class DetailsProductComponent implements OnInit {
  product: Product;
  productId: string;
  cartItems: any[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['productId'];
      // Fetch the product by its ID
      this.getProductById();
    });

    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
  }

  getProductById() {
    this.productService.getProductById(this.productId).subscribe({
      next: (res) => {
        this.product = res.data;
      },
      error: (err) => {
        alert('Email or password is incorrect');
      },
    });
  }
}
