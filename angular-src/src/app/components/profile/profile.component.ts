import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  userID: String;
  quotesList: String[];
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // load on init
  ngOnInit() {
    this.authService.getProfile().subscribe(
      profile => {
      this.user = profile.user;

    },
     err => {
      console.log(err);
      return false;
    }
  );
  }

  // quotes portion
  showUserQuote() {
    this.userID = this.user._id;
    const userIDContainer = {
      id: this.userID };
    this.authService.getQuote(userIDContainer).subscribe(quote => {
      // console.log(quote);
      this.quotesList = quote.quoteList.quote;
    });
  }



}
