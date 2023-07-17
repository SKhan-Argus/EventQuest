import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from '../interface/Event';
import { Booking } from '../interface/Booking';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements AfterViewInit {
  @ViewChild('content2', { static: false }) el!: ElementRef;
  title = 'Booking Bill';

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

  constructor(private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.route.queryParams.subscribe((params) => {
      this.booking = JSON.parse(params['booking']);
      this.event = JSON.parse(params['event']);
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
