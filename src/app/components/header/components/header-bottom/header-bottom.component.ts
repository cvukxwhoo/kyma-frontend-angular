// header-bottom.component.ts

import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-header-bottom',
  templateUrl: './header-bottom.component.html',
  styleUrls: ['./header-bottom.component.scss'],
})
export class HeaderBottomComponent implements OnInit {
  categories: any[] = [];
  selectedCategory: any = null; // Variable to store the selected category

  constructor(private categoryService: CategoryService) {}

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
