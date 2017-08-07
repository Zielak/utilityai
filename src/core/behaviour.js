import Option from './option'
import MaxUtilitySelector from '../selectors/maxUtilitySelector'
import Selector from './selector'
import Maths from '../maths'

const behaviours = new Map()

export default class Behaviour {
  
  constructor({name, selector, weight = 1, options = null}){
    if(behaviours.has(name)){
      throw `Behaviour called '${name} already exists`
    }

    this.name = name
    behaviours.set(this.name, this)

    this._selector = selector || new MaxUtilitySelector()
    this.weight = weight

    this.options = options || new Map()
  }

  get selector() {
    return this._selector
  }
  set selector(v){
    this._selector = v instanceof Selector ? v : this._selector
  }
  
  get weight(){
    return this._weight
  }
  set weight(v){
    this._weight = Maths.clamp(v)
  }

  /**
   * Add an Option to this Behaviour
   * 
   * @param {string|Option} option name of the option OR reference to option object
   * @memberof Behaviour
   */
  addOption(option){
    if(typeof option === 'string'){
      option = Option.get(option)
    }
    if(!option){
      throw `You probably didn't specify an option: ${option}`
    }
    if(this.options.has(option.name)){
      throw `This behaviour already has '${option.name}' option`
    }
    this.options.set(option.name, option)
  }
  
  consider() {
    
  }

  /**
   * Selects an Action to execute with given context
   * 
   * @param {any} context 
   * @returns {Action} action to execute
   * @memberof Behaviour
   */
  select(context){
    // Get each options's all utilities
    const utilities = new Map()
    this.options.forEach(el => {
      utilities.set(el.name, el.consider(context))
    })
    
    // Score those utilities using our selector
    const chosenOption = this.selector.select(utilities)
    return chosenOption.action
  }

  // STATIC

  /**
   * Get behavioour of a given name
   * 
   * @static
   * @param {Behaviour} name 
   * @returns 
   * @memberof Behaviour
   */
  static get(name){
    return behaviours.get(name)
  }

}