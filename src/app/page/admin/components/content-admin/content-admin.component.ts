import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-content-admin',
  templateUrl: './content-admin.component.html',
  styleUrls: ['./content-admin.component.scss'],
})
export class ContentAdminComponent implements OnInit {
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
