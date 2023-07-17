import { Component } from '@angular/core';
import { LoginForm } from '../interface/LoginForm';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  constructor(private http: HttpClient, private router:Router) {}

  login() {
    this.http.post('http://localhost:8080/users/login', this.loginForm).subscribe(
      (response: any) => {
        if (response.success===true) {
          // Login successful
          console.log("success")
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        // Error occurred during login
        if(error.status === 401){
          console.log(error);
        }
        else{
          console.log('Login error:', error);
        }
      }
    );
  }

  redirectToSignup(){
    this.router.navigate(['/signup']);
  }
}
