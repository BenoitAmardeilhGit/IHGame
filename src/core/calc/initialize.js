import { modules } from "../../modules";
import { moduleDescriptor} from './node/ModuleDescriptor'
import { scan } from "./node/ScanNode";
import { router } from "./Router/Router";

export function initialize(){

  moduleDescriptor.build(modules);
  moduleDescriptor.descriptors.forEach((descriptors) => {
    scan.start(descriptors.template)
  })

  // scan.start(document.querySelector('body'))
  router.initialize()
}

