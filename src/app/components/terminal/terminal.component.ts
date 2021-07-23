import { ViewChild, Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';
import { NgTerminal } from 'ng-terminal';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TerminalComponent implements OnInit {

  @ViewChild("terminal", { static: true }) terminal!: NgTerminal

  constructor() { }

  ngOnInit(): void {
    
  }

}
