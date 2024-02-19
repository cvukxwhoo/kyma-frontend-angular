import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-type-product',
  templateUrl: './type-product.component.html',
  styleUrls: ['./type-product.component.scss'],
})
export class TypeProductComponent implements OnInit {
  listCategory: any[];
  userId = this.authService.getIdFromToken();

  constructor(
    private productService: ProductService,
    private router: Router,
    private cookiesService: CookiesService,
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.productService.getAllCategory().subscribe({
      next: (res) => {
        this.listCategory = res.data;
      },
      error: (err) => {
        alert('Cant Get Category');
      },
    });
  }

  navigateToProductPage(categoryName: string): void {
    this.router.navigate(['/products', categoryName]);
  }
}
