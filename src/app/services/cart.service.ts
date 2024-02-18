import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private quantitiesSubject = new BehaviorSubject<number>(0);
  quanities$ = this.quantitiesSubject.asObservable();

  constructor() {
    // Initialize cartItems from localStorage on service instantiation
    this.cartItems = this.getCartItemsFromLocalStorage();
    this.updateCartItemsSubject();
  }

  updateLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getCartItemsFromLocalStorage(): any[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  addToCart(product: any): void {
    const existingItem = this.cartItems.find(
      (item) => item.productId === product._id
    );

    if (existingItem !== undefined) {
      // If the item already exists in the cart, update the quanities
      existingItem.quanities += 1;
    } else {
      // If the item doesn't exist, add a new item to the cart
      const newItem = {
        productId: product._id,
        quanities: 1,
        title: product.title,
        price: product.price,
        discountPrice: product.discountPrice,
        imageUrl: product.imageUrl,
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

  deleteEachProductFromCart(productId: string) {
    // let cart = this.getCartItemsFromLocalStorage();
    // cart = cart.filter((item) => item.productId !== productId);

    // localStorage.setItem('cart', JSON.stringify(cart));
    // this.updateCartItemsSubject();
    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== productId
    );
    this.updateLocalStorage();
    this.updateCartItemsSubject();
  }

  removeLocalStorage() {
    localStorage.removeItem('cart');
  }
}
