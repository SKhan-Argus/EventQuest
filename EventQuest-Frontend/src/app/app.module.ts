import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { BookingComponent } from './booking/booking.component';
import { NgxUiLoaderModule,NgxUiLoaderConfig,SPINNER,PB_DIRECTION } from 'ngx-ui-loader';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { SampleEventComponent } from './sample-event/sample-event.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ToastrModule } from 'ngx-toastr';
import { timeout } from 'rxjs';


const ngxUiLoaderConfig:NgxUiLoaderConfig={
  text:"Loading..",
  textColor:"#FFFFFF",
  textPosition:"center-center",
  pbColor:"#0069d9",
  bgsColor:"#0069d9",
  fgsColor:"#0069d9",
  fgsType:SPINNER.threeStrings,
  fgsSize:100,
  pbDirection:PB_DIRECTION.leftToRight,
  pbThickness:5
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UserComponent,
    EventDialogComponent,
    BookingComponent,
    ForgetPasswordComponent,
    SampleEventComponent,
    NavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot({
      timeOut:5000,
      positionClass:'toast-bottom-right',
      preventDuplicates:true,
      closeButton:true,

}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
