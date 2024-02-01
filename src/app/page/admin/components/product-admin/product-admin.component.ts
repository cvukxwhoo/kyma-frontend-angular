import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { PriceFormatPipe } from 'src/app/pipe/price-format.pipe';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss'],
})
export class ProductAdminComponent implements OnInit {
  displayedColumns: string[] = [
    'product',
    'type',
    'inventory',
    'sku',
    'price',
    'discountPrice',
    'actions',
  ];
  dataSource: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.dataSource = data.data;
    });
  }
}
