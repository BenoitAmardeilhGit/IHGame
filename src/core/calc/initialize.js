import { selectorExtractor } from "./SelectorExtractor";
import { node } from "./scan/ScanNode";
import { router } from "./Router/Router";
import { routes } from "../../routes";
import { modules } from "../../modules";

export function initialize(){
  selectorExtractor.extract(modules)
  if(routes.length > 0)
    router.initialize(routes)
  else{
    node.scan(document.querySelector('body'))
  }
}