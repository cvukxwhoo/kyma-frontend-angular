import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { PriceFormatPipe } from 'src/app/pipe/price-format.pipe';
import { PopupEditSuccessComponent } from 'src/app/components/popup-edit-success/popup-edit-success.component';
import { ProductService } from 'src/app/services/product.service';
import { BrandService } from 'src/app/services/brand.service';

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

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private brandService: BrandService
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
      image: ['', Validators.required],
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
    const file = (event.target as HTMLInputElement).files[0];
    this.addProductForm.patchValue({ image: file });
    this.selectedFileName = file ? file.name : ''; // Set or reset the selected file name
  }

  onSubmit(): void {
    // const formData = new FormData();
    // formData.append('title', this.addProductForm.get('title').value);
    // formData.append('code', this.addProductForm.get('code').value);
    // formData.append('quanities', this.addProductForm.get('quanities').value);
    // formData.append('paths', this.addProductForm.get('paths').value);
    // formData.append('category', this.addProductForm.get('category').value);
    // formData.append('price', this.addProductForm.get('price').value);
    // formData.append(
    //   'discountPrice',
    //   this.addProductForm.get('discountPrice').value
    // );
    // formData.append(
    //   'warrantyPeriod',
    //   this.addProductForm.get('warrantyPeriod').value
    // );
    // formData.append('origin', this.addProductForm.get('origin').value);
    // formData.append('brand', this.addProductForm.get('brand').value);

    // formData.append('features', this.addProductForm.get('features').value);

    // formData.append('image', this.addProductForm.get('image').value);
    const formData = this.addProductForm.value;
    console.log(formData);

    this.productService.createProduct(formData).subscribe({
      next: (res) => {
        console.log('res:', res);
      },
      error: (error) => {
        console.error('Error creating product:', error);
        // Handle error, show user feedback, or log appropriately
      },
    });
  }
}
