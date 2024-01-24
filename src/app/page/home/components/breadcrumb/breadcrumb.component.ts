import { Component } from '@angular/core';
import { Breadcrumb } from './breadcrumb.interface';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.breadcrumbService.breadcrumbs$.subscribe((breadcrumbs) => {
      this.breadcrumbs = breadcrumbs;
    });
  }
}
