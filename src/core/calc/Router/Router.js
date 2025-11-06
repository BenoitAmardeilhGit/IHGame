import { selectorExtractor } from "../SelectorExtractor";
import { convertStringToNode } from "../../../utils/dom";
import { node } from "../scan/ScanNode";

class Router{

  /**
   * 
   * @param {{path: string, selector: string}[]} routes 
   */
  constructor(){
    this.routes = [];
    this.routerLink = [];
  }

  initialize(routes){
    this.routes = routes;
    this.getTemplateByRoute(location.pathname)
  }

  getTemplateByRoute(pathname){
    let route = this.routes.filter((route) => route.path === pathname)[0]
    let appRoute = document.querySelector('router')
    selectorExtractor.selectors.filter((selector) => {
      if(selector.name === route.selector){
        appRoute.append(convertStringToNode(selector.template.render()))
        node.scan(document.querySelector('body'))
      }
    })
  }

  /**
   * 
   * @param {HTMLElement} node 
   */
  initRouterLink(node, path){
    node.addEventListener('click', (e) =>{
      e.preventDefault();
      e.stopPropagation();
      location.href = path 
    })
  }

}

export const router = new Router();