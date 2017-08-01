import CharacterContext from './characterContext'
import ai from '../src/index'

export default class Character {

  constructor() {
    this.context = new CharacterContext(this)
    
    // TODO: Add behaviours
    this.agent = new ai.Agent()
  }
  
  

}