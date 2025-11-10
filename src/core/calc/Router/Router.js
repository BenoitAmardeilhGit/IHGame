import { routes } from '../../../routes';
import { moduleDescriptor } from '../node/ModuleDescriptor';

class Router{

  /**
   * 
   * @param {{path: string, selector: string}[]} routes 
   */
  constructor(){
    this.routes = routes;
    this.previousURL = [];
  }

  /**
   * Ajoute les template html liée a l'url.
   * @param {string} pathname 
   */
  getTemplateByRoute(pathname){
    if(pathname.length !== 0){
      this.selectedURL = pathname;
      let route = this.routes.filter((route) => route.path === pathname)[0]
      let t = moduleDescriptor.descriptors.filter((descriptor) => descriptor.selector === route.selector)[0]
      const appRoute = document.querySelector('router');
      appRoute.innerHTML = '';
      appRoute.append(t.template)
    }
  }

  /**
   * Ajouter les events 'click' pour chaque attribut routerLink.
   * @param {HTMLElement} node 
   */
  initRouterLink(node, path){
    node.addEventListener('click', (e) =>{
      e.preventDefault();
      e.stopPropagation();
      this.previousURL.push(this.selectedURL)
      history.pushState({}, "", path);
      this.getTemplateByRoute(path)
    })
  }

}

export const router = new Router();