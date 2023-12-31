import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { BookingComponent } from './booking/booking.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SampleEventComponent } from './sample-event/sample-event.component';
//import { SampleEventComponent } from './sample-event/sample-event.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'user', component: UserComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'forget', component: ForgetPasswordComponent },
  { path: 'test', component: SampleEventComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
