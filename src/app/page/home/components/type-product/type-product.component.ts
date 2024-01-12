import { Component, OnInit } from '@angular/core';
import { products } from '../item.interface';

@Component({
  selector: 'app-type-product',
  templateUrl: './type-product.component.html',
  styleUrls: ['./type-product.component.scss'],
})
export class TypeProductComponent implements OnInit {
  listProduct: any;

  ngOnInit(): void {
    this.listProduct = products;
  }
}
