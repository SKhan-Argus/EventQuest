import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  
  private getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Method to create the request headers with the JWT token
  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    if (!token) {
      // Handle the case when the token is not available (e.g., user not logged in)
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  // Method to handle API errors
  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    // You can add your custom error handling logic here
    return throwError('Something went wrong.');
  }

  // Method to perform authenticated GET requests
  get(url: string): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.baseUrl}/${url}`, { headers }).pipe(catchError(this.handleError));
  }

  // Method to perform authenticated POST requests
  post(url: string, data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.baseUrl}/${url}`, data, { headers }).pipe(catchError(this.handleError));
  }

  // Add more methods for PUT, DELETE, etc. if needed
  public getHeadersWithToken(): HttpHeaders {
    const token = this.getToken();
    // console.log("token2 : "+ token);
    
    if (!token) {
      // Handle the case when the token is not available (e.g., user not logged in)
      return new HttpHeaders();
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }
}
