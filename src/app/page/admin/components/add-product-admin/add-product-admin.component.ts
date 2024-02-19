import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { PriceFormatPipe } from 'src/app/pipe/price-format.pipe';
import { PopupEditSuccessComponent } from 'src/app/components/popup-edit-success/popup-edit-success.component';
import { ProductService } from 'src/app/services/product.service';
import { BrandService } from 'src/app/services/brand.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product-admin',
  templateUrl: './add-product-admin.component.html',
  styleUrls: ['./add-product-admin.component.scss'],
})
export class AddProductAdminComponent implements OnInit {
  addProductForm: FormGroup;
  selectedFileName: string = '';
  categories: any[] = [];
  paths: any[] = [];
  brands: any[] = [];
  imageUrl: string = '';
  durationInSeconds = 5;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.createFormAdd();
  }

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (data) => {
        this.categories = data.data;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      },
    });

    this.brandService.getAllBrand().subscribe({
      next: (data) => {
        console.log(data.data);
        this.brands = data.data;
      },
      error: (error) => {
        console.error('Error loading brands:', error);
      },
    });
  }

  createFormAdd() {
    this.addProductForm = this.fb.group({
      title: ['', [Validators.required]],
      code: ['', [Validators.required]],
      quanities: ['', [Validators.required]],
      pathId: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discountPrice: [''],
      warrantyPeriod: [''],
      origin: [''],
      brandId: [''],
      features: ['', [Validators.required]],
      image: [''],
    });
  }

  get nameProductFormControl() {
    return this.addProductForm.get('title');
  }

  get codeProductFormControl() {
    return this.addProductForm.get('code');
  }

  get categoryProductFormControl() {
    return this.addProductForm.get('categoryId');
  }

  get quanitiesProductFormControl() {
    return this.addProductForm.get('quanities');
  }

  get pathsProductFormControl() {
    return this.addProductForm.get('pathId');
  }

  get brandProductFormControl() {
    return this.addProductForm.get('brandId');
  }

  get featuresProductFormControl() {
    return this.addProductForm.get('features');
  }

  // RIGHT
  get priceProductFormControl() {
    return this.addProductForm.get('price');
  }

  get discountPriceProductFormControl() {
    return this.addProductForm.get('discountPrice');
  }

  get warrantyPeriodProductFormControl() {
    return this.addProductForm.get('warrantyPeriod');
  }

  get originProductFormControl() {
    return this.addProductForm.get('origin');
  }

  get imageProductFormControl() {
    return this.addProductForm.get('image');
  }

  onCategoryChange() {
    const selectedCategoryId = this.addProductForm.get('categoryId').value;

    this.categoryService.getPathsByCategoryId(selectedCategoryId).subscribe({
      next: (data) => {
        this.paths = data.data;
      },
      error: (error) => {
        console.error(
          `Error loading paths for category ${selectedCategoryId}:`,
          error
        );
      },
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.imageUrl = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // Price Format Price Input
  onPriceInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.replace(
      /[^\d.]/g,
      ''
    );
    this.addProductForm.get('price').setValue(parseFloat(inputValue));
  }

  formatPrice(value: string): string {
    // Định dạng giá trị theo định dạng tiền tệ của Việt Nam
    // Ví dụ: 100000 -> 100,000 VNĐ
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Price Format Discount Price Input
  onDiscountPriceInput(event: any): void {
    const inputValue = event.target.value.replace(/[^\d.]/g, ''); // Lọc chỉ giữ lại số và dấu chấm
    this.addProductForm.get('discountPrice').setValue(parseFloat(inputValue));
  }

  // Open Snack Bar With Submit
  openSnackBar(action: string) {
    this._snackBar.openFromComponent(PopupEditSuccessComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  onSubmit(): void {
    if (this.addProductForm.valid) {
      const formData = new FormData();
      Object.keys(this.addProductForm.value).forEach((key) => {
        formData.append(key, this.addProductForm.value[key]);
      });
      formData.append('imageUrl', this.imageUrl);

      this.productService.createProduct(formData).subscribe({
        next: (res) => {
          console.log('res:', res);
          this.addProductForm.reset();
          this.router.navigate['/products'];
        },
        error: (error) => {
          console.error('Error creating product:', error);
          // Handle error, show user feedback, or log appropriately
        },
      });
    }
  }
}
