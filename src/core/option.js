import Consideration from './consideration'

const options = new Map()

export default class Option {

  constructor({ name, action = null }) {
    if (options.has(name)) {
      throw `Option called '${name} already exists`
    }

    this.name = name
    options.set(this.name, this)

    this.action = action
    this.weight = 1

    this.considerations = new Map()
  }

  get action() { return this._action }
  set action(v) { this._action = v }

  /**
   * Adds new consideration to this option
   * 
   * @param {Consideration|string} consideration unique name or reference to Consideration
   * @memberof Option
   */
  addConsideration(consideration) {
    if(typeof consideration === 'string'){
      consideration = Consideration.get(consideration)
    }
    if(!consideration){
      throw `You probably didn't specify a consideration: ${consideration}`
    }
    if (this.considerations.has(consideration.name)) {
      throw `This option already has '${consideration.name}' consideration`
    }
    this.considerations.set(consideration.name, consideration)
  }

  /**
   * Calculate the utility of this option using all considerations
   * 
   * @param {any} context 
   * @returns {array<Utility>} array of utilities
   * @memberof Option
   */
  consider(context) {
    if (this.considerations.size === 0) return
    const utilities = this.considerations.map(el => {
      return el.consider(context)
    })
    return utilities
  }

  // STATIC

  /**
   * Find an instance of Option by its name
   * 
   * @static
   * @param {string} name unique name of an option
   * @returns {Option} or undefined if not found
   * @memberof Option
   */
  static get(name) {
    return options.get(name)
  }

}