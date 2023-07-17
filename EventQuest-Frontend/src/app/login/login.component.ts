import { Component } from '@angular/core';
import { LoginForm } from '../interface/LoginForm';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: LoginForm = {
    username: '',
    password: ''
  };
  constructor(private http: HttpClient, private router:Router, private ngxuiloader:NgxUiLoaderService) {}

  login() {
    this.ngxuiloader.start();
    this.http.post('http://localhost:8080/users/login', this.loginForm).subscribe(
      (response: any) => {
        if (response.success===true) {
          // Login successful]
          this.ngxuiloader.stop();
          console.log("success")
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        // Error occurred during login
        this.ngxuiloader.stop();
        console.log('Login error:', error.error.message);
      }
    );
  }

  redirectToSignup(){
    this.ngxuiloader.start();
    this.ngxuiloader.stop();
    this.router.navigate(['/signup']);
  }
}
