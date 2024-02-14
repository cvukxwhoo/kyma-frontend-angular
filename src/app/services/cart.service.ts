import { Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';
  private cartItems: any[] = [];

  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  @Output() cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Initialize cartItems from localStorage on service instantiation
    this.cartItems = this.getCartItemsFromLocalStorage();
    this.updateCartItemsSubject();
  }

  addToCart(product: any, quanities: number): void {
    const existingItem = this.cartItems.find(
      (item) => item.productId === product._id
    );

    if (existingItem) {
      // If the item already exists in the cart, update the quanities
      existingItem.quanities++;
    } else {
      // If the item doesn't exist, add a new item to the cart
      const newItem = {
        productId: product._id,
        quanities: 1,
        title: product.title,
        price: product.price,
        discountPrice: product.discountPrice,
        imageUrl: product.imageUrl,
        // Add other product details as needed
      };

      this.cartItems.push(newItem);
    }

    // Update cart items in localStorage and BehaviorSubject
    this.updateLocalStorage();
    this.updateCartItemsSubject();
  }

  updateCartItemsSubject(): void {
    this.cartItemsSubject.next([...this.cartItems]);
  }

  private updateLocalStorage(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
  }

  private getCartItemsFromLocalStorage(): any[] {
    const cartItemsJson = localStorage.getItem(this.cartKey);

    if (!cartItemsJson) {
      return [];
    }

    try {
      return JSON.parse(cartItemsJson);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return [];
    }
  }

  removeLocalStorage() {
    localStorage.removeItem('cart');
  }
}
