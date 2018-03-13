import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'; // imported to use function to check for logged in

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
