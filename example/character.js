import CharacterContext from './characterContext'
import ai from '../src/index'

export default class Character {

  constructor(name) {
    this.name = name
    this.context = new CharacterContext(this)
  }
  
  /**
   * @param {CharacterContext} context 
   * @memberof Character
   */
  update(context){
    context.bladder += 0.2
    context.energy -= 0.3
    context.happiness -= 0.4
    context.hunger += 0.5
    context.thirst += 0.3
  }

  /**
   * Remember your last action, you should print that in next update
   * 
   * @param {Action} lastAction 
   * @memberof Character
   */
  report(lastAction){
    this.lastAction = lastAction
  }

  toString(){
    return `${this.name}, ${this.context} - Action ${this.lastAction}`
  }
}