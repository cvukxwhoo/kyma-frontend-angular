import { Component } from '@angular/core';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    // Update breadcrumbs for this route
    this.breadcrumbService.setBreadcrumbs([
      { label: 'Trang chủ', url: '/' },
      { label: 'Products', url: '/products' },
      { label: 'Product List', url: '/products/list' },
    ]);
  }
}
