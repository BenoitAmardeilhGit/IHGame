export class Character{

  /**
   * @param {{
   * id: string, 
   * type: string,
   * name: string, 
   * speed: number,
   * attack: number,
   * health: number}} properties 
   */
  constructor(properties){
    this.id = properties.id;
    this.type = properties.type;
    this.name = properties.name;
    this.speed = properties.speed;
    this.attack = properties.attack;
    this.health = properties.health;
  }

  toJSON(){
    return {
      id: this.id,
      type: this.type,
      name: this.name,
      speed: this.speed,
      attack: this.attack,
      health: this.health
    }
  }

  clone(){
    return new Character({... this})
  }

}