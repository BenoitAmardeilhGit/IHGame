export class Trait{

  /**
   * @type {Object[]}
   */
  main;

  /**
   * @type {Object}
   */
  trait;

  /**
   * 
   * @param {Object[]} main 
   * @param {Object} trait 
   */
  constructor(main, traits){
    this.main = main;
    this.traits = traits;
  }

  add(){
    console.log(this.traits.prototype)
    for(let obj of this.main){
      console.log(obj)
    }
  }

}