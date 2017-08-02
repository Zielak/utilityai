import Maths from '../maths'
import Utility from './utility'

const considerations = new Map()

export default class Consideration {

  constructor({ name, weight = 1 } = {}) {
    if (considerations.has(name)) {
      throw `Consideration called '${name} already exists`
    }
    
    this.name = name
    considerations.set(this.name, this)
    
    this.weight = weight
    // TODO: did I miss something?
  }

  get weight(){
    return this._weight
  }
  set weight(v){
    Maths.clamp(v, 0, 1)
  }

  /**
   * Sets an utility to this consideration
   * 
   * @param {any} value 
   * @memberof Consideration
   */
  setUtility(value){
    this.utility = new Utility(value, this.weight)
  }

  consider(context){ }

  // STATIC

  /**
   * Find an instance of consideration by its name
   * 
   * @static
   * @param {any} name unique name
   * @returns 
   * @memberof Consideration
   */
  static get(name) {
    return considerations.get(name)
  }
  
}