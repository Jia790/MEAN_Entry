import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewquoteComponent } from './components/newquote/newquote.component';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {QuoteService} from './services/quote.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { Quote } from '@angular/compiler';


// the things inside the object is how the components are connected with the angular app
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent}
  {path: 'addQuote', component: NewquoteComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    NewquoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // added from video
    HttpModule, // added from video
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, QuoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
