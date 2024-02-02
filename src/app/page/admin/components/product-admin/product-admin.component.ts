import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { PriceFormatPipe } from 'src/app/pipe/price-format.pipe';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialog } from './components/edit-product-dialog/edit-product-dialog.component';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss'],
})
export class ProductAdminComponent implements OnInit {
  faPenToSquare = faPenToSquare;

  displayedColumns: string[] = [
    'sku',
    'product',
    'type',
    'brand',
    'price',
    'discountPrice',
    'inventory',
    'actions',
  ];
  dataSource: any[] = [];

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.dataSource = data.data;
    });
  }

  editProduct(productId: string): void {
    this.productService.getProductById(productId).subscribe(
      (productData) => {
        console.log(productData);
        const dialogRef = this.dialog.open(EditProductDialog, {
          data: productData,
        });

        dialogRef.afterClosed().subscribe((result) => {
          // Handle the result after the modal is closed (e.g., update the product data)
          console.log('Modal closed with result:', result);
        });
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }
}
