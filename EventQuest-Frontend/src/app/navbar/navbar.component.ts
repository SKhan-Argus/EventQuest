import { Component } from '@angular/core';
import { MyAuthService } from '../my-auth.service';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isLoggedIn!: string;
  loggedInUser!: any;
  username!: string;

  constructor(
    private myauth: MyAuthService,
    private router: Router,
    private ngxuiloader: NgxUiLoaderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.myauth.isLoggedIn();
    this.loggedInUser = this.myauth.getUser();
    this.username = this.loggedInUser.username;
  }

  logout() {
    this.myauth.logout();
    this.ngxuiloader.start();
    this.ngxuiloader.stop();
    this.router.navigate(['/login']);
    this.toastr.success('', 'LogOut Successful !');
  }
}
