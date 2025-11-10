export class Events{

  constructor(){}

  add(node, descriptor, attribute){
    node.addEventListener('click', (e) => {
      const funcName = attribute.value.split('(')[0];
      descriptor.functions.forEach((func) => {
        if(func.key === funcName)
          func.value(e);
      })
    })
  }
}