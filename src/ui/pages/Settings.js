export class Settings{

  constructor(){
    this.selector = 'app-settings'
  }

  render(){
    return `
      <h1>Setting</h1>
      <p>Bonjour</p>
      <app-header></app-header>
    `;
  }
}