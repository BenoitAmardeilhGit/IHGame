import { selectorExtractor } from "../SelectorExtractor";
import { convertStringToNode } from "../../../utils/dom";
import { scannerNode } from "../ScanNode";

class Router{

  /**
   * 
   * @param {{path: string, selector: string}[]} routes 
   */
  constructor(){
    this.routes = []
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
        scannerNode.scan(document.querySelector('body'))
      }
        
    })
  }

}

export const router = new Router();