import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router'; // for redirection

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // create properties for register
  name: String;
  username: String;
  password: String;
  email: String;
  canRegister: boolean;

  // injecting imports
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      password: this.password,
      email: this.email };

      // required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill out all fields ', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // check for valid email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please enter in a valid email ', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // check for already exisiting username
    this.authService.canUseName(user).subscribe(data => {
      if (!data.success) {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.canRegister = false;
        return false;
      } else { this.canRegister = true; }
    });

    // Register User

 if (this.canRegister) {
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Registration complete ! ', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);

      } else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

}

}
