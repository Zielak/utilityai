import MaxUtilitySelector from '../selectors/maxUtilitySelector'
import Behaviour from './behaviour'
import Option from './option'
import Consideration from './consideration'
import Selector from './selector'
import Utility from './utility'

export default class Ai {

  constructor({name, selector = null}){

    this.name = name

    // List of behaviours added to this AI
    this._behaviours = new Map()

    this._behaviourUtilities = new Map()

    this._selector = selector || new MaxUtilitySelector()
  }

  get selector(){
    return this._.selector
  }
  set selector(v){
    if(v instanceof Selector){
      this._.selector = v
    }
  }
  
  
  select(context) {
    if (this._behaviours.size === 0) {
      return null
    } else if (this._behaviours.size === 1) {
      return this._behaviours[0].select(context)
    } else {
      this.updateUtilities(context)
      return this.selectAction(context)
    }
  }

  /**
   * Adds the behaviour to this AI
   * 
   * @param {string} name 
   * @return {boolean}
   * @memberof Ai
   */
  addBehaviour(name){
    if(!Behaviour.get(name)){
      // There's no such behaviour of this name
      return false
    }
    if(this._behaviours.has(name)){
      // We already have that behaviour
      return false
    }

    // All okay, add it
    this._behaviours.set(name, Behaviour.get(name))
    this._behaviourUtilities.set(name, new Utility(0, 0))
    return true
  }

  /**
   * Remove behaviour from this AI by its name
   * 
   * @param {string} name 
   * @returns 
   * @memberof Ai
   */
  removeBehaviour(name){
    if(!name){
      return false
    }
    if(!this._behaviours.has(name)){
      return false
    }

    // All good, remove
    this._behaviours.delete(name)
    this._behaviourUtilities.delete(name)
    return true
  }

  updateUtilities(context){
    this._behaviours.forEach((behaviour, key) => {
      behaviour.consider(context)
      this._behaviourUtilities.set(key, behaviour.utility)
    })
  }

}