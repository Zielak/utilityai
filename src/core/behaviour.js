import Selector from './selector'
import Option from './option'

export default class Behaviour {
  
  constructor({uniqueName, selector, options = null}){
    if(options.has(uniqueName)){
      throw `Behaviour called '${uniqueName} already exists`
    }

    this.uniqueName = uniqueName

    // FIXME: what are selectors, how should they be specified?
    // DOCS say: _selector = new MaxUtilitySelector();
    this._selector = selector

    this.options = options || new Map()
  }

  addOption(option){
    // TODO: add option by their uniqueName
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
   * Selects an Action to execute given the context
   * 
   * @param {any} context 
   * @returns {Action}
   * @memberof Behaviour
   */
  select(context){
    const utilities = new Map()
    this.options.forEach(el => {
      utilities.set(el.uniqueName, el.consider(context))
    })
    
    const chosenOption = this.selector.select(utilities)
    return chosenOption.action
  }

}