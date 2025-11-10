export class Menu{

  constructor(){
    this.selector = 'app-menu'
  }

  render(){
    return `
      <div>
        <ul>
          <li><a routerLink="/">link</a></li>
        </ul>
      </div>
    `
  }
}