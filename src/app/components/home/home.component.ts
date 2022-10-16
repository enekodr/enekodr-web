import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public android: boolean

  constructor() { 
    this.android = /Android/.test(navigator.userAgent)
  }
}
