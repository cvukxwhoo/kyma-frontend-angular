import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './page/home/home.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// module
import { MatIconModule } from '@angular/material/icon';
import { HeaderTopComponent } from './components/header/components/header-top/header-top.component';
import { HeaderBottomComponent } from './components/header/components/header-bottom/header-bottom.component';
import { SlideImageComponent } from './page/home/components/slide-image/slide-image.component';
import { TypeProductComponent } from './page/home/components/type-product/type-product.component';
import { LoginComponent } from './page/login/login.component';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
