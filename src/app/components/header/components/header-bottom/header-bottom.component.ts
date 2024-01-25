// header-bottom.component.ts

import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-header-bottom',
  templateUrl: './header-bottom.component.html',
  styleUrls: ['./header-bottom.component.scss'],
})
export class HeaderBottomComponent implements OnInit {
  categories: any[] = [];
  selectedCategory: any = null; // Variable to store the selected category

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private cookiesService: CookiesService
  ) {}

  ngOnInit(): void {
    this.categoryService.getAllCategory().subscribe((data) => {
      this.categories = data.data;
    });
  }

  onSelectCategory(category: any): void {
    // Set the selected category and reset the submenu visibility
    this.selectedCategory = category;
  }

  hideAllSubmenus(): void {
    this.selectedCategory = null; // Reset the selected category to hide the submenu
  }
}
