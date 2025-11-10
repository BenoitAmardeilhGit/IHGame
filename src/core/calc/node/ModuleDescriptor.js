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
   * @param {Function[]}
   */
  functions;

  /**
   * @param {Object}
   */
  object;

  constructor(
    selector,
    template,
    functions,
    object ){
      this.selector = selector;
      this.template = template;
      this.functions = functions;
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
   * @param {Object[]} array 
   */
  build(array){
    let modules = [];

    array.forEach((module) => {
      if(modules.indexOf(module) !== -1) throw new Error(`Une classe est déjà présente dans le tableau des modules 'src/modules.js'`)
        modules.push(module)
    });

    this.descriptors = modules.map((module) => this.toDescriptor(module));
  }

  /**
   * 
   * @param {Object} module 
   */
  toDescriptor(module){
      let instance = new module;
      return new Descriptor(
        this.getSelector(module), 
        convertStringToNode(instance.render()),
        this.getFunctions(module),
        instance
      )
  }

  /**
   * Retourne le sélecteur associé à la classe passée en paramètre.
   * @param {Object} obj 
   * @returns 
   */
  getSelector(obj){
    if(!obj) throw new Error('Aucun objet n\'est présent');
    const property = Object.getOwnPropertyDescriptors(new obj);
    for(let [key, v] of Object.entries(property)){
      if(key === 'selector')
        return v.value;  
    }
  }

  /**
   * Retourne les fonctions associées à la classe passée en paramètre.
   * @param {Object} obj 
   * @returns 
   */
  getFunctions(obj){
    let functions = [];
    for(let key of Object.getOwnPropertyNames(obj.prototype)){
      if(key !== 'constructor' && key !== 'render')
        functions.push({
          key: key,
          value: obj.prototype[key]
        })
    }
    return functions
  }
}

export const moduleDescriptor = new ModuleDescriptor();