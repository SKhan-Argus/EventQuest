import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private ngsuiloader:NgxUiLoaderService, private router:Router){}

  loginPage(){
    this.ngsuiloader.start();
    this.router.navigate(['/login']);
    this.ngsuiloader.stop();


  }

  signupPage(){
    this.ngsuiloader.start();
    this.router.navigate(['/signup']);
    this.ngsuiloader.stop();


  }

}
