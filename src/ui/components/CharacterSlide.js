import { Character } from "../../core/models/Character";

export class CharacterSlide{

  constructor(){}

  /**
   * 
   * @param {Character} character 
   * @returns {HTMLElement}
   */
  create(character){
    let content = document.createElement('div');
    content.innerHTML = `
      <div id="id-${character.sortID}" class="slide">
        <div id="visual-node">
          <img src="" alt="">
          <h1>${character.name}</h1>
        </div>
        <div id="informations-node">
          <p>${character.health}</p>
          <p>${character.speed}</p>
          <p></p>
        </div>
      </div>
    `;
    return content.firstElementChild;
  }
}