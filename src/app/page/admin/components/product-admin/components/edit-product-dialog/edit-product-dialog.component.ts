import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { PriceFormatPipe } from 'src/app/pipe/price-format.pipe';

@Component({
  selector: 'app-edit-product-dialog',
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss'],
})
export class EditProductDialog implements OnInit {
  editProductForm: FormGroup;

  constructor(
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
}
