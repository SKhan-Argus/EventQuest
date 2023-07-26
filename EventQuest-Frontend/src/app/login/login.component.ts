import { Component } from '@angular/core';
import { LoginForm } from '../interface/LoginForm';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MyAuthService } from '../my-auth.service';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private toastr:ToastrService,private http: HttpClient, private router:Router, private ngxuiloader:NgxUiLoaderService, private myauth:MyAuthService) {}

  login() {
    this.ngxuiloader.start();
    this.http.post('http://localhost:8080/users/login', this.loginForm).subscribe(
      (response: any) => {
        if (response.success===true) {
          // Login successful]
          this.ngxuiloader.stop();
          console.log("Login success");
          console.log(response.user);
          
          this.myauth.login(response.user);
          //localStorage.setItem('jwtToken', response.token);    
          //console.log(response.token);


          this.router.navigate(['/user']);
          this.toastr.success('', 'LogIn Successful !');

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
  redirectToForgetPassword(){
    this.ngxuiloader.start();
    this.ngxuiloader.stop();
    this.router.navigate(['/forget']);
  }
}
