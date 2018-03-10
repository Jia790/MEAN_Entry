import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  time: any;
  constructor() { }

  ngOnInit() {
    this.showTime();
  }

  // function to display current time to the user
  showTime() {
    const currentTime = document.querySelector('#currentTime');
    const intvl = setInterval(function() {
      this.time = new Date();
      currentTime.innerHTML =  'It is currently : ' + this.time;
    }, 1000);
  }
}
