import { NgModule } from '@angular/core';
import { AdminService } from '../../services/admin-service';

export class AdminLogin {
  CheckLogin(adminService: AdminService) {
    return adminService.CheckLogin();
}
}
