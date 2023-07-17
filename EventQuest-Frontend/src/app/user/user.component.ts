import { Component } from '@angular/core';
import { Event } from '../interface/Event';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../interface/Booking';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EventDialogComponent } from '../event-dialog/event-dialog.component';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  eventName: string = '';
  eventLocation: string = '';
  events:Event[]=[];


  constructor(private http: HttpClient, private dialog:MatDialog, ) {}

  ngOnInit(){
    this.events = [];
  }

  searchEventsWithName() {

    this.http.get(`http://localhost:8080/events/name?name=${this.eventName}`).subscribe(
      (response:any) => {
        this.events = response;
        console.log(this.events);
        
        
       }, (error) => {
        console.log(error);
        
       });


  }
  searchEventsWithLocation() {
    this.http.get(`http://localhost:8080/events/location?location=${this.eventLocation}`).subscribe(
      (response:any) => {
        this.events = response;
        console.log(this.events);
        
        
       }, (error) => {
        console.log(error);
        
       });
  }
  bookSeat(event:Event){
    let dialogRef = this.dialog.open(EventDialogComponent, {
      width: '500px',
      data: {
        event,
      }
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
    })
    

  }
}
