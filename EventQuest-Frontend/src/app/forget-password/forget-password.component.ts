import { Component } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword:string='';
  step: 'email' | 'otp-verification' | 'new-password' = 'email';

  onSubmit() {
    switch (this.step) {
      case 'email':
        // Here you would implement the logic to verify the user's email
        // and send the OTP to the user's email address.
        // For simplicity, let's assume the email is valid, and we proceed to the next step:
        this.step = 'otp-verification';
        break;
      case 'otp-verification':
        // Here you would implement the logic to verify the OTP provided by the user.
        // For simplicity, let's assume the OTP is valid, and we proceed to the next step:
        this.step = 'new-password';
        break;
      case 'new-password':
        // Here you would implement the logic to update the user's password.
        // For simplicity, let's assume the new password is successfully updated.
        // You can add your own backend API call to update the password.
        alert('Password Updated Successfully!');
        // After the password is updated, you may choose to navigate the user to the login page.
        // For demonstration purposes, we reset the component to the initial state:
        this.email = '';
        this.otp = '';
        this.newPassword = '';
        this.step = 'email';
        break;
    }
  }
}
