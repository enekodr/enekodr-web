import { ViewChild, Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { NgTerminal } from 'ng-terminal';
import { CommandService } from 'src/app/services/command.service';

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
  private history: string[]
  private historyIndex: number

  constructor(private commandService: CommandService) { 
    this.typingIndicator = "$ "
    this.command = ""
    this.history = []
    this.historyIndex = 0
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
        case "ArrowUp": this.arrowTapped("up"); break
        case "ArrowDown": this.arrowTapped("down"); break
        case "ArrowLeft": this.arrowTapped("left"); break
        case "ArrowRight": this.arrowTapped("right"); break
        default: this.keyTapped(keyboardEvent.key); break
      }
    })
  }

  private enterKeyTapped() {
    try {
      this.history.push(this.command)
      this.handleCommand()
      this.command = ""
    } catch (error) {
      this.terminal.write("\r\n\x1B[1;31m" + error + "\x1B[0m")
    } finally {
      this.terminal.write('\r\n' + this.typingIndicator)
      this.historyIndex = 0
    }
  }

  private backspaceKeyTapped() {
    const cursorXPosition = this.terminal.underlying.buffer.active.cursorX - this.typingIndicator.length
    const canErase = cursorXPosition > 0
    if (canErase) {
      this.command = this.command.slice(0, cursorXPosition - 1) + this.command.slice(cursorXPosition)
      this.terminal.write('\b \b')
    }
  }

  private arrowTapped(arrow: string) {
    switch (arrow) {
      case "up":
        const previousCommand = this.getPreviousCommand()
        if (previousCommand) {
          this.command = previousCommand
          this.terminal.write('\x1b[2K\r')   
          this.terminal.write('\r' + this.typingIndicator + previousCommand)
        }
        break
      case "down":
        const nextCommand = this.getNextCommand()
        if (nextCommand) {
          this.command = nextCommand
          this.terminal.write('\x1b[2K\r')
          this.terminal.write('\r' + this.typingIndicator + nextCommand)
        } else {
          this.command = ""
          this.terminal.write('\x1b[2K\r')
          this.terminal.write('\r' + this.typingIndicator)
        }
        break
      case "left":
        break
      case "right":
        break
    }
  }

  private keyTapped(key: string) {
    const cursorXPosition = this.terminal.underlying.buffer.active.cursorX - this.typingIndicator.length
    this.command = this.command.slice(0, cursorXPosition) + key + this.command.slice(cursorXPosition)
    this.terminal.write(key)
  }

  private handleCommand() {
    const command = this.command
    if (command.length > 0) {
      const action = command.split(" ")[0]
      switch (action) {
        case "clear": 
          this.terminal.underlying.reset()
          break
        case "eneko":
          const result = this.commandService.execute(command)
          this.terminal.write('\r\n')
          this.terminal.write(result)
          break
        default:
          this.terminal.write('\r\nCommand not found: ' + action)
      }
    }
  }

  private getPreviousCommand(): string | null {
    let command = null
    if (this.historyIndex < this.history.length) {
      this.historyIndex += 1
      const lastIndex = this.history.length
      const index = lastIndex - this.historyIndex
      command = this.history[index]
    }
    return command
  }

  private getNextCommand(): string | null {
    let command = null
    if (this.historyIndex >= 0) {
      this.historyIndex -= 1
      const lastIndex = this.history.length - 1
      const index = lastIndex - this.historyIndex
      command = this.history[index]
    }
    return command
  }

  private printWelcomeMessage() {
    this.terminal.write("\nHey there! Welcome to eneko-cli web version.")
    this.terminal.write("\r\nUse this terminal to get all the information about me, starting from my age to even downloading a full curriculum.")
    this.terminal.write("\r\n\nGet started by tapping 'eneko help' to get a list of available commands")
    this.terminal.write("\r\n\n\x1B[1;32mNote\x1B[0m: you can clear the console by typing 'clear'")
    this.terminal.write('\r\n\n' + this.typingIndicator)
  }

}
