import { convertStringToNode } from "../../../utils/dom";
import { node } from "./NodeManager";

class Descriptor{

  /**
   * @param {string}
   */
  selector;

  /**
   * @param {string}
   */
  template;

  /**
   * @param {Object}
   */
  object;

  constructor(
    selector,
    template,
    object ){
      this.selector = selector;
      this.template = template;
      this.object = object
  }

  get(){
    return {
      selector: this.selector,
      template: this.template,
      object: this.object,
    }
  }
}

class ModuleDescriptor{

  /**
   * @type {Descriptor[]}
   */
  descriptors;

  constructor(){
    this.descriptors = [];
  }

  /**
   * 
   * @param {Object[]} modules 
   */
  build(modules){
    this.descriptors = modules.map((module) => this.toDescriptor(module));
  }

  /**
   * 
   * @param {Object} module 
   */
  toDescriptor(module){
      let instance = new module
      return new Descriptor(
        this.extract(module), 
        convertStringToNode(instance.render()),
        instance
      )
  }

  /**
   * 
   * @param {Object} obj 
   * @returns 
   */
  extract(obj){
    if(!obj) throw new Error('Aucun objet n\'est présent');
    const property = Object.getOwnPropertyDescriptors(new obj);
    for(let [key, v] of Object.entries(property)){
      if(key === 'selector')
        return v.value;  
    }
  }
}

export const moduleDescriptor = new ModuleDescriptor();