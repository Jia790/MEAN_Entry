import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {QuoteService} from '../../services/quote.service';
import {Router} from '@angular/router'; // for redirection

@Component({
  selector: 'app-newquote',
  templateUrl: './newquote.component.html',
  styleUrls: ['./newquote.component.css']
})
export class NewquoteComponent implements OnInit {

  userObj: any;
  userID: String;
  name: String;
  quote: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private quoteService: QuoteService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onQuoteSubmit() {
    this.userObj = JSON.parse(localStorage.getItem('user'));
    this.userID = this.userObj.id;

    const quote = {
      id: this.userID,
      name: this.name,
      quote: this.quote };

      this.quoteService.addQuote(quote).subscribe(quoteInserted => {
        if (quoteInserted.success) {

          this.flashMessage.show('Quote Add Success !', {cssClass: 'alert-success', timeout: 1000});
          this.router.navigate(['/profile']);
        } else {
          this.flashMessage.show(quoteInserted.msg, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/addQuote']);
        }
      });
      // not done, did not add in app.module.ts yet
      // function is not complete
  }

}
