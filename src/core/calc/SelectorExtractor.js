class SelectorExtractor{

  /**
   * @param {{name: string, template: object}[]}
   */
  #selectors;

  constructor(){
    this.#selectors = [];
  }

  /**
   * @returns {{name: string, template: object}[]}
   */
  get selectors(){
    return this.#selectors;
  }

  /**
   * @property {{name: string, template: object}}
   */
  set selectors(selector){
    if(typeof selector === 'object');
      this.#selectors.push(selector)
  }

  /**
 * Extrait les métadonnées « selector » d’une collection de classes :
 * 1. Vérifie que le tableau n’est pas vide.
 * 2. Pour chaque constructeur contenu dans le tableau :
 *    - récupère la liste complète des descripteurs de propriétés de son prototype
 *      (via un objet instancié `new obj`).
 *    - parcourt ces descripteurs ; dès qu’une propriété s’appelle « selector »,
 *      stocke un objet `{ name: v.value, template: new obj }` dans `this.selectors`.
 *      (Le même template peut ainsi être réutilisé plus tard pour générer le nœud DOM.)
 * 3. Lance une exception si aucun objet n’est fourni.
   * @param {Object[]} arr 
   */  
  extract(arr){
    if(arr.length === 0) throw new Error('Aucun objet n\'est présent');
    arr.map((obj) => {
      const property = Object.getOwnPropertyDescriptors(new obj);
      for(let [k, v] of Object.entries(property)){
        if(k === 'selector')
          this.selectors = { name: v.value, template: new obj }
      }
    })
  }

}

export const selectorExtractor = new SelectorExtractor()