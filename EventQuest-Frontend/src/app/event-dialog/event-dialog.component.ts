import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Booking } from '../interface/Booking';
import { Event } from '../interface/Event';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css'],
})
export class EventDialogComponent {
  event: Event = {
    id: 0,
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    availability: 0,
    price: 0,
  };

  booking: Booking = {
    eventId: 0,
    userId: 0,
    bookingDate: '',
    ticketQuantity: 1,
    totalPrice: 0,
    status: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EventDialogComponent>,
    private http: HttpClient,
    private router: Router,
    private ngxuiloader: NgxUiLoaderService,
    private toastr:ToastrService,
  ) {
    this.event = data.event;
  }

  bookEvent(event: Event) {
    Swal.fire({
      title: 'Confirm Booking?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#0069d9',
      cancelButtonColor: '#e62107',
      confirmButtonText: 'Confirm Booking',
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log('Booking confirmed');
        //console.log('Reduce availability and book the event');
        this.booking.eventId = event.id;
        const currentDate = new Date();
        const dateString = currentDate.toLocaleDateString();
        console.log(dateString);
        this.booking.bookingDate = dateString;
        this.booking.totalPrice = this.booking.ticketQuantity * 250;

        this.http
          .post('http://localhost:8080/bookings/add', this.booking)
          .subscribe(
            (response: any) => {
              if (response.success === true) {
                console.log(response);

                // Login successful
                this.ngxuiloader.start();
                this.ngxuiloader.stop();
                this.router.navigate(['/booking'], {
                  queryParams: { bookingId: response.id },
                });
                this.toastr.success('', 'Booking Successful !');

              }
            },
            (error) => {
              console.log(error);
            }
          );

        this.dialogRef.close();
      }
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
