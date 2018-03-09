import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
// included to project result from observable ('post' is the observable in this case)
import 'rxjs/add/operator/map';

@Injectable()
export class QuoteService {

  temp: any = JSON.parse(localStorage.getItem('user'));
  userID: any = this.temp.id;

  constructor(private http: Http) { }

  addQuote(quoteObj) {
      const headers = new Headers();
      headers.append('Content-Type' , 'application/json' );
      return this.http.post('http://localhost:3001/quote/add', quoteObj, {headers: headers}).map(res => res.json());

  }

  getQuote() {
    // console.log(this.userID);
    const UID = {id : this.userID};
    const headers = new Headers();
    headers.append('Content-Type' , 'application/json' );
    return this.http.post('http://localhost:3001/quote/returnQuotes', UID , {headers: headers}).map(res => res.json());
  }

      // pass id from user of profile to function remove quote posted by this user
  removeQuote(deleteId) {
        const headers = new Headers();
        headers.append('Content-Type' , 'application/json' );
        return this.http.post('http://localhost:3001/quote/removeQuote', deleteId , {headers: headers}).map(res => res.json());
      }

}
