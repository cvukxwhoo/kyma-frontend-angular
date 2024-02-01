import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss'],
})
export class DashboardAdminComponent implements OnInit {
  displayedColumns: string[] = ['fullName', 'email', 'role', 'id', 'signUp'];
  dataSource: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUser().subscribe((data) => {
      console.log(data);
      this.dataSource = data.data;
    });
  }
}
