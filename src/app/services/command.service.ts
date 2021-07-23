import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor() { }

  execute(command: string): string {
    try {
      const args = command.split(" ")
      const response = this.findResponseForArguments(args)  
      return response
    } catch (error) {
      throw error
    }
  }

  findResponseForArguments(args: string[]): string {
    return "lol"
  }
}
