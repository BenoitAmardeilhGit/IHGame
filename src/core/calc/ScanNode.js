import { selectorExtractor } from "./SelectorExtractor"

class ScanNode{

  constructor(){
    this.scanner = new Set();
  }

  /**
   * Parcourt récursivement l’arbre DOM en évitant les cycles :
   * - Ignore les nœuds déjà visités (via `this.scanner`).
   * - Si le nœud correspond à un sélecteur connu, injecte le template associé
   *    et poursuit le scan dans ce nouveau fragment.
   * - Sinon, poursuit simplement l’exploration des enfants.
   * @param {HTMLElement} node 
   */
  scan(node){
    if(!node || this.scanner.has(node)) return
    this.scanner.add(node)

    const template = this.checkExistingSelector(node);
    if(template){
      node.append(template)
      this.scan(template)
    } else {
      this.checkElementChild(node)
    }
  }

  /**
   * Traite les enfants d’un nœud :
   * - S’il possède des enfants, on les convertit en tableau, on exclut les balises <script>,
   *   puis on relance le scan sur chaque enfant restant.
   * - S’il n’a pas d’enfants, on poursuit l’exploration via ses frères/sœurs.
   * @param {HTMLElement} node 
   */
  checkElementChild(node){
    if(node.children){
      let childs = Array.from(node.children).filter((child) => child.nodeName !== 'SCRIPT')
      childs.forEach((child) => {
        this.scan(child)
      })
    } else {
      this.checkElementSibling(node)
    }
  }

  /**
   * Traite l'élément frère d'un noeud.
   * - Exclu l'élément script puis lance un nouveau scan sur l'élément.
   * @param {HTMLElement} node 
   */
  checkElementSibling(node){
    let next = node.nextElementSibling;
    if(next && next.nodeName !== 'SCRIPT'){
      this.scan(node.nextElementSibling)
    }
  }

  /**
   * Vérifie si le nœud correspond à un sélecteur enregistré :
   * - compare le nom du nœud (en minuscules) avec chaque sélecteur connu.
   * - si une correspondance est trouvée, retourne le nœud DOM généré à partir du template associé.
   * @param {HTMLElement} node 
   * @returns 
   */
  checkExistingSelector(node){
    let tagName = node.nodeName.toLowerCase();
    if(tagName === 'script') return null;

    for(const selector of selectorExtractor.selectors){
      if(tagName === selector.name)
        return this.convertStringToNode(selector.template.render());
    }
    return null
  }

  /**
   * 
   * @param {string} template 
   * @returns {HTMLDivElement}
   */
  convertStringToNode(template){
    const div = document.createElement('div');
    div.innerHTML = template;
    return div.firstElementChild;
  }

}

export const scannerNode = new ScanNode();