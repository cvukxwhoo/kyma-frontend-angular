import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { PriceFormatPipe } from '../../pipe/price-format.pipe';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { faTrash, faCalendarXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  faTrash = faTrash;
  faCalendarXmark = faCalendarXmark;
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
      // Do something with the updated cart items
      this.cartItems = cartItems;
    });
  }

  getTotalPrice(): number {
    // Calculate the total price
    return this.cartItems.reduce((accumulator, item) => {
      return accumulator + item.price * item.quantity;
    }, 0);
  }

  plusCartQuantity(event: Event, productId: string) {
    // Prevent the default behavior of the button (form submission, page reload)
    event.preventDefault();

    const selectedProduct = this.cartItems.find(
      (product) => product.productId === productId
    );

    if (selectedProduct) {
      // Increment the count
      selectedProduct.quantity++;

      // Update the local storage with the modified array
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }

  minusCartQuantity(event: Event, productId: string) {
    // Prevent the default behavior of the button (form submission, page reload)
    event.preventDefault();

    const selectedProduct = this.cartItems.find(
      (product) => product.productId === productId
    );

    if (selectedProduct) {
      // Increment the count
      selectedProduct.quantity = Math.max(1, selectedProduct.quantity - 1);
    }
  }

  deleteEachItem(event: Event, productId: string) {
    event.preventDefault();

    const selectedProductIndex = this.cartItems.find(
      (product) => product.productId === productId
    );

    if (selectedProductIndex !== -1) {
      this.cartItems.splice(selectedProductIndex, 1);

      // Update the local storage with the modified array
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }
  }

  // RIGHT CART
  handleFormSubmission(formData: any) {
    // Handle the form data received from the child component
    console.log('Form data from child component:', formData);
    // Add additional logic as needed
  }
}
