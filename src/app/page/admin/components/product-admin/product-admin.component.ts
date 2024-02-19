import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { PriceFormatPipe } from 'src/app/pipe/price-format.pipe';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { EditProductDialog } from './components/edit-product-dialog/edit-product-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.scss'],
})
export class ProductAdminComponent implements OnInit {
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;

  displayedColumns: string[] = [
    'sku',
    'product',
    'type',
    'brand',
    'price',
    'discountPrice',
    'inventory',
    'actions',
    'delete',
  ];
  dataSource: any[] = [];
  loading: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData(): void {
    this.productService.getAllProducts().subscribe((data) => {
      console.log(data);
      this.dataSource = data.data;
      this.loading = false;
      if (this.paginator) {
        this.paginator.length = this.dataSource.length;
      }
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

  deleteProduct(productId: string): void {
    this.productService.deleteProduct(productId).subscribe({
      next: (res) => {
        alert('Xoá sản phẩm thành công');
      },
      error: (error) => {
        console.error('Error fetching product data:', error);
      },
    });
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.productService.getAllProducts().subscribe((data) => {
      this.dataSource = data.data.slice(startIndex, endIndex);
    });
  }
}
