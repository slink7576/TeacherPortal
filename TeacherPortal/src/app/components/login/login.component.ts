import { AdminService } from '../../services/admin-service';
import { Component } from "@angular/core";
import { Location } from '@angular/common';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html'
})

export class LoginComponent {
  password: string;
  errorPass: boolean = false;
  constructor(private adminService: AdminService, private location: Location) {
  }
  Login() {
    this.errorPass = false;
    if (this.password != undefined && this.password.length != 0) {
      this.adminService.Login(this.password).subscribe(data => {
        if (data == true) {
          this.adminService.setCookie('isAuth', 'true');
          this.adminService.setCookie('pass', this.password);
          window.location.replace('/admin/articles');
        }
        else {
          this.errorPass = true;
        }
      });
    }
  }
}
