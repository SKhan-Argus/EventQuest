import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  private isLogged:string = 'false';
  
  private loggedInUser :any;
  

  // Example: Storing a value with the key "username"


  constructor(private router:Router) {
    this.isLogged = localStorage.getItem('isLogged') || 'false';
    const storedUser =localStorage.getItem('user') || '';
    if(storedUser != ''){
      this.loggedInUser =JSON.parse(storedUser);
    }
   }

  isLoggedIn(){
    // return localStorage.getItem('isLogged');
    //console.log(this.isLogged);
    
    return this.isLogged;
  }

  getUser(){
    const storedUser =localStorage.getItem('user') || '';
    if(storedUser != ''){
      this.loggedInUser =JSON.parse(storedUser);
    }
    return this.loggedInUser;
  }

  login(user:any){
    localStorage.setItem('isLogged', 'true');
    // this.isLogged = 'true';
    // this.loggedInUser=user;
    // console.log(user);
    //console.log("logging in");
    
    
    localStorage.setItem('user', JSON.stringify(user));
    //console.log("setting user");
    //console.log(user);
    //console.log(this.loggedInUser.username);
    // const storedUser = localStorage.getItem('user');

    // if(storedUser){
      // this.loggedInUser = JSON.parse(storedUser);
    // }
  }

  logout(){
    localStorage.setItem('isLogged', 'false');
    localStorage.setItem('user', '');
   //this.router.navigate(['/login']);

  }
}
