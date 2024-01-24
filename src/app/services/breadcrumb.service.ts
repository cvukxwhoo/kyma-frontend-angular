import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Breadcrumb } from '../page/home/components/breadcrumb/breadcrumb.interface';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbsSubject = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$: Observable<Breadcrumb[]> =
    this.breadcrumbsSubject.asObservable();

  setBreadcrumbs(breadcrumbs: Breadcrumb[]) {
    this.breadcrumbsSubject.next(breadcrumbs);
  }

  updateBreadcrumbsByRoute(route: string, params: any) {
    // Implement logic to dynamically update breadcrumbs based on the route and params
    // You can call your API or perform any other logic here
    let dynamicBreadcrumbs: Breadcrumb[] = [];

    if (route === 'productList') {
      dynamicBreadcrumbs = [
        { label: 'Home', url: '/' },
        { label: 'Products', url: '/products' },
        { label: 'Product List', url: '/products/list' },
      ];
    } else if (route === 'productDetails') {
      dynamicBreadcrumbs = [
        { label: 'Home', url: '/' },
        { label: 'Products', url: '/products' },
        {
          label: 'Product Details',
          url: `/products/details/${params.productId}`,
        },
      ];
    }

    this.setBreadcrumbs(dynamicBreadcrumbs);
  }
}
