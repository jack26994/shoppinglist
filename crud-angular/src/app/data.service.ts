import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class DataService {

  constructor(private http: Http,
    private httpClient: HttpClient) { }  

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error ocurred: ', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return new ErrorObservable('Something bad happened; please try again later.');
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  getShoppingItems(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/api/items')
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError)
      );
  }

  addShoppingItem(newItem): Observable<any> {
    // let headers = new Headers();
    // headers.append('Content-Type', 'application/json');

    return this.httpClient.post('http://localhost:3000/api/item', newItem, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteShoppingItem(id): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/api/item/${id}`);
  }

  updateShoppingItem(newItem): Observable<any> {
   /*  let headers = new Headers();
    headers.append('Content-Type', 'application/json'); */

    return this.httpClient.put(`http://localhost:3000/api/item/${newItem._id}`, newItem, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

}
