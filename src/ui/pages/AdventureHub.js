export class AdventureHub{

  constructor(){
    this.selector = 'app-hub';
    this.buttons = [
      'Heroes',
      'Bag',
      'Quests'
    ]
  }

  /**
   * Génère le squelette HTML du hub d’aventure. 
   * @returns {string}
   */
  render(){
    return `
      <div id="adventure-hub">
        <div id="adventure-hub-content">
          ${this.getButtons()}
        </div>
        <section>
          <h2 routerLink='hub'>test</h2>
          <app-settings></app-settings>
        </section>
      </div>
    `;
  }

  /**
   * Retourne une liste de bouttons.
   * @returns {string}
   */
  getButtons(){
    return this.buttons.reduce((html, button) => {
      return html + `
        <div>
          <p>${button}</p>
        </div>`;
    }, '');
  }

}