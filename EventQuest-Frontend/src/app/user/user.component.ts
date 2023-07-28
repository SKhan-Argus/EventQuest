import { Component, OnInit } from '@angular/core';
import { Event } from '../interface/Event';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
import { ApiService } from '../api.service';
import { MyAuthService } from '../my-auth.service';
import { Router} from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  eventName: string = '';
  eventLocation: string = '';
  events: Event[] = [];

  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private apiService: ApiService,
    private myauth: MyAuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.events = [];
    if (!(this.myauth.isLoggedIn() === 'true')) {
      this.router.navigate(['/login']);
      return;
    }
  }

  searchEventsWithName() {
    this.http
      .get(`http://localhost:8080/events/name?name=${this.eventName}`, {
        headers: this.apiService.getHeadersWithToken(),
      })
      .subscribe(
        (response: any) => {
          this.events = response;
          console.log(this.events);
        },
        (error) => {
          console.log(error);          
        }
      );
  }
  searchEventsWithLocation() {
    //console.log(this.apiService.getHeadersWithToken().get('Authorization'));

    this.http
      .get(
        `http://localhost:8080/events/location?location=${this.eventLocation}`,
        {
          headers: this.apiService.getHeadersWithToken(),
        }
      )
      .subscribe(
        (response: any) => {
          this.events = response;
          console.log(this.events);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  bookSeat(event: Event) {
    let dialogRef = this.dialog.open(EventDialogComponent, {
      width: '500px',
      data: {
        event,
      },
    });
    const backgroundButtons = document.querySelectorAll('.background');
    backgroundButtons.forEach((button: Element) => {
      (button as HTMLButtonElement).disabled = true;
    });

    document.body.classList.add('blur-background');

    dialogRef.afterClosed().subscribe(() => {
      const backgroundButtons = document.querySelectorAll('.background');
      backgroundButtons.forEach((button: Element) => {
        (button as HTMLButtonElement).disabled = false;
      });

      document.body.classList.remove('blur-background');
    });
  }
}
