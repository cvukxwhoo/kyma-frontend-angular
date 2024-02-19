import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './page/home/home.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { ProductsComponent } from './page/products/products.component';
import { CartComponent } from './page/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// module
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HeaderTopComponent } from './components/header/components/header-top/header-top.component';
import { HeaderBottomComponent } from './components/header/components/header-bottom/header-bottom.component';
import { SlideImageComponent } from './page/home/components/slide-image/slide-image.component';
import { TypeProductComponent } from './page/home/components/type-product/type-product.component';
import { LoginComponent } from './page/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { RightCartComponent } from './page/cart/components/right-cart/right-cart.component';
import { PriceFormatPipe } from './pipe/price-format.pipe';
import { DetailsProductComponent } from './page/details-product/details-product.component';
import { CateProductComponent } from './page/cate-product/cate-product.component';
import { BreadcrumbComponent } from './page/home/components/breadcrumb/breadcrumb.component';
import { ChangePasswordComponent } from './page/change-password/change-password.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AdminComponent } from './page/admin/admin.component';
import { CookieService } from 'ngx-cookie-service';
import { SidebarComponent } from './page/admin/components/sidebar/sidebar.component';
import { MatTableModule } from '@angular/material/table';
import { DashboardAdminComponent } from './page/admin/components/dashboard-admin/dashboard-admin.component';
import { ProductAdminComponent } from './page/admin/components/product-admin/product-admin.component';
import { AddProductAdminComponent } from './page/admin/components/add-product-admin/add-product-admin.component';
import { BillsComponent } from './page/admin/components/bills/bills.component';
import { BillDetailsComponent } from './page/admin/components/bill-details/bill-details.component';
import { EditProductDialog } from './page/admin/components/product-admin/components/edit-product-dialog/edit-product-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { PopupEditSuccessComponent } from './components/popup-edit-success/popup-edit-success.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    NotFoundComponent,
    HeaderTopComponent,
    HeaderBottomComponent,
    SlideImageComponent,
    TypeProductComponent,
    LoginComponent,
    ProductsComponent,
    CartComponent,
    RightCartComponent,
    PriceFormatPipe,
    DetailsProductComponent,
    CateProductComponent,
    BreadcrumbComponent,
    ChangePasswordComponent,
    AdminComponent,
    SidebarComponent,
    DashboardAdminComponent,
    ProductAdminComponent,
    AddProductAdminComponent,
    BillsComponent,
    BillDetailsComponent,
    EditProductDialog,
    PopupEditSuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSelectModule,
    MatRadioModule,
    HttpClientModule,
    FontAwesomeModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
