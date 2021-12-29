import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { NgTerminalModule } from 'ng-terminal';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TerminalComponent } from './components/terminal/terminal.component';
import { WarningAlertComponent } from './components/warning-alert/warning-alert.component';
import { CardComponent } from './components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TerminalComponent,
    WarningAlertComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgTerminalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
