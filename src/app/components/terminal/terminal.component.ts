import { ViewChild, Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { NgTerminal } from 'ng-terminal';

@Component({
  selector: 'app-terminal',
  templateUrl: './terminal.component.html',
  styleUrls: ['./terminal.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class TerminalComponent implements AfterViewInit {

  @ViewChild("terminal", { static: true }) terminal!: NgTerminal
  private typingIndicator: string
  private command: string

  constructor() { 
    this.typingIndicator = "$ "
    this.command = ""
  }

  ngAfterViewInit() {
    this.printWelcomeMessage()
    this.subscribeToKeyboardInputs()
  }

  private subscribeToKeyboardInputs() {
    this.terminal.keyEventInput.subscribe(inputEvent => {
      const keyboardEvent = inputEvent.domEvent
      switch (keyboardEvent.key) {
        case "Enter": this.enterKeyTapped(); break
        case "Backspace": this.backspaceKeyTapped(); break
        default: this.keyTapped(keyboardEvent.key); break
      }
    })
  }

  private enterKeyTapped() {
    this.handleCommand()
    this.command = ""
    this.terminal.write('\r\n' + this.typingIndicator)
  }

  private backspaceKeyTapped() {
    const cursorXPosition = this.terminal.underlying.buffer.active.cursorX - this.typingIndicator.length
    const canErase = cursorXPosition > 0
    if (canErase) {
      this.command = this.command.slice(0, cursorXPosition - 1) + this.command.slice(cursorXPosition)
      this.terminal.write('\b \b')
    }
  }

  private keyTapped(key: string) {
    const cursorXPosition = this.terminal.underlying.buffer.active.cursorX - this.typingIndicator.length
    this.command = this.command.slice(0, cursorXPosition) + key + this.command.slice(cursorXPosition)
    this.terminal.write(key)
  }

  private handleCommand() {
    console.log("Command entered:")
    console.log(this.command)
  }

  private printWelcomeMessage() {
    this.terminal.write("\nHey there! Welcome to eneko-cli web version.")
    this.terminal.write("\r\nUse this terminal to get all the information about me, from my age to even a full curriculum.")
    this.terminal.write("\r\n\nGet started by tapping 'eneko help' to get a list of available commands")
    this.terminal.write('\r\n\n' + this.typingIndicator)
  }

}
