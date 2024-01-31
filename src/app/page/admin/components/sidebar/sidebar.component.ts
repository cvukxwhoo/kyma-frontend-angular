import { Component } from '@angular/core';
import { faChevronDown, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  faChevronDown = faChevronDown;
  faBars = faBars;

  isProductHidden = true;
  isBillHidden = true;

  handleProductHidden() {
    this.isProductHidden = !this.isProductHidden;
  }

  handleBillHidden() {
    this.isBillHidden = !this.isBillHidden;
  }
}
