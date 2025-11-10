import { modules } from "../../modules";
import { moduleDescriptor} from './node/ModuleDescriptor'
import { node } from "./node/NodeManager";
import { router } from "./Router/Router";

export function initialize(){
  moduleDescriptor.build(modules);
  moduleDescriptor.descriptors.forEach((descriptor) => node.scan(descriptor.template))
  moduleDescriptor.descriptors.forEach((descriptor) => node.combine(descriptor.template))
  node.scan(document.querySelector('body'));
  node.combine(document.querySelector('body'));
  router.getTemplateByRoute(location.pathname)
}

