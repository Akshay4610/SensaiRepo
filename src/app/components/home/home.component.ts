import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {  Subscription } from 'rxjs'

import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  isLoggedIn : boolean  = false;

  private subscription : Subscription;


  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    //this.isLoggedIn = !(this.authenticationService.currentUserValue == undefined || this.authenticationService.currentUserValue == null)
    this.subscription = this.authenticationService.currentUserSubject
                                          .subscribe(user => {
                                            this.isLoggedIn = user != undefined && user != null;
                                          })
  }
  
  logout() {
    this.authenticationService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
