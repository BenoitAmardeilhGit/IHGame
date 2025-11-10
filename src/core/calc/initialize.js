import { modules } from "../../modules";
import { moduleDescriptor} from './node/ModuleDescriptor'
import { node } from "./node/NodeManager";
import { router } from "./Router/Router";

export function initialize(){
  moduleDescriptor.build(modules);
  node.build();
  // moduleDescriptor.descriptors.forEach((descriptor) => node.scan(descriptor.template))
  // moduleDescriptor.descriptors.forEach((descriptor) => node.combine(descriptor.template))
  // moduleDescriptor.descriptors.forEach((descriptor) => {
  //   console.log(descriptor)
  // })
  // node.scan(document.querySelector('body'));
  // node.combine(document.querySelector('body'));
  router.getTemplateByRoute(location.pathname)
}

