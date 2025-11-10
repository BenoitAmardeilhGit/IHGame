export class Menu{

  constructor(){
    this.selector = 'app-menu'
  }

  render(){
    return `
      <div>
        <ul>
          <li><a (click)="alert('Bob')">alert</a></li>
          <li><a (click)="other('Bob')">other</a></li>
        </ul>
      </div>
    `
  }

  alert(e){
    console.log('alert Menu')
    console.log(e)
  }

  other(e){
    console.log('other Menu')
    console.log(e)
  }
}