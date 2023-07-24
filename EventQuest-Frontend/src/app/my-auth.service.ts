import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class MyAuthService {

  //private isLogged:boolean = false;
  private loggedInUser :any = null;

  // Example: Storing a value with the key "username"


  constructor() {
    localStorage.setItem('isLogged', 'false');
    localStorage.setItem('user', '');
   }

  isLoggedIn(){
    return localStorage.getItem('isLogged');
  }

  login(user:any){
    localStorage.setItem('isLogged', 'true');
    console.log(user);
    
    localStorage.setItem('user', JSON.stringify(user));

    //console.log(this.loggedInUser.username);
    const storedUser = localStorage.getItem('user');

    if(storedUser){
      this.loggedInUser = JSON.parse(storedUser);
    }
  }

  logout(){
    localStorage.setItem('isLogged', 'false');
    localStorage.setItem('user', '');

  }
}
