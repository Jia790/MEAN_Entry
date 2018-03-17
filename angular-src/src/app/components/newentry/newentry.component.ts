import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {EntryService} from '../../services/entry.service';
import {Router} from '@angular/router'; // for redirection

@Component({
  selector: 'app-entry',
  templateUrl: './newentry.component.html',
  styleUrls: ['./newentry.component.css']
})
export class NewentryComponent implements OnInit {

  userObj: any;
  userID: String;
  name: String;
  entry: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private entryService: EntryService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onEntrySubmit() {
    this.userObj = JSON.parse(localStorage.getItem('user'));
    this.userID = this.userObj.id;

    const entry = {
      id: this.userID,
      name: this.name,
      entry: this.entry };

      this.entryService.addEntry(entry).subscribe(entryInserted => {
        if (entryInserted.success) {

          this.flashMessage.show('Entry Add Success !', {cssClass: 'alert-success', timeout: 1000});
          this.router.navigate(['/profile']);
        } else {
          this.flashMessage.show(entryInserted.msg, {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/addEntry']);
        }
      });
      // not done, did not add in app.module.ts yet
      // function is not complete
  }

}
