import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { PriceFormatPipe } from '../../pipe/price-format.pipe';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { faTrash, faCalendarXmark } from '@fortawesome/free-solid-svg-icons';
import { BillService } from 'src/app/services/bill.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  faTrash = faTrash;
  faCalendarXmark = faCalendarXmark;
  cartItems: any[] = [];
  userId: string;

  constructor(
    private productService: ProductService,
    private router: Router,
    private cookiesService: CookiesService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private billService: BillService,
    private cookieService: CookieService
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
      return (
        accumulator + item.discountPrice * item.quanities ||
        accumulator + item.price * item.quanities
      );
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
      selectedProduct.quanities++;

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
      selectedProduct.quanities = Math.max(1, selectedProduct.quanities - 1);
    }
  }

  deleteEachItem(event: Event, productId: string) {
    // const selectedProduct = this.cartItems.find(
    //   (product) => product.productId === productId
    // );

    // if (selectedProduct) {
    //   this.cartItems.splice(selectedProduct, 1);
    // }
    // localStorage.setItem('cart', JSON.stringify(this.cartItems));

    this.cartItems = this.cartItems.filter(
      (product) => product.productId !== productId
    );

    localStorage.setItem('cart', JSON.stringify(this.cartItems));

    alert('Xoá sản phẩm thành công');
  }

  deleteAllItems() {
    // Clear the cartItems array
    this.cartItems = [];
    alert('Xoá thành công tất cả các sản phẩm');
    location.reload();
    // Update the local storage with the empty array
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // Assuming this is part of your Angular component or service
  handleFormSubmission(formData: any) {
    console.log('Form data from child component:', formData);

    // Retrieve userId from local storage
    const userId: string | null = decodeURIComponent(
      this.cookieService.get('token')
    );

    // Retrieve products from local storage
    const products: any[] = JSON.parse(localStorage.getItem('cart')) || [];

    const orderData = {
      formData,
    };

    // Make the HTTP request
    this.billService.postOrder(orderData).subscribe({
      next: (response) => {
        console.log('Order submitted successfully!', response);
        // Add any additional logic you need after a successful order submission
      },
      error: (error) => {
        console.error('Error submitting order:', error);
      },
    });
  }
}
