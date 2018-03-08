import { Component } from '@angular/core'; // bring in main angular page

@Component({ // allow to add meta data
  selector: 'app-root', // html tag used to insert component
  templateUrl: './app.component.html', // the html file that is associated with the component
  styleUrls: ['./app.component.css'] // the style sheets to use
})
export class AppComponent { // main component class
  // property
  title = 'MEAN Quote';
}
