  /**
   * Convertit une chaîne HTML en nœud DOM.
   * @param {string} template 
   * @returns {HTMLDivElement}
   */
  export function convertStringToNode(template){
    const div = document.createElement('div');
    div.innerHTML = template;
    return div;
  }