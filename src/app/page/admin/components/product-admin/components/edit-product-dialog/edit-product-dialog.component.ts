import { Component, Inject, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { PriceFormatPipe } from 'src/app/pipe/price-format.pipe';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { PopupEditSuccessComponent } from 'src/app/components/popup-edit-success/popup-edit-success.component';
import { ProductService } from 'src/app/services/product.service';
import * as CircularJSON from 'circular-json';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss'],
})
export class EditProductDialog implements OnInit {
  editProductForm: FormGroup;
  durationInSeconds = 5;

  constructor(
    private productService: ProductService,
    private _snackBar: MatSnackBar,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.createFormEdit();
  }

  ngOnInit(): void {}

  createFormEdit() {
    this.editProductForm = this.fb.group({
      sku: [this.data.data.code, [Validators.required]],
      product: [this.data.data.title, [Validators.required]],
      type: [this.data.data.byCategory.title, [Validators.required]],
      brand: [this.data.data.byBrand.name, [Validators.required]],
      price: [this.data.data.price, [Validators.required]],
      discountPrice: [this.data.data.discountPrice, [Validators.required]],
      quanities: [this.data.data.quanities, [Validators.required]],
    });
  }

  get skuProductFormControl() {
    return this.editProductForm.get('sku');
  }

  get productProductFormControl() {
    return this.editProductForm.get('product');
  }
  get typeProductFormControl() {
    return this.editProductForm.get('type');
  }
  get brandProductFormControl() {
    return this.editProductForm.get('brand');
  }

  openSnackBar(action: string) {
    this._snackBar.openFromComponent(PopupEditSuccessComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  onSubmit() {
    const formData = this.editProductForm.value;
    console.log(formData);
    this.productService.updateProduct(this.data.data._id, formData).subscribe({
      next: (response) => {
        console.log('Product updated successfully:', response);
        // Handle success, e.g., show a success message or navigate to another page
      },
      error: (error) => {
        console.error('Error updating product:', error);
        // Handle error, e.g., display an error message
      },
    });
  }
}
