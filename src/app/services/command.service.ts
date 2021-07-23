import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  private name: string
  private birthday: Date
  private phone: string
  private email: string
  private web: string
  private location: string

  constructor() {
    this.name = "Eneko Díaz Romero"
    this.birthday = new Date(1993, 7, 19)
    this.phone = "+34 611 433 134"
    this.email = "contacto@enekodiaz.es"
    this.web = "https://enekodiaz.es"
    this.location = "Alcala de Henares, Madrid"
  }

  execute(command: string): string {
    try {
      const args = command.split(" ")
      args.shift()
      const response = this.findResponseForArguments(args)  
      return response
    } catch (error) {
      throw error
    }
  }

  private findResponseForArguments(args: string[]): string {
    const action = args[0]
    switch (action) {
      case "help": return this.enekoHelpText()
      case "get": return this.handleGetAction(args)
      case "contact": return this.handleContactAction(args)
      default: throw new Error("command not supported")
    }
  }

  private handleGetAction(args: string[]): string {
    args.shift()
    const element = args[0]
    switch (element) {
      case "help": return this.getHelpText()
      case "phone": return this.phone
      case "name": return this.name
      case "birthday": return this.birthday.toString()
      case "age": return this.getAge()
      case "email": return this.email
      case "web": return this.web
      case "location": return this.location
      case "all": 
        const text = "------------------\n" +
        "\rName:\t\t" + this.name + "\n" +
        "\rAge:\t\t" + this.getAge() + "\n" +
        "\rEmail:\t\t" + this.email + "\n" +
        "\rPhone:\t\t" + this.phone + "\n" +
        "\rWeb:\t\t" + this.web + "\n" +
        "\rLocation:\t" + this.location + "\n" +
        "\r------------------"
        return text
      default: throw new Error("information is not available")
    }
  }

  private handleContactAction(args: string[]) {
    args.shift()
    const contacMethod = args[0]
    switch (contacMethod) {
      case "email": 
        window.location.href = "mailto:" + this.email
        return "Opening mail app..."
      case "phone":
        window.location.href = "tel:" + this.phone.replace(/ /g, "")
        return "Perfoming a phone call..."
      case "location":
        window.location.href = "http://maps.apple.com/?q=alcala%20de%20henares"
        return "Opening maps..."
      case "help": return this.contactHelpText()
      default: throw new Error("Contact method not available")
    }
  }

  private getAge(): string {
    const now = Date.now()
    const brithDate = this.birthday.getTime()
    const difference = now - brithDate
    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365.25))
    return years.toString()
  }

  private enekoHelpText(): string {
    const helpText = "\r\nAvailable commands:\n\n" +
    "\r\tget [option] - gets the requested information about Eneko\n" +
    "\r\tdownload [option] - downloads useful assets\n" +
    "\r\tcontact [option] - performs operations to get in touch with Eneko\n" +
    "\r\nUsage examples:\n\n" +
    "\r\teneko get name\n" +
    "\r\teneko download cv\n" +
    "\r\teneko contact email\n" +
    "\r\nTo get more info about each command, type:\n\n" +
    "\r\teneko [command] help"
    return helpText
  }

  private getHelpText(): string {
    const helpText = "\r\nThese are the available options for get command:\n\n" +
    "\r\tall\n" +
    "\r\tname\n" +
    "\r\tbirthday\n" +
    "\r\tage\n" +
    "\r\tphone\n" +
    "\r\temail\n" +
    "\r\tweb\n" +
    "\r\tlocation\n"
    return helpText
  }

  private contactHelpText(): string {
    const helpText = "\r\nThese are the available options for contact command:\n\n" +
    "\r\temail - Opens the mail app\n" +
    "\r\tphone - Performs a phone call to Eneko's number\n" +
    "\r\tlocation - Opens the map application to point where Eneko lives\n"
    return helpText
  }
}
