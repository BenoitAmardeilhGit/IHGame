export class AdventureHubHeroSlide{

  constructor(){}

  create(){
    let content = document.createElement('div');
    content.innerHTML = `
      <div id="content-hero-slide">
        <div id="hero-slide">
          
        </div>
      </div>
    `;
    return content;
  }
}