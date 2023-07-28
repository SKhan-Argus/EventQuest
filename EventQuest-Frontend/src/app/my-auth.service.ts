import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MyAuthService {
  private isLogged: string = 'false';

  private loggedInUser: any;

  constructor(private router: Router) {
    this.isLogged = localStorage.getItem('isLogged') || 'false';
    const storedUser = localStorage.getItem('user') || '';
    if (storedUser != '') {
      this.loggedInUser = JSON.parse(storedUser);
    }
  }

  isLoggedIn() {
    return this.isLogged;
  }

  getUser() {
    const storedUser = localStorage.getItem('user') || '';
    if (storedUser != '') {
      this.loggedInUser = JSON.parse(storedUser);
    }
    return this.loggedInUser;
  }

  login(user: any) {
    localStorage.setItem('isLogged', 'true');

    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    localStorage.setItem('isLogged', 'false');
    localStorage.setItem('user', '');
  }
}
