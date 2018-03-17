import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
// included to project result from observable ('post' is the observable in this case)
import 'rxjs/add/operator/map';

@Injectable()
export class EntryService {

  temp: any;
  userID: any;

  constructor(private http: Http) { }

  // Note !: for deploying to Heroku, delete "http://localhost:3001/" from all request
  addEntry(entryObj) {
      const headers = new Headers();
      headers.append('Content-Type' , 'application/json' );
      return this.http.post('http://localhost:3001/entry/add', entryObj, {headers: headers}).map(res => res.json());

  }

  getEntry() {
    // console.log(this.userID);
    this.temp  = JSON.parse(localStorage.getItem('user'));
    this.userID = this.temp.id;
    const UID = {id : this.userID};
    const headers = new Headers();
    headers.append('Content-Type' , 'application/json' );
    return this.http.post('http://localhost:3001/entry/returnEntries', UID , {headers: headers}).map(res => res.json());
  }

      // pass id from user of profile to function remove quote posted by this user
  removeEntry(deleteId) {
        const headers = new Headers();
        headers.append('Content-Type' , 'application/json' );
        return this.http.post('http://localhost:3001/entry//removeEntry', deleteId , {headers: headers}).map(res => res.json());
      }

}
