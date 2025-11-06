import { Character } from "../core/models/Character";

/**
 * 
 * @param {Character[]} arr 
 */
export function sort(arr){
  let lists = arr.sort((a, b) => a.speed - b.speed)
  lists = lists.map((element, index) => {
    element.sortID = index + '' + element.id;
    return element
  })
  return lists;
}