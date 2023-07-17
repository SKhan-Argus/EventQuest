import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../interface/Event';
import { Booking } from '../interface/Booking';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements AfterViewInit {
  @ViewChild('content2', { static: false }) el!: ElementRef;
  title = 'Booking Bill';

  bookingId:number=0;
  eventId:number=0;

  event: Event = {
    id: 0,
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    availability: 0,
  };

  booking: Booking = {
    eventId: 0,
    userId: 0,
    bookingDate: '',
    ticketQuantity: 1,
    totalPrice: 0,
    status: '',
  };

  constructor(private route: ActivatedRoute, private http:HttpClient) {}

  // getEvent(){
  //   console.log("Event: "+this.eventId);
  //   this.http.get(`http://localhost:8080/events/${this.eventId}`).subscribe((response:any)=>{
  //     console.log(response);
      
  //     this.event.name=response.name;
  //     this.event.date=response.date;
  //     this.event.time=response.time;
  //     this.event.description=response.description;
  //     this.event.location=response.location;
  //     console.log(this.booking);
  //     console.log(this.event);

  //   }, (error)=>{
  //     console.log(error);
      
  //   });
  // }

  // async getBooking(){
  //   await this.http.get(`http://localhost:8080/bookings/${this.bookingId}`).subscribe((response:any)=>{
  //     console.log(response);
  //     this.booking.eventId=response.eventId;
  //     this.booking.bookingDate=response.bookingDate;
  //     this.booking.ticketQuantity = response.ticketQuantity;
  //     this.eventId=response.eventId;
      
  //   }, (error)=>{
  //     console.log(error);
      
  //   });
  // }

  async getBookingEvent() {
    try {
      const bookingResponse: any = await this.http.get(`http://localhost:8080/bookings/${this.bookingId}`).toPromise();
      console.log(bookingResponse);
      this.booking.eventId = bookingResponse.eventId;
      this.booking.bookingDate = bookingResponse.bookingDate;
      this.booking.ticketQuantity = bookingResponse.ticketQuantity;
      this.eventId = bookingResponse.eventId;
  
      const eventResponse: any = await this.http.get(`http://localhost:8080/events/${this.eventId}`).toPromise();
      console.log(eventResponse);
  
      this.event.name = eventResponse.name;
      this.event.date = eventResponse.date;
      this.event.time = eventResponse.time;
      this.event.description = eventResponse.description;
      this.event.location = eventResponse.location;
  
      console.log(this.booking);
      console.log(this.event);
    } catch (error) {
      console.log(error);
    }
  }
  

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.bookingId = JSON.parse(params['bookingId']);
      console.log(this.bookingId);
      this.getBookingEvent();
      //this.getEvent();
      
    });
  }

  generatePdf() { 
    
    const doc = new jsPDF('landscape');
    
    const elementToExport = this.el.nativeElement;
    const buttonToHide = elementToExport.querySelector('button');

  // Hide the download button
  if (buttonToHide) {
    buttonToHide.style.display = 'none';
  }

    html2canvas(elementToExport).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 30, 280, 0);
      doc.save(`eventQuestBill${this.booking.userId}${this.booking.eventId}`);
    });
    if (buttonToHide) {
      buttonToHide.style.display = 'inline-block';
    }
  }
  
}
