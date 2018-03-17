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
import { NewentryComponent } from './components/newentry/newentry.component';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {EntryService} from './services/entry.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { Quote } from '@angular/compiler';
// for auth guard to prevent access to certain pages when not logged in
import {AuthGuard} from './guards/auth.guard';


// the things inside the object is how the components are connected with the angular app
const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  // by adding canActivate: [AuthGuard] it will only activate the link if AuthGuard returns true
  {path: 'addEntry', component: NewentryComponent, canActivate: [AuthGuard]}
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
    NewentryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // added from video
    HttpModule, // added from video
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, EntryService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
