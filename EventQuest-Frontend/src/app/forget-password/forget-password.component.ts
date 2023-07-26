import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  email: string = '';
  otp: string = '';
  otpGenerated: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  step: 'email' | 'otp-verification' | 'new-password' = 'email';
  isEmailVerified: boolean = false; 

  constructor(
    private http: HttpClient,
    private ngxUiLoader: NgxUiLoaderService,
    private router:Router,
    private toastr:ToastrService,
  ) {}

  async onSubmit() {
    switch (this.step) {
      //first
      case 'email':
        const otp = Math.floor(100000 + Math.random() * 900000) + ''; // Generate a 6-digit OTP
        this.otpGenerated = otp;
        const otpData = {
          email: this.email,
          otp: otp,
        };

        try {
          this.ngxUiLoader.start();
          const forgetPasswordResponse: any = await this.http
            .post(`http://localhost:8080/users/forget-password`, otpData)
            .toPromise();
          //console.log(forgetPasswordResponse);
          this.ngxUiLoader.stop();
          this.step = 'otp-verification';
          this.isEmailVerified = true;
        } catch (error) {
          console.log(error);
        }
        break;

      //second
      case 'otp-verification':
        if (this.otp === this.otpGenerated) {
          this.step = 'new-password';
          //console.log("otp verified");
        } else {
          console.log('wrong otp');
        }
        break;

      //third
      case 'new-password':
        if (this.newPassword === this.confirmPassword) {
          const updateData = {
            username: this.email,
            password: this.confirmPassword,
          };
          console.log(updateData);
          
          const forgetPasswordResponse: any = await this.http
            .post(`http://localhost:8080/users/update-password`, updateData)
            .toPromise();
          // console.log(forgetPasswordResponse);
          
          this.email = '';
          this.otp = '';
          this.newPassword = '';
          this.step = 'email';
          this.confirmPassword='';
          this.isEmailVerified = false;

          this.router.navigate(['/login']);
          this.toastr.success('', 'Password Change Successful!');

        }

        break;
    }
  }

  redirectToSignup(){
    this.ngxUiLoader.start();
    this.ngxUiLoader.stop();
    this.router.navigate(['/signup']);
  }

  redirectToLogin(){
    this.ngxUiLoader.start();
    this.ngxUiLoader.stop();
    this.router.navigate(['/login']);
  }
}import { ToastrService } from 'ngx-toastr';

