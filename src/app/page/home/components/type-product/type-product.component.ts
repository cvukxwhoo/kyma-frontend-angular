import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-type-product',
  templateUrl: './type-product.component.html',
  styleUrls: ['./type-product.component.scss'],
})
export class TypeProductComponent implements OnInit {
  listCategory: any[];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cookiesService: CookiesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.productService.getAllCategory().subscribe({
      next: (res) => {
        this.listCategory = res.data;
        this.cookiesService.setToken(String(res.data), 7);
      },
      error: (err) => {
        alert('Cant Get Category');
      },
    });
  }
}
