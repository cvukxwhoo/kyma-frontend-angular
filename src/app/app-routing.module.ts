import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component
import { HomeComponent } from './page/home/home.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { LoginComponent } from './page/login/login.component';
import { CartComponent } from './page/cart/cart.component';
import { ProductsComponent } from './page/products/products.component';
import { AuthGuardService } from './services/auth-guard.service';
import { DetailsProductComponent } from './page/details-product/details-product.component';
import { CateProductComponent } from './page/cate-product/cate-product.component';
import { ChangePasswordComponent } from './page/change-password/change-password.component';
import { AdminComponent } from './page/admin/admin.component';
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { ContentAdminComponent } from './page/admin/components/content-admin/content-admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminAuthGuardService],
    children: [
      {
        path: '',
        component: ContentAdminComponent,
      },
    ],
  },

  { path: 'cart', component: CartComponent, canActivate: [AuthGuardService] },
  {
    path: 'products/path/:pathName',
    component: ProductsComponent,
  },
  {
    path: 'products/:categoryName',
    component: CateProductComponent,
  },
  {
    path: 'products/details/:productId',
    component: DetailsProductComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
