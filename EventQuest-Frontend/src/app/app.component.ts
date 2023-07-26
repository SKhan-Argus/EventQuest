import { Component } from '@angular/core'; 
import { MyAuthService } from './my-auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EventQuest_Ui';

  // isLoggedIn!:string;
  // loggedInUser!:any;

  // constructor(private myauth:MyAuthService, private router:Router){
  //   this.isLoggedIn = myauth.isLoggedIn();
  //   this.loggedInUser = myauth.getUser();
  // }



  // logout(){
  //   this.myauth.logout();
  //   this.router.navigate(['/login']);
  // }
}
