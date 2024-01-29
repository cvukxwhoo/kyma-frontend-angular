import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartKey = 'cart';
  private countKey = 'count';
  private cartItems: any[] = [];
  private countItems: number = 0;

  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private countItemsSubject = new BehaviorSubject<any>('');
  countItems$ = this.countItemsSubject.asObservable();

  constructor() {
    // Initialize cartItems from localStorage on service instantiation
    this.cartItems = this.getCartItemsFromLocalStorage();
    this.updateCartItemsSubject();

    this.countItems = this.getCountItemsFromLocalStorage();
    this.updateCountItemsSubject();
  }

  addToCart(product: any, quantity: number): void {
    const existingItem = this.cartItems.find(
      (item) => item.productId === product._id
    );

    if (existingItem) {
      // If the item already exists in the cart, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the item doesn't exist, add a new item to the cart
      const newItem = {
        productId: product._id,
        quantity: quantity,
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        // Add other product details as needed
      };

      this.cartItems.push(newItem);
    }

    // Update cart items in localStorage and BehaviorSubject
    this.updateLocalStorage();
    this.updateCartItemsSubject();
    this.updateCountItemsSubject();
  }

  private updateCartItemsSubject(): void {
    this.cartItemsSubject.next([...this.cartItems]);
  }

  private updateCountItemsSubject(): void {
    this.countItemsSubject.next(this.countItems);
  }

  private updateLocalStorage(): void {
    localStorage.setItem(this.cartKey, JSON.stringify(this.cartItems));
    // Save the count to localStorage
    localStorage.setItem(this.countKey, JSON.stringify(this.countItems));
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

  private getCountItemsFromLocalStorage(): number {
    const countItemsJson = localStorage.getItem(this.countKey);

    if (!countItemsJson) {
      return 0;
    }

    try {
      return JSON.parse(countItemsJson);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return 0;
    }
  }

  removeLocalStorage() {
    localStorage.removeItem('cart');
  }
}
