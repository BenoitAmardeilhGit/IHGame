import { router } from "../Router/Router";

class CheckAttribute{

  constructor(){}

  /**
   * 
   * @param {HTMLElement} node 
   */
  check(node){
    if(node){
      Array.from(node.attributes).forEach((attribute) => {
        switch(attribute.name){
          case 'routerlink':
            router.initRouterLink(node, attribute.value)
            break;
          default:
            break;
          }
        })
    }
  }

}

export const checkAttribute = new CheckAttribute();