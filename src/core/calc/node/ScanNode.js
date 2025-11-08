import { router } from "../Router/Router";
import { moduleDescriptor } from "./ModuleDescriptor";

class ScanNode{

  constructor(){
    this.main = null;
  }

  /**
   * 
   * @param {HTMLElement} node 
   */
  start(node){
    if(!node) throw new Error('Element HTML manquant')
    this.main = node;
    return this.scan(this.main);
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
    this.checkAttribute(node)
    // this.combineTemplate(node);

    console.log(node)

    if(node.children.length !== 0){
      console.log('enfant')
      let childs = Array.from(node.children).filter((child) => child.nodeName !== 'SCRIPT')
      console.log(childs)
        childs.forEach((child) => {
          this.scan(child)
        })
      }

    if(node.children.length === 0 && node.nextElementSibling){
      console.log('frere')
      this.scan(node.nextElementSibling)
    }


    return this.main
  }

  combineTemplate(node){
    moduleDescriptor.descriptors.forEach((descriptor) => {
      if(node.nodeName.toLowerCase() === descriptor.selector){
        this.main.querySelector(descriptor.selector).append(descriptor.template)
        this.scan(descriptor.template)
      }
    })
  }

  /**
   * 
   * @param {HTMLElement} node 
   */
  checkAttribute(node){
    if(node){
      Array.from(node.attributes).forEach((attribute) => {
        switch(attribute.name){
          case 'routerlink':
            let path = (attribute.value === '/') ? attribute.value : '/'+ attribute.value
            router.initRouterLink(node, path)
            break;
          default:
            break;
          }
        })
    }
  }

}

export const scan = new ScanNode();