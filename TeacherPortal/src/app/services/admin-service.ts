import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from '../../config';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()

export class AdminService implements CanActivate {
  path: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
    };

    constructor(private http: HttpClient, private router: Router) {
    this.path = Config.SERVER + 'Admin';
    }

    canActivate(): Observable<boolean> | boolean {
        if (this.getCookie('isAuth') == undefined && this.getCookie('pass') == undefined) {
            this.router.navigate(['/admin']);
            return false;
        }
        else {
            return this.http.post<boolean>(this.path, JSON.stringify(this.getCookie('pass')), this.httpOptions);
        }
    }

  Login(pass: string) {
    return this.http.post(this.path, JSON.stringify(pass), this.httpOptions);
  }

  Logout() {
    this.deleteCookie('pass');
    this.deleteCookie('isAuth');
    window.location.replace('/');
    }

  CheckLogin() {
    if (this.getCookie('isAuth') == undefined && this.getCookie('pass') == undefined) {
      window.location.replace('/admin');
    }
    else {
      this.http.post(this.path, JSON.stringify(this.getCookie('pass')), this.httpOptions).subscribe(data => {
        if (data != true) {
          this.Logout();
        }
      })
    }
  }

  setCookie(name: string, val: string) {
    const date = new Date();
    const value = val;
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
  }

  getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length == 2) {
      return parts.pop().split(";").shift();
    }
  }

  deleteCookie(name: string) {
    const date = new Date();
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
  }
}
