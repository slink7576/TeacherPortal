import { Component } from "@angular/core";
import { AdminService } from '../../services/admin-service';

@Component({
  selector: 'app-admin-component',
  templateUrl: './admin.component.html'
})
export class AdminComponent {
  constructor(private adminService: AdminService) {

  }
  Logout() {
    this.adminService.Logout();
  }
}
