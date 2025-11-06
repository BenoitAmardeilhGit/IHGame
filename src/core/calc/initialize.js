import { selectorExtractor } from "./SelectorExtractor";
import { router } from "./Router/Router";
import { routes } from "../../routes";
import { modules } from "../../modules";

export function initialize(){

  selectorExtractor.extract(modules)
  const r = router.initialize(routes)

}