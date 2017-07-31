import Option from './option'
import MaxUtilitySelector from '../selectors/maxUtilitySelector'
import Selector from './selector'

export default class Behaviour {
  
  constructor({uniqueName, selector, options = null}){
    if(options.has(uniqueName)){
      throw `Behaviour called '${uniqueName} already exists`
    }

    this.uniqueName = uniqueName

    this._selector = selector || new MaxUtilitySelector()

    this.options = options || new Map()
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
    if(this.considerations.has(option.uniqueName)){
      throw `This behaviour already has '${option.uniqueName}' option`
    }
    this.options.set(option.uniqueName, option)
  }

  get selector() {
    return this._selector
  }
  set selector(v){
    this._selector = v instanceof Selector ? v : this._selector
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
      utilities.set(el.uniqueName, el.consider(context))
    })
    
    // Score those utilities using our selector
    const chosenOption = this.selector.select(utilities)
    return chosenOption.action
  }

}