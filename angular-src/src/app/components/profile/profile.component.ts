import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {QuoteService} from '../../services/quote.service';
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
    private router: Router,
    private quoteService: QuoteService,
    private flashMessage: FlashMessagesService
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
    //const userIDContainer = {
      //id: this.userID };
    this.quoteService.getQuote().subscribe(quote => {
      // console.log(quote);
      this.quotesList = quote.quoteList.quote;
    });
  }

  // The function to delete a quote
  deleteUserQuote(id) {
    const deleteID = {id : id };
    this.quoteService.removeQuote(deleteID).subscribe(removeQuote => {

      if (removeQuote.success) {

        this.flashMessage.show('Remove Success !', {cssClass: 'alert-success', timeout: 1000});
        this.showUserQuote(); // reload array contain after deleting quotes

      } else {
        this.flashMessage.show(removeQuote.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/profile']);
      }

    });
    console.log(id);
  }



}
