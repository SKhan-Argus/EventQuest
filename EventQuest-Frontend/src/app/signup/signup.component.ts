import { Component } from '@angular/core';
import { SignupForm } from '../interface/SignupForm';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  confirmPassword: string = '';
  signupForm: SignupForm = {
    username: '',
    password: '',
    email: '',
    firstname: '',
    lastname: '',
    birth: '',
    gender: '',
  };

  constructor(private http: HttpClient, private router: Router) {}

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  signup() {
    const dateOfBirth = new Date(this.signupForm.birth);
    const formattedDOB = this.formatDate(dateOfBirth);
    this.signupForm.birth = formattedDOB;

    console.log(this.signupForm);
    if (this.signupForm.password != this.confirmPassword) {
      alert('Password do not match. Try again');
      this.signupForm.password = '';
      this.confirmPassword = '';
    } else {
      this.signupForm.username = this.signupForm.email;
      this.http
        .post('http://localhost:8080/users/signup', this.signupForm)
        .subscribe(
          (response: any) => {
            console.log(response);

            if (response.success === true) {
              // Login successful
              console.log('success');
              this.router.navigate(['/login']);
            }
          },
          (error) => {
            // Error occurred during login
            console.log('Login error:', error.error.message);
          }
        );
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
