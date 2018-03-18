import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {EntryService} from '../../services/entry.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  userID: String;
  entryList: String[];
  constructor(
    private authService: AuthService,
    private router: Router,
    private entryService: EntryService,
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
  showUserEntry() {
    this.entryService.getEntry().subscribe(entry => {
      // console.log(quote);
      this.entryList = entry.entryList.entry;
    });
  }

  hideEntry() {
    this.entryList = [];
  }

  // The function to delete a quote
  deleteUserEntry(id) {
    const deleteID = {id : id };
    this.entryService.removeEntry(deleteID).subscribe(removeEntry => {

      if (removeEntry.success) {

        this.flashMessage.show('Remove Success !', {cssClass: 'alert-success', timeout: 1000});
        this.showUserEntry(); // reload array contain after deleting quotes

      } else {
        this.flashMessage.show(removeEntry.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/profile']);
      }

    });
    // console.log(id);
  }



}
