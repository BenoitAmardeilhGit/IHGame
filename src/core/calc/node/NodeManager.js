import { router } from "../Router/Router";
import { moduleDescriptor } from "./ModuleDescriptor";
import { Events } from "./Events";

class NodeManager{

  constructor(){
    this.childs = [];
    this.descriptor = null;
  }

  build(){
    moduleDescriptor.descriptors.forEach((descriptor) => {
      this.descriptor = descriptor;
      this.scan(descriptor.template);
    })

    moduleDescriptor.descriptors.forEach((descriptor) => {
      this.combine(descriptor.template)
    })

    this.scan(document.querySelector('body'));
    this.combine(document.querySelector('body'));
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
    if(node.children.length !== 0){
      let childs = Array.from(node.children).filter((child) => child.nodeName !== 'SCRIPT')
      childs.forEach((child) => {
        this.scan(child)
      })
    }
  }

  /**
   * Combine un template si le selecteur <app-...> est trouvé.
   * @param {HTMLElement} node 
   */
  combine(node){
    if(node.nodeName === 'ROUTER') return
    let nodeName = node.nodeName.toLowerCase()
      
    const descriptor = moduleDescriptor.descriptors.filter((descriptor) => (nodeName === descriptor.selector))[0]
    if(descriptor)
      node.append(descriptor.template.cloneNode(true))

    if(node.children.length !== 0){
      this.childs = Array.from(node.children).filter((child) => child.nodeName !== 'SCRIPT')
      this.childs.forEach((child) => {
        this.combine(child)
      })
    }

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
            node.setAttribute('routing', true)
            router.initRouterLink(node, path)
            break;
          case '(click)':
            const events = new Events();
            events.add(node, this.descriptor, attribute)
            break;
          default:
            break;
          }
        })
    }
  }

}

export const node = new NodeManager();