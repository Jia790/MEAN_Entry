import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
// included to project result from observable ('post' is the observable in this case)
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;
  // proof of concept, preparing for migration to quote service file
  temp: any = JSON.parse(localStorage.getItem('user'));
  userID: any = this.temp.id;



  constructor(private http: Http) { }

    registerUser(user) {
      const headers = new Headers();
      headers.append('Content-Type' , 'application/json' );
      return this.http.post('http://localhost:3001/user/register', user, {headers: headers}).map(res => res.json());

    }

    authenticateUser(user) {
      const headers = new Headers();
      headers.append('Content-Type' , 'application/json' );
      return this.http.post('http://localhost:3001/user/authenticate', user, {headers: headers}).map(res => res.json());
    }



    // get token to show user is allowed to view restricted pages
    loadToken() {
      const token = localStorage.getItem('id_token');
      this.authToken = token;
    }

    // get request for profile
    getProfile() {
      const headers = new Headers();
      this.loadToken(); // get the token from local storage
      headers.append('Authorization', this.authToken); // send token to endpoint for authorization
      headers.append('Content-Type' , 'application/json' );
      return this.http.get('http://localhost:3001/user/profile', {headers: headers}).map(res => res.json());
    }

    storeUserData(token, user) {
      // save in local storage takes in key and value
      localStorage.setItem('id_token', token);
      // turn user object into string.
      // Note : local storage can only store strings
      localStorage.setItem('user', JSON.stringify(user));
      this.authToken = token;
      this.user = user;
    }

    logout() {
      this.authToken = null;
      this.user = null;
      localStorage.clear();
    }

    // Quote functions
    // pass id from user of profile to function to show quotes posted by this user
    getQuote(userid) {
      console.log(this.userID); // proof of concept, preparing for migration to quote service file
      const UID = {id : this.userID}; // proof of concept, preparing for migration to quote service file
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
